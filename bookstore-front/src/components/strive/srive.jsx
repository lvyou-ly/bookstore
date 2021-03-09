import React from "react";
import "./sass/strive.scss";
import { reqFindBook } from "../../api/index";
import {connect} from "react-redux";
import {changeBookDetail} from "../../redux/action";
class Strive extends React.Component{
    constructor(props){
        super(props);
        this.state={
            res:[],
        }
    }
    async componentWillMount(){
        const response=await reqFindBook({"booktype":"励志"});
        this.setState({res: response.data});
    }
    jumpBookDetail(item){
        item.count=1;
        this.props.changeBookDetail(item);
        this.props.jumpBookDetail();
    }
    render(){
        return (
            <div className="strive">
                {
                    this.state.res.map((item,index)=>{
                        return (
                            <div className="card" key={index} onClick={this.jumpBookDetail.bind(this,item)}>
                                <img src={item.img} alt=""/>
                                <p className="strive-name">{item.bookname}</p>
                                <p className="strive-price">￥{item.bookprice}</p>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
export default connect(
    (state)=>({bookdetail:state.bookdetail}),
    {changeBookDetail}
)(Strive);