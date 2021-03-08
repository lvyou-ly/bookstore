import axios from "axios";
axios.interceptors.response.use(function (response) {
    if (response.status !== 200) {
        return Promise.reject(response.statusText);
    }
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export default function ajax(url="",method="GET",data={}){
   return axios({
        url,
        method,
        data,
    });
}