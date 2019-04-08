import axios from 'axios'

// const drugTestURL = 'http://localhost:3002/'
const drugTestURL = 'http://192.168.0.199:3002/'
// const suTuoDrugTestURL = 'http://localhost:3003/'
const suTuoDrugTestURL = 'http://192.168.0.199:3003/'


/**
 * ---------------
 *时空药检打印系统接口
 */

// 获取入库药检打印系统列表接口
export const getWareHousingList = params => {
    return axios.post(drugTestURL + 'getWareHousingList', params).then(res => res.data)
}
// 把上传的药检图片存到数据库
export const insertDrugPic = params => {
    return axios.post(drugTestURL + 'insertDrugPic', params,{headers:{'Content-Type':'multipart/form-data'}}).then(res => res.data)
}
// 获取出库药检打印系统列表接口
export const getOutStockList = params => {
    return axios.post(drugTestURL + 'getOutStockList', params).then(res => res.data)
}
// 跟新打印状态
export const updatePrintStatus = params => {
    return axios.post(drugTestURL + 'updatePrintStatus', params).then(res => res.data)
}

/**
 * ---------------
 *时空药检打印系统接口
 */
// 获取入库药检打印系统列表接口
export const suTuoGetWareHousingList = params => {
    return axios.post(suTuoDrugTestURL + 'suTuoGetWareHousingList', params).then(res => res.data)
}
// 把上传的药检图片存到数据库
export const suTuoInsertDrugPic = params => {
    return axios.post(suTuoDrugTestURL + 'suTuoInsertDrugPic', params,{headers:{'Content-Type':'multipart/form-data'}}).then(res => res.data)
}

