import React from "react";
import "./sass/modify-pass.scss";
import { List, InputItem,Toast } from 'antd-mobile';
import {reqModifyPass} from "../../api/index";
import md5 from "blueimp-md5";
import { NavBar,Icon  } from 'antd-mobile';
export default class ModifyPass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            oldpass: "",
            newpass: "",
            renewpass: "",
        }
    }
    modifyPass (key,v) {
        if(key==="newpass"&&!this.state.oldpass){
            return Toast.info("请输入旧密码",1);
        }
        this.setState({[key]:v});
    }
    back(){
        this.props.history.goBack();
    }
    async modify () {
        let {oldpass,newpass,renewpass}=this.state;
        if(newpass!==renewpass){
            return Toast.info("两次输入的新密码不一致",1);
        }
        oldpass=md5(oldpass);
        newpass=md5(newpass);
        const response=await reqModifyPass({oldpass,newpass});
        Toast.info(response.msg,1);
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
            <div className="modify-pass">
                <List>
                  <InputItem placeholder="请输入旧密码" type="password" className="input" onChange={this.modifyPass.bind(this,"oldpass")}></InputItem>
                    <InputItem placeholder="请输入新密码" type="password" className="input" onChange={this.modifyPass.bind(this,"newpass")}></InputItem>
                    <InputItem placeholder="请再次输入新密码" type="password" className="input" onChange={this.modifyPass.bind(this,"renewpass")}></InputItem>
                </List>
                <button onClick={this.modify.bind(this)}>确认修改</button>
            </div>
            </>
        );
    }
}