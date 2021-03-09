import React from "react";
import "./sass/upload-img.scss";
import {ZipImg} from "../../util/zip";
import {connect} from "react-redux";
import {uploadimg} from "../../redux/action";
class UploadImg extends React.Component{
    constructor(props){
        super(props);
        this.state={
            w:this.props.w?this.props.w:"5rem",
            h:this.props.h?this.props.h:"5rem",
        }
        this.uploadRef = null;
    }
    async upload(e){
        const _this=this;
        let img=this.uploadRef.files[0];
        let reader = new FileReader();
        let imageObj = new Image();
        reader.readAsDataURL(img);
        reader.onload = function(event) {
            imageObj.src = event.target.result;
            setTimeout(() => {
              /**
               * @description file 压缩后的img
               */
              const base64url = ZipImg.getMinImg(imageObj, 1000); 
               _this.setState({url:base64url})
               _this.props.changeUrl(base64url);
               _this.props.uploadimg(base64url);
               // 解决input file不能连续上传两次相同图片问题
               _this.uploadRef.value = "";
            }, 0);
          };
          reader.onerror = (error) => {
              console.log('error', error);
          }
    }
    componentWillMount(){
        if(this.props.initUrl){
            this.props.uploadimg(this.props.initUrl);
        }
    }
    render(){
        return (
            <div className="upload-img" style={{"width":this.state.w,"height":this.state.h,...this.props.styles}}>
                <input type="file" ref={e => this.uploadRef = e} onChange={this.upload.bind(this)}/>
                {
                    (this.props.uploadImg.url||this.props.initUrl)?
                     (<img src={this.props.initUrl?this.props.initUrl:this.props.uploadImg.url}/>):
                    (<div className="upload-icon">+</div>)
                }
            </div>
        );
    }
}
export default connect(
    (state)=>({uploadImg:state.uploadImg}),
    {uploadimg}
)(UploadImg);