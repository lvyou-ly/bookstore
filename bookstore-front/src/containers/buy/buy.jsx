import React from "react";
import "./sass/buy.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reqBuyBook, reqGetUser } from "../../api/index";
import { NavBar, Icon, Toast } from 'antd-mobile';
import { district } from 'antd-mobile-demo-data';
import { updateToBuy } from '../../redux/action';
class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: [],
            total: 0,
            addr: "",
            toBuy: [],
        }
    }
    async componentWillMount() {
        const response = await reqGetUser();
        let addr = response.data.addr;
        if (addr.length < 1) {
            Toast.info("请先选择收货地址！", 1.5);
            this.props.history.push('/mine');
            return;
        }
        let firstLevelAddr = district.filter(item => (item.value === addr[0]))[0];
        let secondLevelAddr = firstLevelAddr.children.filter(item => (item.value === addr[1]))[0];
        let thirdLevelAddr = secondLevelAddr.children.filter(item => (item.value === addr[2]))[0];
        let absoluteAddr = `${firstLevelAddr.label} ${secondLevelAddr.label} ${thirdLevelAddr.label} ${addr[3]}`;
        let total = 0, toBuy = null;
        if (Array.isArray(this.props.toBuy)) {
            this.props.toBuy.forEach(item => total += item.bookprice);
            total = Math.floor(total * 10) / 10;
            toBuy = this.props.toBuy;
        } else {
            total = this.props.toBuy.bookprice;
            toBuy = [ this.props.toBuy ];
        }
        this.setState({ addr: absoluteAddr, toBuy, total });
    }
    back() {
        this.props.history.goBack();
    }
    componentWillUnmount() {
        this.props.updateToBuy([]);

    }
    async buyEvent() {
        const response = await reqBuyBook({ books: JSON.stringify(this.props.toBuy)});
        if (response.code === 0) {
            this.props.history.push('/success');
        } else {
            this.props.history.push('/fail');
        }

    }
    cancelEvent() {
        this.props.history.push('/');
    }
    render() {
        return (
            <>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={this.back.bind(this)}
                    className="nav"
                >图书商城</NavBar>
                <div className="buy">
                    <p className="title">请核对信息</p>
                    {
                        this.state.toBuy.map((item, index) => {
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
                    <div className="addr-box">
                        <p className="check-addr">收货地址</p>
                        <p className="addr-descripe">{this.state.addr}</p>
                    </div>
                    <div className="total-price">总价：￥{this.state.total}</div>
                </div>
                <footer>
                    <button onClick={this.buyEvent.bind(this)}>确&nbsp;&nbsp;定</button>
                    <button onClick={this.cancelEvent.bind(this)}>取&nbsp;&nbsp;消</button>
                </footer>
            </>
        );
    }
}
export default connect(
    (state) => ({ bookdetail: state.bookdetail, toBuy: state.toBuy }),
    { updateToBuy }
)(Buy);