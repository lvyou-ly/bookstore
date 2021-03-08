import React from "react";
import "./sass/comics.scss";
import { reqFindBook } from "../../api/index";
import {connect} from "react-redux";
import {changeBookDetail} from "../../redux/action";
class Comics extends React.Component{
    constructor(props){
        super(props);
        this.state={
            res:[],
        }
    }
    async componentWillMount(){
        const response=await reqFindBook({"booktype":"动漫"});
        await this.setState({res: response.data});
    } 
    jumpBookDetail(item){
        item.count=1;
        this.props.changeBookDetail(item);
        this.props.jumpBookDetail();
    }
    render(){
        return (
            <div className="comics">
                 {
                    this.state.res.map((item,index)=>{
                        return (
                            <div className="card" key={index} onClick={this.jumpBookDetail.bind(this,item)}>
                                <img src={item.img} alt=""/>
                                <p className="comics-name"
                                    style={{
                                        "overflow": "hidden",
                                        "textOverflow": "ellipsis",
                                        "display": "-webkit-box",
                                        "WebkitLineClamp": "2",
                                        "WebkitBoxOrient": "vertical"
                                    }}
                                >{item.bookname}</p>
                                <p className="comics-price">￥{item.bookprice}</p>
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
)(Comics);