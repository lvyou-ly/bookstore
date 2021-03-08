import ajax from "./ajax.js";
import md5 from "blueimp-md5";
/**
 * @description 注册
 */
export async function reqRegister ({username,pass,tel}){
    pass=md5(pass);
    const res= await ajax("/register","POST",{username,pass,tel});
    return res;
    
}
/**
 * @description 登录
 */
export async function reqLogin({username,pass}){
    pass=md5(pass);
    const res= await ajax("/login","POST",{username,pass});
    return res;
}
/**
 * @description 增
 */
export async function reqAddBook(bookinfo){
    const res=await ajax("/add","POST",bookinfo);
    return res;
}
/**
 * @description 删
 */
export async function reqDelBook(ids){
    const res=await ajax("/del","POST",{ids});
    return res;
}
/**
 * @description 改
 */
export async function reqAlterBook(updates){
    let update=null;
    let resArr=[];
    for(let i=0;i<updates.length;i++){
        update=updates[i];
        const res=await ajax("/alter","POST",{update});
        resArr.push(res);
    }
    return resArr;
}
/**
 * @description 查
 */
export async function reqFindBook(condition){
    const res=await ajax("/find","POST",condition);
    return res;
}
/**
 * 购买（后台将对应商品的购买次数加1，以方便计算出大家最喜欢的三种图书books=[{bookname:"",count:},{}]
 */
export function reqBuyBook(condition){
    return ajax("/buy","POST",condition);
}
/**获取大众购买图书信息，从而前台可进一步计算出最受大众喜爱的三本图书 */
export function reqGetPeopleBuys(){
    return ajax("/peoplebuys","POST");
}
/**
 * 获取用户信息（目前主要用于获取购物车信息chart）
 */
export function reqGetUser(condition){
    return ajax("/getuser","POST",condition);
}
/**更新用户信息 condition={newdata:{}}*/
export function reqSaveUser(condition){
    return ajax("/saveuser","POST",condition);
}
/**修改密码 */
/**
 * @description passwords object {oldpass:"",newpass:""}
 */
export function reqModifyPass(userinfo) {
    return ajax("/modifypass","POST",userinfo);
}
/**保存收货地址 */
export function reqSaveAddr({addr}){
    return ajax("/saveaddr","POST",{addr});
}
export function reqUpdateChart(condition) {
    return ajax("/updatechart", "POST", condition);
}