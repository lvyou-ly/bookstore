import React from "react";
import "./sass/history-orders.scss";
import {reqGetUser} from "../../api/index";
import { NavBar,Icon  } from 'antd-mobile';
export default class HistoryOrders extends React.Component{
    constructor(props){
        super(props);
        this.state={
            historyOrders:[],
        }
    }
    async componentDidMount(){
        const response=await reqGetUser();
        this.setState({historyOrders:response.data.historyOrders});
    }
    back(){
        this.props.history.goBack();
    }
    render(){
        const _this=this;
        return (
            <>
            <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={_this.back.bind(this)}
                className="nav"
            >图书商城</NavBar>
            <div className="history-orders">
                {
                    this.state.historyOrders.map((item,index)=>{
                        return (
                            <div className="card" key={index}>
                                    <div className="box">
                                    <img src={item.img} alt="" />
                                    <div className="name-price">
                                        <div className="bookname">{item.bookname}</div>
                                        <div className="price">￥{item.bookprice}</div>
                                    </div>
                                    </div>
                                    <div className="num">数量：{item.count}</div>
                                </div>
                        );
                    })
                }
            </div>
            </>
        );
    }
}