import axios from 'axios'

const drugTestURL = 'http://localhost:3002/'
// const drugTestURL = 'http://192.168.0.199:3002/'


/**
 * ---------------
 *药检打印系统接口
 */

// 获取入库药检打印系统列表接口
export const getWareHousingList = params => {
    return axios.post(drugTestURL + 'getWareHousingList', params).then(res => res.data)
}
// 把上传的药检图片存到数据库
export const insertDrugPic = params => {
    return axios.post(drugTestURL + 'insertDrugPic', params).then(res => res.data)
}
// 获取出库药检打印系统列表接口
export const getOutStockList = params => {
    return axios.post(drugTestURL + 'getOutStockList', params).then(res => res.data)
}
// 跟新打印状态
export const updatePrintStatus = params => {
    return axios.post(drugTestURL + 'updatePrintStatus', params).then(res => res.data)
}
