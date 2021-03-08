import React from "react";
import "./sass/login.scss";
import {InputItem} from "antd-mobile";
import {connect} from "react-redux";
import {login} from "../../redux/action";
import {Redirect} from "react-router-dom";
import {Toast} from "antd-mobile";
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            pass:""
        }
        this.login=this.login.bind(this);
    }
    changeInfo= (key,value)=>{
        this.setState({
            [key]:value
        });
    }
   async login(){
       await this.props.login(this.state);
       Toast.info(this.props.user.msg,1);
    }
    render () {
        if(this.props.user.redirectTo&&document.cookie.includes("token")){
            return (
                <Redirect to={this.props.user.redirectTo}></Redirect>
            );
        }
        return (
            <div className="login">
                <p>欢迎登录本图书商城</p>
                   <InputItem placeholder="用户名" className="input" onChange={this.changeInfo.bind(this,"username")}></InputItem>
                   <InputItem type="password" placeholder="密码" className="input" onChange={this.changeInfo.bind(this,"pass")}></InputItem> 
                <button onClick={this.login}>登录</button>
            </div>
        );
    }
}
export default connect(
(state)=>({user:state.user}),
{login}
)(Login);