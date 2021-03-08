import React from "react";
import "./sass/login-link.scss";
import {Redirect} from "react-router-dom";
export default class LoginLink extends React.Component {
    constructor(props){
        super(props);
        this.state={
            jumptologin:"",
        }
    }
    jumpToLogin = () => {
        this.setState({jumptologin:"/login"});
    }
    render () {
        if(this.state.jumptologin){
            return (
                <Redirect to={this.state.jumptologin}></Redirect>
            )
        }
        return (
            <p className="link" onClick={this.jumpToLogin}>登录</p>
        );
    }
}