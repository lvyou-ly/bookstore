import React from "react";
import "./sass/success.scss";
import { NavBar,Icon  } from 'antd-mobile';
export default class Success extends React.Component{
    constructor(props){
        super(props);
        this.state={
            date:"",
        }
    }
    back(){
        this.props.history.go(-2);
    }
    componentWillMount(){
        let date=new Date();
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        let day=date.getDate();
        let hour=date.getHours();
        let minute=date.getMinutes();
        let second=date.getSeconds();
        let week=date.getDay();
        switch(week){
            case 0:
                week="日";
                break;
            case 1:
                week="一";
                break;
            case 2:
                week="二";
                break;
            case 3:
                week="三";
                break;
            case 4:
                week="四";
                break;
            case 5:
                week="五";
                break;
            case 6:
                week="六";
                break;
        }
        let dateStr=`${year}年-${month}月-${day}日-${hour}时-${minute}分-${second}秒-星期${week}`;
        this.setState({date:dateStr});
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
            <div className="success">
                <h2 className="success-title">下单成功</h2>
                <div className="success-icon"></div>
                <div className="success-date">{this.state.date}</div>
            </div>
            </>
        );
    }
}