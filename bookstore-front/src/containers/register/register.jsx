import React from "react";
import "./sass/register.scss";
import {InputItem, Toast} from "antd-mobile";
import {register} from "../../redux/action";
import {connect} from "react-redux";
import { Redirect} from "react-router-dom";
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            pass:"",
            repass:"",
            tel:"",
        }
        this.register=this.register.bind(this);
    }
    postInfo=(key,value)=>{
        this.setState({
            [key]:value
        });
    }
   async register(){
        if(this.state.pass!==this.state.repass) {
            return Toast.info("两次输入的密码不一致！",1);
         }
      await  this.props.register(this.state);
      Toast.info(this.props.user.msg,1);
       
    }
    render () {
        console.log('redirectTo',this.props.user.redirectTo)
        if(this.props.user.redirectTo){
            console.log('in')
            return <Redirect push to={this.props.user.redirectTo}></Redirect>
        }
        return (
            <div className="register">
                <p>欢迎注册本图书商城</p>
                <InputItem placeholder="用户名"  className="input" onChange={this.postInfo.bind(this,"username")}></InputItem>
                <InputItem type="password" placeholder="密码" className="input" onChange={this.postInfo.bind(this,"pass")}></InputItem> 
                <InputItem type="password" placeholder="确认密码" className="input" onChange={this.postInfo.bind(this,"repass")}></InputItem> 
                <InputItem placeholder="手机号" className="input" onChange={this.postInfo.bind(this,"tel")}></InputItem>  
                <button onClick={this.register}>注册</button>
            </div>
        );
    }
}
export default connect(
(state)=>({user:state.user}),
{register}
)(Register);