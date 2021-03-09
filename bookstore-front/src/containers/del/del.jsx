import React from "react";
import "./sass/del.scss";
import { InputItem, List, Icon, Toast, Badge } from "antd-mobile";
import { reqFindBook, reqDelBook } from "../../api/index";
export default class Del extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookname: "",
            // 查询结果
            res: [],
            // 保存被选中的书籍id
            selectedCards: [],
            showTip:false,
            searchTimer: null,
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.delBook=this.delBook.bind(this);
    }
    inputHandler(v) {
        this.setState({ bookname: v });
        this.searchTimer && clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(async () => {
            const response = await reqFindBook({bookname:this.state.bookname});
            if (response.code === 0) {
                this.setState({ res: response.data });
            }
            this.setState({showTip:true});
        }, 500);
    }
    async clickIcon(item) {
        this.setState(prevState => {
                return {
                    selectedCards: [...prevState.selectedCards, item._id]
                }
        }
        );
    }
    async delBook(){
      if (!this.state.selectedCards.length) {
          Toast.info("请先选择要删除的图书！");
          return;
      }
      const response1= await reqDelBook(this.state.selectedCards);
      Toast.info(response1.msg,1);
      if(response1.code===0){
        this.setState({
            selectedCards: [],
        })
        const response2 = await reqFindBook({bookname:this.state.bookname});
        if (response2.code === 0) {
        this.setState({ res: response2.data });
        }
      }
    }
    componentWillUnmount() {
        this.searchTimer && clearTimeout(this.searchTimer);
    }
    render() {
        return (
            <div className="del">
                <h3>删除面板</h3>
                <List>
                    <InputItem placeholder="书名" value={this.state.bookname} onChange={this.inputHandler}>书名：</InputItem>
                </List>
                {
                    this.state.showTip?<h4>共有&nbsp;{this.state.res.length}&nbsp;条记录</h4>:null
                }
                {
                    this.state.res.map((item, index) => {
                        return (
                            <div className="card" key={index} onClick={this.clickIcon.bind(this, item)}>
                                <Badge text={item.booktype} style={{padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2,left:"-1rem",top:"-1rem" }} />
                                <Icon type="check-circle-o" size="md" color={this.state.selectedCards.includes(item._id) ? "rgb(33, 182, 138)" : "#fff"} className="circle"/>
                                <div className="img-name-price">
                                    <img className="img" src={item.img} />
                                    <div className="name-price">
                                        <p className="bookname">{item.bookname}</p>
                                        <p className="price">￥{item.bookprice}</p>
                                    </div>
                                </div>
                                <p className="intro" >{item.bookintro}</p>
                            </div>
                        )
                    })
                }

                <button onClick={this.delBook}>确定删除</button>
            </div>
        );
    }
}

