import React from 'react';
import "./sass/main.scss";
import LoginLink from "../../components/login-link/login-link.jsx";
import RegisterLink from "../../components/register-link/register-link.jsx";
import MineLink from "../../components/mine-link/mine-link";
import FavouriteBooks from "../../components/favorite-books/favorite-books.jsx";
import Content from "../../components/content/content";
import {connect} from "react-redux";
import {changeMainConent, login} from "../../redux/action";
import SearchResult from "../../components/search-result/search-result";
import Cookies from "js-cookie";
import { NavBar, Toast  } from 'antd-mobile';
import { reqGetUser } from '../../api/index';
import { 
    Carousel, 
    WingBlank,
} from "antd-mobile";
class Main extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            swipeImgHeight: "6rem",
            segments: [
               {id:"novel",text:"小说"},
               {id:"literature",text:"文学"},
               {id:"comics",text:"动漫"},
               {id:"strive",text:"励志"},
               {id:"famousbook",text:"名著"}
            ],
            toChart:"",
            bookname:"",
            showSearchRes: false,
            goodsNum: 0,
        }
        this.swipeImgs = [];
        for(let i = 0;i < 3;i++) {
            this.swipeImgs.push(
                {
                 id:`swipeImg${i+1}`,
                 image: require(`./images/item${i+1}.jpg`).default
                }
                );
        }
        this.jumpBookDetail = this.jumpBookDetail.bind(this);
        this.jumpToMine = this.jumpToMine.bind(this);
    }
    search(){
        this.setState({showSearchRes:true});
    }
    async componentDidMount(){
        if(this.props.user && this.props.user.username) {
            this.setState({ goodsNum: this.props.user.chart.length });
        } else if(Cookies.get('token')){
            let response = await reqGetUser();
            if (response.code === 0) {
                let goodsNum = 0;
                response.data.chart.forEach(item => goodsNum = goodsNum + item.count);
                this.setState({ goodsNum });
            } else {
                Toast.info(response.msg);
            }
        }
    }
    selectContent(key){
        this.props.changeMainConent(key);
    }
    jumpBookDetail() {
        this.props.history.push('/bookdetails');
    }
    jumpToMine() {
        this.props.history.push('/mine');
    }
    jumpToChart=()=>{
        if(Cookies.get('token')) {
            this.props.history.push('/chart');
        } else {
            this.props.history.push('/login');
        }
    }
    exitLogin () {
        Cookies.remove("token");
        login({username:"", pass:"", tel:"", msg:"", redirectTo: '', });
        this.setState({toLogin:true});
    }
   async changeBookname(e){
        if(e.target.value===""){
            await this.setState({showSearchRes:false});
            return;
        }
        this.setState({bookname:e.target.value});
    }
    listenEnter (event) {
        if(event.keyCode === 13 && event.target.value) {
            this.search();
        }
    }
    render() {
        return (
            <>
            <NavBar
                mode="dark"
                className="nav"
            >图书商城</NavBar>
            <div className="main">
                <header>
                    <div className="icon"></div>
                    <div className="search-box">
                        <input type="text" placeholder="搜索" onKeyUp={this.listenEnter.bind(this)} onChange={this.changeBookname.bind(this)}/>
                        <i className="searchIcon" onClick={this.search.bind(this)}></i>
                   </div>
                        {
                            document.cookie.includes("token")?
                             (<div className="login-register-mine">
                                <MineLink jumpToMine={this.jumpToMine}></MineLink>
                                /
                                <p className="exitLogin" onClick={this.exitLogin.bind(this)}>退出</p>
                             </div>
                             
                             )
                            :(<div className="login-register-mine">
                                 <LoginLink></LoginLink>
                                 /
                                 <RegisterLink></RegisterLink>
                             </div>
                            )
                        }
                </header>
            {
                    this.state.showSearchRes?
                (
                    <SearchResult bookname={this.state.bookname} jumpBookDetail={this.jumpBookDetail}></SearchResult>
                ):
                (
                    <>
                    <div className="my-swiper">
                        <WingBlank>
                            <Carousel autoplay={true} infinite dots={true}>
                                {
                                    this.swipeImgs.map(item => <img key={item.id} src={item.image} style={{height: this.state.swipeImgHeight}}/>)
                                }
                            </Carousel>
                        </WingBlank>
                    </div>
                    <FavouriteBooks jumpBookDetail={this.jumpBookDetail}/>
                    <div className="segments">
                     {this.state.segments.map(item=><p key={item.id} className={this.props.main.isActive===item.id?"segment active":"segment"} onClick={this.selectContent.bind(this,item.id)}>{item.text}</p>)}
                    </div>
                    <div className="content">
                        <Content jumpBookDetail={this.jumpBookDetail}></Content> 
                    </div>
                    <footer>
                    <div className="chart-bottom" onClick={this.jumpToChart}>
                    <p className="goods-num">{this.state.goodsNum}</p>
                    </div>
                </footer>
                    </>
                )
            }
            </div>
            </>


        );
    }
}
export default connect(
    (state)=>({main:state.main,chart:state.chart, user: state.user}),
    {changeMainConent}
)(Main);