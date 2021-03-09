import React from "react";
import "./sass/mine.scss";
import {reqGetUser,reqSaveUser,reqSaveAddr} from "../../api/index";
import {uploadimg} from "../../redux/action";
import UploadImg from "../../components/upload-img/upload-img";
import { Picker, List, Toast} from "antd-mobile";
import {connect} from "react-redux";
import { district } from 'antd-mobile-demo-data';
import { NavBar,Icon  } from 'antd-mobile';
class Mine extends React.Component {
    constructor (props) {   
        super(props);
        this.state = {
            visible: false,
            res:{},
            pickerValue: [],
            isReadOnly: true,
            specialAddr:"",
        }
    }
    async changeHead(v){
        let res=this.state.res;
        res.userpic=v;
        this.setState({res});
        this.props.uploadimg(v);
        await reqSaveUser({newdata:res});
    }
    back(){
        this.props.history.goBack();
    }
    async componentWillMount(){
        const response=await reqGetUser();
        this.setState({res:response.data});
        this.props.uploadimg(response.data.userpic);
        
    }
    toHistoryPage(e){
        this.props.history.push('/historyorders');
    }
    jumpToModifyPass(e){
        this.props.history.push('/ModifyPass');
    }
   async editAddr(e){
    this.setState({specialAddr:e.target.value});
    }
   async startEdit(e){
        this.setState({isReadOnly:false});
        this.refs.input.focus();
    }
    async saveAddr(){
        if(this.state.pickerValue.length<1){
            return Toast.info("请先选择收获地址");
        } else if(!this.state.specialAddr){
            return Toast.info("请先输入地址");
        }
        this.setState({isReadOnly:true});
        let addr=this.state.pickerValue;
        addr.push(this.state.specialAddr);
        const response=await reqSaveAddr({addr});
        Toast.info(response.msg);
    }
    changeAddr(v) {
        this.setState({ pickerValue: v });
    }
    render () {
        return (
            <>
            <NavBar
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={this.back.bind(this)}
                className="nav"
            >图书商城</NavBar>
            <div className="mine">
                <header>
                <UploadImg changeUrl={this.changeHead.bind(this)}></UploadImg>
                <div className="nickname">
                    {this.state.res.username}
                </div>
                </header>
                <List style={{ backgroundColor: 'white' }} className="picker-list">
                </List>
                <div className="modify-pass-head" onClick={this.jumpToModifyPass.bind(this)}>修改密码</div>
                <div className="history-orders-head" onClick={this.toHistoryPage.bind(this)}>历史订单</div>
                <Picker
                    title="选择地区"
                    extra="请选择"
                    data={district}
                    value={this.state.pickerValue}
                    onOk={this.changeAddr.bind(this)}
                   >
                 <List.Item
                 className="select-region"
                 >请选择收货地址</List.Item>
                </Picker>
                <div className="addr">
                    <textarea cols={47} type="text" ref="input" onChange={this.editAddr.bind(this)} placeholder="请填写具体的收货地址" readOnly={this.state.isReadOnly}/>
                </div>          
                <div className="btns">
                    <b className="icon" onClick={this.startEdit.bind(this)}>编辑</b>
                    <b className="save" onClick={this.saveAddr.bind(this)}>保存</b>
                </div> 
            </div>
            </>
        );
    }
}
export default connect(
    (state)=>({uploadImg:state.uploadImg}),
    {uploadimg}
)(Mine);