import { combineReducers } from "redux";
import {
    UPDATE_USER,
    ERROR_MSG,
    CHANGE_MAIN_CONTENT,
    CHANGE_SYS_AREA,
    UPLOAD_IMAGE_URL,
    UPDATE_CHART,
    BOOK_DETAIL,
    TO_BUY
} from "./action-type";
const initUser={
    username:"",
    tel:"",
    msg:"",
    redirectTo: '',
}
const user=(state=initUser, action)=>{
        switch (action.type) {
            case UPDATE_USER:
                return {...state,...action.data};
            case ERROR_MSG:
                return {...initUser,...action.data};
            default:
                return state;
        }
    }
const initMain={
    isActive:"novel"
}
const main =(state=initMain,action)=>{
    switch(action.type){
        case CHANGE_MAIN_CONTENT:
            return {isActive:action.data};
        default:
            return state;
    }
}
const initSys={
    showArea:"add"
}
const sys=(state=initSys,action)=>{
    switch(action.type){
        case CHANGE_SYS_AREA:
            return {showArea:action.data};
        default:
            return state;
    }
}
const initUploadImg={url:""};
const uploadImg=(state=initUploadImg,action)=>{
    switch(action.type){
        case UPLOAD_IMAGE_URL:
            return {url:action.data};
        default:
            return state;
    }
}
const initChart={
    chart: []
}
const chart=(state=initChart,action)=>{
    switch(action.type){
        case UPDATE_CHART:
            return action.data;
        default:
            return state;
    }
}
const initBookDetail={
    item:{}
}
const bookdetail=(state=initBookDetail,action)=>{
    switch(action.type){
        case BOOK_DETAIL:
            return {item:action.data};
        default:
            return state;
    }
}
// [] | Object 商品详情页购买，类型为Object，购物车购买，类型为Array
const initToBuy = [];
const toBuy = (state = initToBuy, action) => {
    switch(action.type) {
        case TO_BUY:
            return action.data;
        default:
            return state;
    }
}
export default combineReducers({
    user,
    main,
    sys,
    uploadImg,
    chart,
    bookdetail,
    toBuy,
});