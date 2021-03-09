import { reqRegister,reqLogin, reqUpdateChart } from "../api/index";
import {
    UPDATE_USER,
    ERROR_MSG,
    CHANGE_MAIN_CONTENT,
    CHANGE_SYS_AREA,
    UPLOAD_IMAGE_URL,
    UPDATE_CHART,
    BOOK_DETAIL,
    TO_BUY,
} from "./action-type";
//保存用户最新信息的同步action
export const updateUser = (user) => ({type: UPDATE_USER,data:user});
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});
//分发注册的异步action
export const register= ({username,pass,tel})=> {
    return async dispatch =>{
        const response = await reqRegister({username,pass,tel});
         if(response.code===0){
            dispatch(updateUser({...response.data,msg:response.msg,redirectTo:"/"}));
        }
        else {
            dispatch(errorMsg(response.msg));
        }
    }
}
//更改main页content内容的同步action
export const changeMainConent=(isActive)=>({type:CHANGE_MAIN_CONTENT,data:isActive});
//分发登录的异步action
export const login=(user)=>{
    return async dispatch=>{
        const response=await reqLogin(user);
        if(response.code===0){
            dispatch(updateUser({...response.data,msg:response.msg,redirectTo:"/"}));
        }
        else {
            dispatch(errorMsg(response.msg));
        }
    }
}
// 更新购物车（添加或删除）异步action operation = add | del
export const updateChartAsync = ({ book }) => {
    return async dispatch => {
        const response = await reqUpdateChart({ book });
        dispatch(updateUser({ chart: response.data, code: response.code }));
    }
}
//更改sys页功能面板的同步action
export const changeSysArea=(showArea)=>({type:CHANGE_SYS_AREA,data:showArea});
//分发上传图片url的同步action
export const uploadimg=(url)=>({type:UPLOAD_IMAGE_URL,data:url});
//分发查看商品详情的同步action
export const changeBookDetail=(item)=>({type:BOOK_DETAIL,data:item});
// 更新要购买图书的数组toBuy
export const updateToBuy = item => ({ type: TO_BUY, data: item });