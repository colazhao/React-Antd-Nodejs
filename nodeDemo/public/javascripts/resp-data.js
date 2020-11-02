// interface RespData{
//     code: number,
//     level: string,
//     data: any,
//     message: string,
// }
var map = {
    'data': {
        code: 0,
        level: 'data',
        message: '操作成功'
    },
    'alert': {
        code: 1,
        level: 'alert',
        message: '操作成功'
    },
    'error': {
        code: 1,
        level: 'error',
        message: '错误'
    },
    'warning': {
        code: 1,
        level: 'warning',
        message: '警告'
    },
};

function back(data, type) {
    let responseData = map[type];
    responseData['data'] = data;
    return responseData;
}

module.exports = {
    back: back
    // sucessBack: function (data, data , message?:'操作成功') {
    //     let respData = {
    //         code: code,
    //         level: 'data',
    //         data: data,
    //         message: message
    //     };
    //     return respData;
    // }
};
// export class RespDataService {
//
// };
