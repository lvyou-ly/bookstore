import React from 'react';
import {connect} from "react-redux";
import Cookies from "js-cookie";
import { NavBar, Toast, Carousel, WingBlank,  } from 'antd-mobile';
import "./sass/main.scss";
import {changeMainConent, updateUser} from "../../redux/action";
import { reqGetUser } from '../../api/index';
import LoginLink from "../../components/login-link/login-link.jsx";
import RegisterLink from "../../components/register-link/register-link.jsx";
import MineLink from "../../components/mine-link/mine-link";
import FavouriteBooks from "../../components/favorite-books/favorite-books.jsx";
import Content from "../../components/content/content";
import SearchResult from "../../components/search-result/search-result";
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
        // 计算购物车商品数量
        let goodsNum = 0;
        if(this.props.user && this.props.user.chart) {
            this.props.user.chart.forEach(item => goodsNum = goodsNum + item.count);
            this.setState({ goodsNum });
        } else if(Cookies.get('token')){
            let response = await reqGetUser();
            if (response.code === 0) {
                response.data.chart.forEach(item => goodsNum = goodsNum + item.count);
                this.setState({ goodsNum });
                this.props.updateUser(response.data);
            } else {
                Toast.info(response.msg);
            }
        }
    }
    selectContent(key){
        // 切换图书组件
        this.props.changeMainConent(key);
    }
    jumpBookDetail() {
        console.log('jumpBookDetail')
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
        this.props.updateUser({username:"", tel:"", msg:"", redirectTo: '', });
        console.log('main', this.props.user)
    }
   async changeBookname(e){
        if(e.target.value===""){
            this.setState({showSearchRes:false});
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
                            Cookies.get("token")?
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
    (state)=>({main:state.main,user: state.user}),
    {changeMainConent, updateUser}
)(Main);