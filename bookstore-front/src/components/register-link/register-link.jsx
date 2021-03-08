import React from "react";
import "./sass/register-link.scss";
import {Redirect} from "react-router-dom";
export default class RegisterLink extends React.Component {
    constructor(props){
        super(props);
        this.state={
            jumptoregister:"",
        }
    }
    jumpToRegister = () => {
        console.log("register")
        this.setState({jumptoregister:"/register"});
    }
    render () {
        if(this.state.jumptoregister){
            return (
                <Redirect to={this.state.jumptoregister}></Redirect>
            )
        }
        return (
            <p className="link" onClick={this.jumpToRegister}>注册</p>
        );
    }
}