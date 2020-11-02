import axios from 'axios';
import {message, Space} from 'antd';

axios.defaults.timeout = 10000;  // 超时时间  10s
axios.defaults.baseURL = 'http://192.190.10.136:3001/';
const MethodType = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete',
    patch: 'patch'
};
/**
 * 模块说明:有api_token的请求
 */
const http = {
    interceptor: () => {
        const apiToken = '************';
        let headers = {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`,
        }
        return headers;
    },
    handleSucess: (url, params, success: Function, res) => {
        let responseData = res.data;
        switch (responseData.level) {
            case 'data':
                success(responseData.data);
                break;
            case 'alert':
                success(responseData.data);
                message.success(responseData.message);
                break;
            case 'error':
                message.error(responseData.message);
                break;
            case 'warning':
                message.warning(responseData.message);
                break;
        }
    },
    get: (url, params, success: Function) => {
        axios.get(url, params).then((res) => {
            http.handleSucess(url, params, success, res);
        }).catch((error) => {
            console.dir(error);
        });
    },
    post: (url, params, success: Function) => {
        axios.post(url, params).then((res) => {
            http.handleSucess(url, params, success, res);
        }).catch((error) => {
            console.dir(error);
        });
        // return new Promise((resolve, reject) => {
        //
        // })
    },

//         axios({
//                   url: url,
//                   'get',
//                   params: params,
//                   headers: this.interceptor(),
//     })
};
export default http;


