import React from "react";
import "./sass/add.scss";
import 'antd-mobile/dist/antd-mobile.css'; 
import {InputItem,List,TextareaItem,Toast,Picker } from "antd-mobile";
import {reqAddBook} from "../../api/index";
import UploadImg from "../../components/upload-img/upload-img";
import {connect} from "react-redux";
import {uploadimg} from "../../redux/action";
class Add extends React.Component{
   constructor(props){
       super(props);
       this.types=[
           {value:"小说",label:"小说"},
           {value:"文学",label:"文学"},
           {value:"动漫",label:"动漫"},
           {value:"励志",label:"励志"},
           {value:"名著",label:"名著"}
       ];
       this.state={
           bookname:"",
           booktype:"",
           bookprice:null,
           bookintro:"",
           img:"",
          
       }
       this.add=this.add.bind(this);
   }
   changeInfo=(key,value)=>{
       this.setState({[key]:value});
   }
   async add(){
    const response=await reqAddBook(this.state);
    Toast.info(response.msg,1);
    if(response.code===0){
        this.setState({
            bookname:"",
            booktype:"",
            bookprice:null,
            bookintro:"",
            img:"", 
        });
        this.props.uploadimg("");
    }
   }
   changeBookType=(booktype)=>{
    this.setState({booktype:booktype[0]});
   }
    render(){
        return (
            <div className="add">
                <h3>添加面板</h3>
                <Picker data={this.types} cols={1} value={[this.state.booktype]} onChange={this.changeBookType}>
                <List.Item arrow="horizontal">点击选择类别</List.Item>
                </Picker>
                <InputItem placeholder="书名" onChange={this.changeInfo.bind(this,"bookname")} value={this.state.bookname}>书名：</InputItem>
                <InputItem placeholder="价格" onChange={this.changeInfo.bind(this,"bookprice")} value={this.state.bookprice}>价格：</InputItem>
                <TextareaItem placeholder="简介" rows={5} onChange={this.changeInfo.bind(this,"bookintro")} value={this.state.bookintro} title="简介："></TextareaItem>
                <UploadImg w="8rem" h="8rem" initUrl="" changeUrl={this.changeInfo.bind(this,"img")} styles={{"margin":"1rem auto"}}></UploadImg>
                <button onClick={this.add}>添加</button>
            </div>
        );
    }
}
export default connect(
    (state)=>({uploadImg:state.uploadImg}),
    {uploadimg}
)(Add)