import React from "react";
import "./sass/favorite-books.scss";
import {reqGetPeopleBuys} from "../../api/index";
import {connect} from "react-redux";
import {changeBookDetail} from "../../redux/action";
import { Toast } from 'antd-mobile';
class FavouriteBooks extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            favoriteBooks:[],
        }
    }
   async componentDidMount () {
       const response = await reqGetPeopleBuys();
       if (response.code === 0) {
           this.setState({favoriteBooks: response.data.mostThree});
       } else {
           Toast.info(response.msg, 1);
       }
    }
    jumpBookDetail(item){
        item.count=1;
        this.props.changeBookDetail(item);
        this.props.jumpBookDetail();
    }
     render () {
        return (
            <div className="books">
                <p className="people-like">大家都喜欢</p>
                <div className="book-container">
                    {
                        this.state.favoriteBooks.map((item,index)=>{
                            return (
                                <div className="card" key={index} onClick={this.jumpBookDetail.bind(this,item)}>
                                    <img src={item.img} alt=""/>
                                    <p className="novel-name"
                                         style={{
                                            "overflow": "hidden",
                                            "textOverflow": "ellipsis",
                                            "WebkitLineClamp": "2",
                                            "WebkitBoxOrient": "vertical"
                                        }}
                                    >{item.bookname}</p>
                                </div>
                            )
                        })
                    }   
                </div>
           </div>
        );
    }
}
export default connect(
    (state)=>({bookdetail:state.bookdetail}),
    {changeBookDetail}
)(FavouriteBooks);