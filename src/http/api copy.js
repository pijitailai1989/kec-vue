import { http } from "./http";

const getWorkdays = data => http({ methods:'get' ,url:``,data}) //获取工作日历
const putWorkdays = data => http({ methods:'put' ,url:``,data}) //修改工作日历

const chargeUnits = data => http({ methods:'get' ,url:`/chargeUnits`,data}) //查询所有的收费单位
const chargeUnitsType = data => http({ methods:'get' ,url:`/chargeUnits/type`,data}) //通过单位类型查询对应的收费单位
const unitTypes = data => http({ methods:'get' ,url:`/enums/unitTypes`,data}) //查询所有的单位类型
const chargeUnit = data => http({ methods:'get' ,url:`/query/chargeUnit`,data}) //查询具体的某个收费单位
const addChargeUnits = data => http({ methods:'post' ,url:`/chargeUnits`,data}) //新增收费单位
const modifyChargeUnit = data => http({ methods:'put' ,url:`/chargeUnits`,data}) //修改收费单位信息
const delChargeUnit = data => http({ methods:'delete' ,url:`/chargeUnits`,data}) // 删除收费单位


const queryServerType = data => http({ methods:'get' ,url:`/query/serverType`,data}) //查询某个具体的服务类型
const queryServerTypes = data => http({ methods:'get' ,url:`/query/serverTypes`,data}) //查询所有的服务类型列表
const subjectQueryItem = data => http({ methods:'get' ,url:`/subject/queryItem`,data}) //查询所有的科目

const createServerType = data => http({ methods:'post' ,url:`/create/serverType`,data}) //  新增服务类型
const modifyServiceType = data => http({ methods:'post' ,url:`/modify/serviceType`,data}) //   修改服务类型的名称
const createChargeItem = data => http({ methods:'post' ,url:`/chargeItems`,data}) //   新增服务类型收费项
const modifyChargeItem = data => http({ methods:'put' ,url:`/chargeItems`,data}) //   修改服务收费项
const deleteChargeItem = data => http({ methods:'delete' ,url:`/chargeItems`,data}) //   删除服务收费项
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
const channelPutChannel = data => http({ methods:'put' ,url:`/channel/putChannel`,data}) //修改渠道

const organizationQueryParent = data => http({ methods:'get' ,url:`/organization/queryParent`,data}) //查找所有节点
const subjectQueryParent = data => http({ methods:'get' ,url:`/subject/queryParent`,data}) //查找科目/级别
const organizationCreate = data => http({ methods:'post' ,url:`/organization/create`,data}) //创建组织
const organizationUpdate = data => http({ methods:'put' ,url:`/organization/update`,data}) //  修改组织

const roleCreate = data => http({ methods:'post' ,url:`/role/create`,data}) //创建角色
const subjectCreate = data => http({ methods:'post' ,url:`/subject/create`,data}) //创建科目/级别
const roleUpdate = data => http({ methods:'put' ,url:`/role/update`,data}) //  修改角色
const subjectUpdate = data => http({ methods:'put' ,url:`/subject/update`,data}) //  修改科目/级别

const authCreateUser = data => http({ methods:'post' ,url:`/auth/createUser`,data}) //创建用户

const ristrictedWords = data => http({ methods:'get' ,url:`/ristrictedWords`,data}) //查询所有的敏感词
const paymentMethods = data => http({ methods:'get' ,url:`/enums/paymentMethods`,data}) //查询所有的到付方式
const products = data => http({ methods:'get' ,url:`/products`,data}) //获取所有的产品
const productsId = data => http({ methods:'get' ,url:``,data}) //通过 id 获取对应的产品
const servicePartitions = data => http({ methods:'get' ,url:``,data}) // 通过产品Id和区域查询所有的服务分区

const postProducts = data => http({ methods:'post' ,url:`/products`,data}) //创建产品
const putProducts = data => http({ methods:'put' ,url:`/products`,data}) //修改产品
const deleteProducts = data => http({ methods:'delete' ,url:`/products`,data}) //删除产品

const categoryQueryParent = data => http({ methods:'get' ,url:`/category/queryParent`,data}) //查找所有分类
const categoryCreate = data => http({ methods:'post' ,url:`/category/create`,data}) //创建分类接口
const skuCreate = data => http({ methods:'post' ,url:`/sku/create`,data}) //创建SKU接口
const categoryUpdate = data => http({ methods:'put' ,url:`/category/update`,data}) //  更新分类接口
const skuUpdate = data => http({ methods:'put' ,url:`/sku/update`,data}) //  修改SKU接口

const enumsTagTypes = data => http({ methods:'get' ,url:`/enums/tagTypes`,data}) //查询所有的便签类型
const partitionMethods = data => http({ methods:'get' ,url:`/enums/partitionMethods`,data}) //查询所有的分区方法
const getTags = data => http({ methods:'get' ,url:`/tags`,data}) //分页查询
const postTags = data => http({ methods:'post' ,url:`/tags`,data}) //创建标签
const putTags = data => http({ methods:'put' ,url:`/tags`,data}) //修改标签
const deleteTags = data => http({ methods:'delete' ,url:`/tags`,data}) //删除标签

const countryQueryAll = data => http({ methods:'get' ,url:`/country/queryAll`,data}) //获取所有国家
const queryByCountryCode = data => http({ methods:'get' ,url:`/subdivision/queryByCountryCode`,data}) //根据国家代码（二字码）查找所有行政区域
const locationQueryAll = data => http({ methods:'get' ,url:`/location/queryAll`,data}) //查找地区
const locationCreate = data => http({ methods:'post' ,url:`/location/create`,data}) //创建地区
const locationUpdate = data => http({ methods:'put' ,url:`/location/update`,data}) //修改地区
const locationDelete = data => http({ methods:'delete' ,url:`/location/delete`,data}) //删除地区
export default {
    countryQueryAll,
    queryByCountryCode,
    locationQueryAll,
    locationCreate,
    locationUpdate,
    locationDelete,
    
    enumsTagTypes,
    partitionMethods,
    getTags,
    postTags,
    putTags,
    deleteTags,

    getWorkdays,
    putWorkdays,

    chargeUnits,
    chargeUnitsType,
    chargeUnit,
    unitTypes,
    addChargeUnits,
    modifyChargeUnit,
    delChargeUnit,

    queryServerType,
    queryServerTypes,
    subjectQueryItem,
    
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
    channelGetChannels,
    channelPutChannel,

    organizationQueryParent,
    organizationCreate,
    organizationUpdate,
    roleCreate,
    roleUpdate,
    authCreateUser,

    subjectQueryParent,
    subjectCreate,
    subjectUpdate,

    ristrictedWords,
    paymentMethods,
    products,
    productsId,
    servicePartitions,
    postProducts,
    putProducts,
    deleteProducts,

    categoryQueryParent,
    categoryCreate,
    skuCreate,
    categoryUpdate,
    skuUpdate


}

