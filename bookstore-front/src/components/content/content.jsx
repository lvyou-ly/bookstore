import React from "react";
import "./sass/content.scss";
import {connect} from "react-redux";
import Novel from "../../components/novel/novel";
import Literature from "../../components/literature/literature";
import Comics from "../../components/comics/comics";
import Strive from "../../components/strive/srive";
import FamousBook from "../../components/famous-book/famous-book";
class Content extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        switch(this.props.main.isActive){
            case "novel":
                return (<Novel {...this.props}></Novel>);
            case "literature":
                return (<Literature {...this.props}></Literature>);
            case "comics":
                return (<Comics {...this.props}></Comics>);
            case "strive":
                return (<Strive {...this.props}></Strive>);
            case "famousbook":
                return (<FamousBook {...this.props}></FamousBook>);
            default:
                return (<div style={{"width":"100%","height":"100%","display":"flex","justifyContent":"center","alignItems":"center","fontSize":"30px","marginTop":"50px",}}>空！</div>)
        }
    }
}
export default connect(
    (state)=>({main:state.main})
)(Content);