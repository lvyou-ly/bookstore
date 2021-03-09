import React from "react";
import "./sass/history-orders.scss";
import {reqGetUser} from "../../api/index";
import { NavBar,Icon  } from 'antd-mobile';
import {connect} from 'react-redux';
class HistoryOrders extends React.Component{
    constructor(props){
        super(props);
        this.state={
            historyOrders:[],
        }
    }
    async componentDidMount(){
        let historyOrders = null;
        if (this.props.user.historyOrders) {
            historyOrders = this.props.user.historyOrders;
        } else {
            const response=await reqGetUser();
            historyOrders = response.data.historyOrders;
        }
        this.setState({historyOrders});
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
export default connect(
    state => ({ user: state.user })
)(HistoryOrders);