const express = require('express');
const router = express.Router();
const {
  UserModel,
  BookModel,
} = require("../db/models");
/**
 * 读取请求参数
 * 处理
 * 返回响应
 */
/* register */
router.post('/register', function (req, res) {
  const {
    username,
    pass,
    tel
  } = req.body;
  //判断用户是否已经存在
  //查询(username)
  UserModel.findOne({
    username
  }, function (err, doc) {
    if (err) {
      res.send({
        code: 1,
        data: null,
        msg: "注册失败"
      });
    } else if (doc) {
      res.send({
        code: 1,
        data: doc,
        msg: "用户已存在！"
      });
    } else {
      new UserModel({
        username,
        pass,
        tel
      }).save(function (err, data) {
        if (err) {
          res.send({
            code: 1,
            data: null,
            msg: "注册失败",
          });
        }
        const user = {
          username,
          tel,
          _id: data._id
        };
        res.cookie("token", data._id, {
          maxAge: 1000 * 60 * 60 * 24 * 7
        });

        res.send({
          code: 0,
          data: user,
          msg: "注册成功！"
        });
      });
    }
  })
});
/**login */
router.post("/login", function (req, res) {
  const {
    username,
    pass
  } = req.body;
  UserModel.findOne({
    username,
    pass
  }, function (err, doc) {
    if (err) {
      res.send({
        code: 1,
        data: null,
        msg: "登录失败",
      });
    } else if (!doc) {
      res.send({
        code: 1,
        data: null,
        msg: "用户名或密码不正确！"
      });
    } else {
      res.cookie("token", doc._id, {
        maxAge: 1000 * 60 * 60 * 24 * 7
      });
      Reflect.deleteProperty(doc, pass);
      res.send({
        code: 0,
        data: doc,
        msg: "登录成功！"
      });
    }
  })
});
/**增 */
router.post("/add", function (req, res) {
  const bookinfo = req.body;
  new BookModel(bookinfo).save(function (err, doc) {
    if (err) {
      res.send({
        code: 1,
        data: err,
        msg: "添加失败！"
      });
      return;
    }
    res.send({
      code: 0,
      data: doc,
      msg: "添加成功！"
    });
  })
})
/**删 */
router.post("/del", function (req, res) {
  const {
    ids
  } = req.body;
  ids.forEach(_id => {
    BookModel.remove({
      _id
    }, function (err) {
      if (err) {
        return res.send({
          code: 1,
          data: err,
          msg: "部分删除失败！"
        });
      }
    })
  })
  res.send({
    code: 0,
    data: {},
    msg: "全部删除成功！"
  });
})
/**改 */
router.post("/alter", function (req, res) {
  const {
    update
  } = req.body;
  BookModel.findByIdAndUpdate(update._id, update, function (err) {
    if (!err) {
      return res.send({
        code: 0,
        data: {},
        msg: "更新成功！"
      });
    }
    res.send({
      code: 1,
      data: {},
      msg: "更新失败"
    });
  })
})
/**查 */
router.post("/find", function (req, res) {
  const condition = req.body;
  BookModel.find(condition, function (err, doc) {
    if (!err && doc) {
      return res.send({
        code: 0,
        data: doc,
        msg: ""
      });
    }
    res.send({
      code: 1,
      data: {},
      msg: "查询无果！"
    });
  })
})
/**
 * 购买的情形有两种：从图书详情页购买 ｜ 从购物车批量购买
 * 购买的操作：
 * 1.向用户历史订单数组中添加新数据
 * 2.如果用户是从购物车中购买，则要删除购物车中相应的书籍，区分条件是：图书详情页购买：books是对象 ｜ 购物车购买：books是数组
 * 3.图书集合中，对应的图书购买量增加计算新值
 * */
