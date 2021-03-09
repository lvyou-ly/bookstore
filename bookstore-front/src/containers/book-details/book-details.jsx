import React from "react";
import "./sass/book-details.scss";
import { connect } from "react-redux";
import {updateChartAsync, updateToBuy, updateUser} from "../../redux/action";
import { NavBar,Icon, Toast  } from 'antd-mobile';
import Cookies from "js-cookie";
class BookDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: {},
        }
    }
    componentWillMount() {
        this.setState({ res: this.props.bookdetail.item });    
    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }
    getTime(){
        let now=new Date();
        let year=now.getFullYear();
        let month=now.getMonth()+1;
        let day=now.getDate();
        let hour=now.getHours();
        let minute=now.getMinutes();
        let second=now.getSeconds();
        return `${year}-${month.toString().padStart(2,0)}-${day.toString().padStart(2,0)}-${hour.toString().padStart(2,0)}-${minute.toString().padStart(2,0)}-${second.toString().padStart(2,0)}`;
    }
    async addChart(){
        if(!Cookies.get('token')) {
            this.props.history.push('/login');
            Toast.info('请先登录！');
            return;
        }
        await this.props.updateChartAsync({ book: JSON.stringify(this.state.res) });
        console.log('chart', this.props.user);
        Toast.info(this.props.user.code === 0 ? '添加成功' : '网络请求出错，请稍后重试');
        this.timer = setTimeout(() => {
            this.props.history.push('/');
        }, 1000);       
    }
    back(){
        this.props.history.push('/');
    }
    async buy(){
        if(!Cookies.get('token')) {
            this.props.history.push('/login');
            Toast.info('请先登录！');
            return;
        }
        this.props.updateToBuy(this.props.bookdetail.item);
        this.props.history.push('/buy');
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
            <div className="book-details">
                <div className="img-price">
                    <img src={this.state.res.img} alt=""/>
                    <div className="name-price">
                     <div className="bookname">{this.state.res.bookname}</div>
                     <div className="price">￥{this.state.res.bookprice}</div>
                    </div>
                </div>
                <div className="introduce">
                    详情：{this.state.res.bookintro}
                </div>
                <footer>
                    <button className="add-chart" onClick={this.addChart.bind(this)}>加入购物车</button>
                    <button className="buy-immediate" onClick={this.buy.bind(this)}>立即购买</button>
                </footer>
            </div>
            </>
        );
    }
}
export default connect(
    (state) => ({ bookdetail:state.bookdetail, user: state.user }),
    {updateChartAsync, updateToBuy, updateUser}
)(BookDetails);