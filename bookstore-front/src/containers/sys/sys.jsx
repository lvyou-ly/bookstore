import React from "react";
import "./sass/sys.scss";
import ShowArea from "../../components/show-area/show-area";
import {connect} from "react-redux";
import {changeSysArea} from "../../redux/action";
import { NavBar,Icon  } from 'antd-mobile';
class Sys extends React.Component{
    changeArea = (key)=>{
        this.props.changeSysArea(key);
    }
    back(){
        this.props.history.go();
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
            <div className="sys">
                <div className="btns">
                    <p className="add-btn" onClick={this.changeArea.bind(this,"add")}>添加</p>
                    <p className="del-btn" onClick={this.changeArea.bind(this,"del")}>删除</p>
                    <p className="alter-btn" onClick={this.changeArea.bind(this,"alter")}>修改</p>
                    <p className="find-btn" onClick={this.changeArea.bind(this,"find")}>查询</p>
                </div>
                <ShowArea></ShowArea>
            </div>
            </>
        );
    }
}
export default connect(
    (state)=>({sys:state.sys}),
    {changeSysArea}
)(Sys);