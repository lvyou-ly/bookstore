import React from "react";
import "./sass/alter.scss";
import {InputItem,List,TextareaItem, Toast, Picker } from "antd-mobile";
import {reqFindBook,reqAlterBook} from "../../api/index";
import UploadImg from "../../components/upload-img/upload-img";
import {connect} from "react-redux";
class Alter extends React.Component{
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
            res:[],
            updates:[],
            showTip:false,
            booktype:""
        }
    }
    async inputHandler(v){
        await this.setState({bookname:v});
        const response=await reqFindBook({bookname:this.state.bookname});
        if(response.code===0){
            this.setState({res:response.data});
        }
        this.setState({showTip:true});
    }
    async changeInfo(key,index,value){
        if(key==="booktype"){
            value=value[0];
        }
        let res=this.state.res;
        let updates=this.state.updates;
        let update=res[index];
        update={...update,[key]:value};
        res[index]=update;
        await this.setState({res});        
        let obj=null;
        obj=updates.find(item=>item._id==update._id);
        if(obj){
            let i=updates.indexOf(obj);
            updates[i]={...updates[i],...update};
            await this.setState({updates});
        } else {
            updates.push(update);
            await this.setState({updates});
        }
    }
   async modify(){
    let isUpdateAll=true;
    const resArr=await reqAlterBook(this.state.updates);
    resArr.some(item=>{
        if(item.code===1){
            isUpdateAll=false;
            return true;
        }
    });
    if(isUpdateAll){
        Toast.info(`修改成功！共有${this.state.updates.length}条修改记录`,2);
        const response=await reqFindBook({bookname:this.state.bookname});
            if(response.code===0){
               await this.setState({res:response.data});
               this.setState({updates:[]});
            }
    } else {
        Toast.info("未能全部更新！",2);
    }
    }
    render(){
        return (
            <div className="alter">
                <h3>修改面板</h3>
                <InputItem placeholder="名字" value={this.state.bookname} onChange={this.inputHandler.bind(this)} style={{"paddingLeft":"0.7rem"}}>书名：</InputItem>
                {
                    this.state.showTip?<h4>共有&nbsp;{this.state.res.length}&nbsp;条记录</h4>:null
                }
                {
                    
                    this.state.res.map((item,index)=>{
                        return (
                            <div key={index} className="card">
                                <UploadImg changeUrl={this.changeInfo.bind(this,"img",index)} initUrl={item.img}></UploadImg>
                                <Picker data={this.types} cols={1} value={[item.booktype]} onChange={this.changeInfo.bind(this,"booktype",index)}>
                                    <List.Item arrow="horizontal">点击选择类别</List.Item>
                                </Picker>
                                <InputItem placeholder="名字" value={item.bookname} onChange={this.changeInfo.bind(this,"bookname",index)}>书名：</InputItem>
                                <InputItem placeholder="价格" value={item.bookprice} onChange={this.changeInfo.bind(this,"bookprice",index)}>价格：</InputItem>
                                <TextareaItem placeholder="简介" rows={5} title="简介：" value={item.bookintro} onChange={this.changeInfo.bind(this,"bookintro",index)}></TextareaItem>
                            </div>
                        )
                    })
                }
               
                
               
                <button onClick={this.modify.bind(this)}>确定修改</button>
            </div>
        );
    }
}
export default connect(
    (state)=>({uploadImg:state.uploadImg}),
)(Alter);