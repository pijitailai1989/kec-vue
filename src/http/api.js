import { http } from "./http";

const getWorkdays = data => http({ methods:'get' ,url:``,data}) //获取工作日历
const putWorkdays = data => http({ methods:'put' ,url:``,data}) //修改工作日历

const chargeUnits = data => http({ methods:'get' ,url:`/query/chargeUnits`,data}) //查询所有的收费单位
const chargeUnit = data => http({ methods:'get' ,url:`/query/chargeUnit`,data}) //查询具体的某个收费单位
const addChargeUnits = data => http({ methods:'post' ,url:`/create/chargeUnit`,data}) //新增收费单位
const modifyChargeUnit = data => http({ methods:'post' ,url:`/modify/chargeUnit`,data}) //修改收费单位信息
const delChargeUnit = data => http({ methods:'post' ,url:`/delete/chargeUnit`,data}) // 删除收费单位


const queryServerType = data => http({ methods:'get' ,url:`/query/serverType`,data}) //查询某个具体的服务类型
const queryServerTypes = data => http({ methods:'get' ,url:`/query/serverTypes`,data}) //查询所有的服务类型列表

const createServerType = data => http({ methods:'post' ,url:`/create/serverType`,data}) //  新增服务类型
const modifyServiceType = data => http({ methods:'post' ,url:`/modify/serviceType`,data}) //   修改服务类型的名称
const createChargeItem = data => http({ methods:'post' ,url:`/create/chargeItem`,data}) //   新增服务类型收费项
const modifyChargeItem = data => http({ methods:'post' ,url:`/modify/chargeItem`,data}) //   修改服务收费项
const deleteChargeItem = data => http({ methods:'post' ,url:`/delete/chargeItem`,data}) //   删除服务收费项
const deleteServiceType = data => http({ methods:'post' ,url:`/delete/serviceType`,data}) //   删除某个服务类型

const customerQueryAll = data => http({ methods:'get' ,url:`/customer/queryAll`,data}) //查询全部客户
const dictionaryCURRENCY = data => http({ methods:'get' ,url:`/dictionaryData/CURRENCY`,data}) //查询币种
const customerQueryById = data => http({ methods:'get' ,url:`/customer/queryAll`,data}) //根据ID查询

const customerCreate = data => http({ methods:'post' ,url:`/customer/create`,data}) //  创建客户
const customerUpdate = data => http({ methods:'post' ,url:`/customer/update`,data}) //  更新客户
const customerUpdateStatus = data => http({ methods:'post' ,url:`/customer/updateStatus`,data}) //  更新状态

const vendorGetVendors = data => http({ methods:'get' ,url:`/vendor/getVendors`,data}) //全部供应商信息
const vendorPostVendor = data => http({ methods:'post' ,url:`/vendor/postVendor`,data}) //  创建供应商
const vendorPutVendor = data => http({ methods:'put' ,url:`/vendor/putVendor`,data}) //  修改供应商
const vendorDeleteVendor = data => http({ methods:'delete' ,url:`/vendor/deleteVendor`,data}) //  删除供应商


const vendorGetVendor1 = data => http({ methods:'get' ,url:``,data}) //全部供应商费用表
const vendorPostVendor1 = data => http({ methods:'post' ,url:``,data}) //添加供应商费用表
const vendorPutVendor1 = data => http({ methods:'put' ,url:``,data}) //  修改供应商费用表
const vendorDeleteVendor1 = data => http({ methods:'delete' ,url:``,data}) //删除供应商费用表

const vendorPostChargeItems = data => http({ methods:'post' ,url:``,data}) //添加供应商费用表收费项
const vendorPutChargeItems = data => http({ methods:'put' ,url:``,data}) //  修改供应商费用表收费项

const getVendorsByServiceType = data => http({ methods:'get' ,url:``,data}) //根据服务类型ID获取对于的供应商列表
const channelGetChannels = data => http({ methods:'get' ,url:`/channel/getChannels`,data}) //渠道列表
const channelPostChannel = data => http({ methods:'post' ,url:`/channel/postChannel`,data}) //创建渠道

export default {
    getWorkdays,
    putWorkdays,

    chargeUnits,
    chargeUnit,
    addChargeUnits,
    modifyChargeUnit,
    delChargeUnit,

    queryServerType,
    queryServerTypes,
    
    createServerType,
    modifyServiceType,
    createChargeItem, 
    modifyChargeItem, 
    deleteChargeItem, 
    deleteServiceType,

    customerQueryAll,
    dictionaryCURRENCY,
    customerQueryById,
    customerCreate,
    customerUpdate,
    customerUpdateStatus,

    vendorGetVendors,
    vendorPostVendor,
    vendorPutVendor,
    vendorDeleteVendor,
    
    vendorGetVendor1,
    vendorPostVendor1,
    vendorPutVendor1,
    vendorDeleteVendor1,

    vendorPostChargeItems,
    vendorPutChargeItems,

    getVendorsByServiceType,
    channelPostChannel,
    channelGetChannels


}