router.post("/buy", function (req, res) {
  let {
    books,
  } = req.body;
  const _id = req.cookies.token;
  books = JSON.parse(books);
  const bookArray = Array.isArray(books) ? [ ...books ] : [ books ];
  UserModel.findById(_id, function (err, doc) {
    try {
      if (!err) {
        // 1-更新历史订单
        doc.historyOrders.push(...bookArray);
        bookArray.forEach(obj => {
          if (Array.isArray(books)) {
            // 2-兼容从购物车购买的情形，更新购物车，不包括从商品详情页购买的情形
            let index = doc.chart.findIndex(item => item._id === obj._id);
            doc.chart.splice(index, 1);
          }
          // 更新用户historyOrders和chart
          UserModel.findByIdAndUpdate(_id, doc, function (err2) {
            if (err2) {
              res.send({
                code: 1,
                data: null,
                msg: "下单失败！"
              });
            } else {
              // 更新图书购买数量buyCount（是图书购买数量而不是购买人数）
              BookModel.findById(obj._id, function (err3, doc3) {
                if (!err3) {
                  BookModel.findByIdAndUpdate(obj._id, { ...doc3, buyCount: doc3.buyCount + obj.count });
                } else {
                  res.send({
                    code: 1,
                    data: null,
                    msg: "下单失败！"
                  });
                }
              })
            }
          })
        });
        res.send({
          code: 0,
          data: null,
          msg: '下单成功'
        })
      } else {
        res.send({
          code: 1,
          data: null,
          msg: "下单失败！"
        });
      }
    } catch (e) {
      res.send({
        code: 1,
        data: null,
        msg: "下单失败"
      });
    }
  })

})
/**获取用户信息 */
router.post("/getuser", function (req, res) {
  const _id = req.cookies.token;
  UserModel.findById(_id, function (err, doc) {
    Reflect.deleteProperty(doc, "pass");
    if (!err) {
      return res.send({
        code: 0,
        data: doc,
        msg: "查询成功！"
      });
    } else {
      return res.send({
        code: 1,
        data: err,
        msg: "查询失败！"
      });
    }
  })
})
/**保存 新的用户信息*/
router.post("/saveuser", function (req, res) {
  const {
    newdata
  } = req.body;
  const _id = req.cookies.token;
  UserModel.findByIdAndUpdate(_id, newdata, function (err, doc) {
    if (!err) {
      return res.send({
        code: 0,
        data: doc,
        msg: "更新成功！"
      });
    }
    res.send({
      code: 1,
      data: {},
      msg: "更新失败！"
    });
  })
})
/**获取大众购买图书情况 */
router.post("/peoplebuys", function (req, res) {
  BookModel.find(function (err, doc) {
    if (err) {
      res.send({
        code: 1,
        data: {},
        msg: '网络错误'
      })
    } else {
      if (doc && doc.length) {
        let mostThree = [doc[0], doc[1], doc[2]], top = 0;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < doc.length; j++) {
            if (doc[j].buyCount > mostThree[i].buyCount) {
              mostThree[i] = doc[j];
              top = j;
            }
          }
          doc.splice(top, 1);
        }
        res.send({
          code: 0,
          data: { mostThree },
          msg: '请求成功'
        });
      } else {
        // 数据库中未录入图书
        res.send({
          code: 1,
          data: {},
          msg: '网络错误'
        })
      }
    }
  })
})
/**修改密码 */
router.post("/modifypass", function (req, res) {
  const {
    oldpass,
    newpass
  } = req.body;
  const _id = req.cookies.token;
  UserModel.findById(_id, function (err, user) {
    if (!err) {
      if (oldpass === user.pass) {
        user.pass = newpass;
        UserModel.findByIdAndUpdate(_id, user, function () {
          res.send({
            code: 0,
            data: user,
            msg: "修改成功！"
          });
        });
      } else {
        res.send({
          code: 1,
          data: {},
          msg: "旧密码不正确！"
        });
      }
    } else {
      res.send({
        code: 1,
        data: err,
        msg: "网络错误！"
      });
    }
  })
})
/**保存收货地址 */
router.post("/saveaddr", function (req, res) {
  const {
    addr
  } = req.body;
  const _id = req.cookies.token;
  UserModel.findById(_id, function (err, user) {
    if (!err) {
      user.addr = addr;
      UserModel.findByIdAndUpdate(_id, user, function (err, olduser) {
        if (!err) {
          res.send({
            code: 0,
            data: {},
            msg: "保存成功！"
          });
        } else {
          res.send({
            code: 1,
            data: {},
            msg: "网络错误，保存失败！"
          });
        }
      })
    } else {
      res.send({
        code: 1,
        data: {},
        msg: "网络错误，保存失败！"
      });
    }
  })
})
// 添加或删除购物车图书
router.post('/updatechart', function (req, res) {
  let { book } = req.body;
  const _id = req.cookies.token;
  console.log('_id', _id)
  book = JSON.parse(book);
  UserModel.findById(_id, (err, doc) => {
    if (err) {
      res.send({
        code: 1,
        data: null,
        msg: "网络错误"
      });
    } else {
      let index = -1;
      if (Array.isArray(book)) {
        // 类型为数组时代表删除(从购物车中批量删除)
        book.forEach(item => {
          index = doc.chart.findIndex(item2 => item2._id === item._id);
          doc.chart.splice(index, 1);
        })
      } else {
        // 类型为对象时代表添加（只能从商品详情页一个一个添加）
        index = doc.chart.findIndex(item => item._id === book._id);
          if (index === -1) {
            // 如果购物车中没有此图书，则直接推进购物车
            doc.chart.push(book);
          } else {
            // 否则，将当前图书的数量加1
            doc.chart.splice(index, 1, { ...doc.chart[index], count: doc.chart[index].count + 1 })
          }
      }
      UserModel.findByIdAndUpdate(_id, doc, (err2) => {
        res.send({
          code: err2 ? 1 : 0,
          data: err2 ? null : doc.chart,
          msg: err2 ? '网络请求出错，请稍后重试' : '操作成功'
        });
      })
    }
  })
})
module.exports = router;