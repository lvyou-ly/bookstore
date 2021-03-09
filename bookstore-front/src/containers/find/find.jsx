import React from "react";
import "./sass/find.scss";
import {InputItem,List, Toast,Badge } from "antd-mobile";
import {reqFindBook} from "../../api/index";
export default class Find extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bookname:"",
            res:[],
            showTip:false,
            searchTimer: null
        }
        this.find=this.find.bind(this);
    }
    changeBookname=(v)=>{
        this.setState({bookname:v});
        this.searchTimer && clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => {
            this.find();
        }, 500);
    }
    async find(){
       const response=await reqFindBook({bookname:this.state.bookname});
       if(response.code===0){
           this.setState({res:response.data});
            Toast.info(`共查询到${response.data.length}条数据`);
       } else {
           Toast.info(response.msg,1);
       }
       this.setState({showTip:true});
    }
    componentWillUnmount() {
        this.searchTimer && clearTimeout(this.searchTimer);
    }
    render(){
        return (
            <div className="find">
                <h3>查询面板</h3>
                <List>
                <InputItem placeholder="书名" value={this.state.bookname} onChange={this.changeBookname} onBlur={this.find}>书名：</InputItem>
                
                </List>
                {
                    this.state.showTip?<h4>共有&nbsp;{this.state.res.length}&nbsp;条记录</h4>:null
                }
                {
                    this.state.res.map((item,index)=>{
                        return (
                            <div className="find-res" key={index}>
                            <Badge text={item.booktype} style={{padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2,left:"-1rem",top:"-1rem" }} />
                            <div className="img-name-price">
                            <img className="img" src={item.img}/>
                            <div className="name-price">
                                <p className="bookname">{item.bookname}</p>
                                <p className="price">￥{item.bookprice}</p>
                            </div>
                            </div>
                            <p className="intro" >{item.bookintro}</p>
                            </div> 
                        )
                    })
                }
                </div>
        );
    }
}