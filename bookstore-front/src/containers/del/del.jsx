import React from "react";
import "./sass/del.scss";
import { InputItem, List, Icon, Toast, Badge } from "antd-mobile";
import { reqFindBook, reqDelBook } from "../../api/index";
export default class Del extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookname: "",
            res: [],
            iconColor: [],
            selectedCards: [],
            showTip:false,
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.delBook=this.delBook.bind(this);
    }
    async inputHandler(v) {
        await this.setState({ bookname: v });
        const response = await reqFindBook({bookname:this.state.bookname});
        if (response.code === 0) {
            this.setState({ res: response.data });
        }
        this.setState({showTip:true});
    }
    async clickIcon(index) {
        await this.setState(prevState => {
            if (prevState.iconColor.includes(index)) {
                let newIconColor = prevState.iconColor.filter(item => item != index);
                let newSelectedCards = prevState.selectedCards.filter(item => item != prevState.res[index]._id);
                return {
                    iconColor: newIconColor,
                    selectedCards: newSelectedCards
                }
            } else {
                return {
                    iconColor: [...prevState.iconColor, index],
                    selectedCards:
                        [...prevState.selectedCards, prevState.res[index]._id]
                }
            }
        }
        );
    }
    async delBook(){
      const response1= await reqDelBook(this.state.selectedCards);
      Toast.info(response1.msg,1);
      if(response1.code===0){
        this.setState({
            iconColor: [],
            selectedCards: [],
        })
        const response2 = await reqFindBook({bookname:this.state.bookname});
        if (response2.code === 0) {
           await this.setState({ res: response2.data });
        }
      }
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
                            <div className="card" key={index}>
                                <Badge text={item.booktype} style={{padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2,left:"-1rem",top:"-1rem" }} />
                                <Icon type="check-circle-o" size="md" color={this.state.iconColor.includes(index) ? "green" : "#000"} className="circle" onClick={this.clickIcon.bind(this, index)} />
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