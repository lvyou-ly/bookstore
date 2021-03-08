import React from "react";
import "./sass/search-result.scss";
import { reqFindBook } from "../../api/index";
import {connect} from "react-redux";
import {changeBookDetail} from "../../redux/action";
class SearchResult extends React.Component{
    constructor(props){
        super(props);
        this.state={
            books:[]
        }
    }
    async componentWillMount(){
        let response=await reqFindBook({bookname:this.props.bookname});
        this.setState({books:response.data});
    }
    jumpBookDetail(item){
        item.count=1;
        this.props.changeBookDetail(item);
        this.props.jumpBookDetail();
    }
    render(){
        return (
            <div className="search-result">
                {
                    this.state.books.length>0?
                        this.state.books.map((item,index)=>{
                            return (
                                <div className="card" key={index} onClick={this.jumpBookDetail.bind(this,item)}>
                                    <img src={item.img} alt=""/>
                                    <p className="novel-name">{item.bookname}</p>
                                    <p className="novel-price">￥{item.bookprice}</p>
                                </div>
                            )
                        })
                    :
                    <p className="empty">未搜索到相关书籍</p>
                }
            </div>
        );
    }
}
export default connect(
    (state)=>({bookdetail:state.bookdetail}),
    {changeBookDetail}
)(SearchResult);