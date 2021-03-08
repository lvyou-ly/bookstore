import React from "react";
import "./sass/show-area.scss";
import {connect} from "react-redux";
import Add from "../../containers/add/add";
import Del from "../../containers/del/del";
import Alter from "../../containers/alter/alter";
import Find from "../../containers/find/find";
class ShowArea extends React.Component{
    render(){
        switch(this.props.sys.showArea){
            case "add":
                return (<Add></Add>);
            case "del":
                return (<Del></Del>);
            case "alter":
                return (<Alter></Alter>);
            case "find":
                return (<Find></Find>);
            default:
                return null;
        }
    }
}
export default connect(
    (state)=>({sys:state.sys}),
)(ShowArea);