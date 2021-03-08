/**
 * 定义包含N个操作数据库集合数据的Model模块
 */
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/design");
const conn = mongoose.connection;
conn.on("connected", () => {
    console.log("db connect success");
});
//用户信息约束
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    userpic: {
        type: String,
        default: "data:image/webp;base64,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"
    },
    addr: {
        type: Array,
        default: []
    },
    // 图书对象数组，相比图书信息多了一个count字段，表示该用户购物车中有count本该图书
    chart: {
        type: Array,
        default: []
    },
    historyOrders: {
        type: Array,
        default: []
    }
});
//图书信息约束
const bookSchema = mongoose.Schema({
    bookname: {
        type: String,
        required: true
    },
    booktype: {
        type: String,
        required: true
    },
    bookprice: {
        type: Number,
        required: true
    },
    bookintro: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    buyCount:{type:Number,default:0}
});
//定义Model构造函数,与集合对应，可以操作集合
const UserModel = mongoose.model("user", userSchema);
const BookModel = mongoose.model("book", bookSchema);
exports.UserModel = UserModel;
exports.BookModel = BookModel;