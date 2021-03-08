import React from "react";
import "./sass/fail.scss";
import { NavBar,Icon  } from 'antd-mobile';
export default class Fail extends React.Component{
    back(){
        this.props.history.go(-2);
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
            <div className="fail">
                <h2 className="fail-title">下单失败</h2>
                <div className="fail-icon"></div>
            </div>
            </>
        );
    }
}