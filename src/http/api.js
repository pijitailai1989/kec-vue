import { http } from "./http";

const getWorkdays = data => http({ methods:'get' ,url:`/business/vendor`,data}) //获取工作日历
const putWorkdays = data => http({ methods:'put' ,url:`/business/vendor`,data}) //修改工作日历

const chargeUnits = data => http({ methods:'get' ,url:`/common/settings/chargeUnits`,data}) //查询所有的收费单位
const chargeUnitsType = data => http({ methods:'get' ,url:`/common/settings/chargeUnits/type`,data}) //通过单位类型查询对应的收费单位
const unitTypes = data => http({ methods:'get' ,url:`/common/settings/enums/unitTypes`,data}) //查询所有的单位类型
const chargeUnit = data => http({ methods:'get' ,url:`/common/settings/query/chargeUnit`,data}) //查询具体的某个收费单位
const addChargeUnits = data => http({ methods:'post' ,url:`/common/settings/chargeUnits`,data}) //新增收费单位
const modifyChargeUnit = data => http({ methods:'put' ,url:`/common/settings/chargeUnits`,data}) //修改收费单位信息
const delChargeUnit = data => http({ methods:'delete' ,url:`/common/settings/chargeUnits`,data}) // 删除收费单位


const queryServerType = data => http({ methods:'get' ,url:`/common/settings/serviceTypes/query/serverType`,data}) //查询某个具体的服务类型
const queryServerTypes = data => http({ methods:'get' ,url:`/common/settings/serviceTypes/query/serverTypes`,data}) //查询所有的服务类型列表
const subjectQueryItem = data => http({ methods:'get' ,url:`/accounting/subject/queryItem`,data}) //查询所有的科目

const createServerType = data => http({ methods:'post' ,url:`/common/settings/serviceTypes/create/serverType`,data}) //  新增服务类型
const modifyServiceType = data => http({ methods:'post' ,url:`/common/settings/serviceTypes/modify/serviceType`,data}) //   修改服务类型的名称
const createChargeItem = data => http({ methods:'post' ,url:`/common/settings/serviceTypes/chargeItems`,data}) //   新增服务类型收费项
const modifyChargeItem = data => http({ methods:'put' ,url:`/common/settings/serviceTypes/chargeItems`,data}) //   修改服务收费项
const deleteChargeItem = data => http({ methods:'delete' ,url:`/common/settings/serviceTypes/chargeItems`,data}) //   删除服务收费项
const deleteServiceType = data => http({ methods:'post' ,url:`/common/settings/serviceTypes/delete/serviceType`,data}) //   删除某个服务类型

const customerQueryAll = data => http({ methods:'get' ,url:`/business/customer/queryAll`,data}) //查询全部客户
const dictionaryCURRENCY = data => http({ methods:'get' ,url:`/business/customer/care/dictionaryData/CURRENCY`,data}) //查询币种
const customerQueryById = data => http({ methods:'get' ,url:`/business/customer/queryAll`,data}) //根据ID查询

const customerCreate = data => http({ methods:'post' ,url:`/business/customer/create`,data}) //  创建客户
const customerUpdate = data => http({ methods:'put' ,url:`/business/customer/update`,data}) //  更新客户
const customerUpdateStatus = data => http({ methods:'post' ,url:`/business/customer/updateStatus`,data}) //  更新状态

const vendorGetVendors = data => http({ methods:'get' ,url:`/business/vendor/getVendors`,data}) //全部供应商信息
const vendorType = data => http({ methods:'get' ,url:`/common/settings/enums/vendorType`,data}) //查询所有的供应商类型
const vendorPostVendor = data => http({ methods:'post' ,url:`/business/vendor/postVendor`,data}) //  创建供应商
const vendorPutVendor = data => http({ methods:'put' ,url:`/business/vendor/putVendor`,data}) //  修改供应商
const vendorDeleteVendor = data => http({ methods:'delete' ,url:`/business/vendor/deleteVendor`,data}) //  删除供应商


const vendorGetVendor1 = data => http({ methods:'get' ,url:`/business/vendor`,data}) //全部供应商费用表
const vendorPostVendor1 = data => http({ methods:'post' ,url:`/business/vendor`,data}) //添加供应商费用表
const vendorPutVendor1 = data => http({ methods:'put' ,url:`/business/vendor`,data}) //  修改供应商费用表
const vendorDeleteVendor1 = data => http({ methods:'delete' ,url:`/business/vendor`,data}) //删除供应商费用表

const vendorPostChargeItems = data => http({ methods:'post' ,url:`/business/vendor`,data}) //添加供应商费用表收费项
const vendorPutChargeItems = data => http({ methods:'put' ,url:`/business/vendor`,data}) //  修改供应商费用表收费项

const getVendorsByServiceType = data => http({ methods:'get' ,url:`/business/vendor`,data}) //根据服务类型ID获取对于的供应商列表
const channelGetChannels = data => http({ methods:'get' ,url:`/product/channel/getChannels`,data}) //渠道列表
const channelPostChannel = data => http({ methods:'post' ,url:`/product/channel/postChannel`,data}) //创建渠道
const channelPutChannel = data => http({ methods:'put' ,url:`/product/channel/putChannel`,data}) //修改渠道

const organizationQueryParent = data => http({ methods:'get' ,url:`/admin/settings/organization/queryParent`,data}) //查找所有节点
const subjectQueryParent = data => http({ methods:'get' ,url:`/accounting/subject/queryParent`,data}) //查找科目/级别
const organizationCreate = data => http({ methods:'post' ,url:`/admin/settings/organization/create`,data}) //创建组织
const organizationUpdate = data => http({ methods:'put' ,url:`/admin/settings/organization/update`,data}) //  修改组织

const roleCreate = data => http({ methods:'post' ,url:`/admin/user/role/create`,data}) //创建角色
const subjectCreate = data => http({ methods:'post' ,url:`/accounting/subject/create`,data}) //创建科目/级别
const roleUpdate = data => http({ methods:'put' ,url:`/admin/user/role/update`,data}) //  修改角色
const subjectUpdate = data => http({ methods:'put' ,url:`/accounting/subject/update`,data}) //  修改科目/级别

const authCreateUser = data => http({ methods:'post' ,url:`/admin/user/auth/createUser`,data}) //创建用户

const ristrictedWords = data => http({ methods:'get' ,url:`/ristrictedWords`,data}) //查询所有的敏感词
const paymentMethods = data => http({ methods:'get' ,url:`/common/settings/enums/paymentMethods`,data}) //查询所有的到付方式
const products = data => http({ methods:'get' ,url:`/product/products`,data}) //获取所有的产品
const productsId = data => http({ methods:'get' ,url:`/product`,data}) //通过 id 获取对应的产品
const servicePartitions = data => http({ methods:'get' ,url:`/product`,data}) // 通过产品Id和区域查询所有的服务分区

const postProducts = data => http({ methods:'post' ,url:`/product/products`,data}) //创建产品
const putProducts = data => http({ methods:'put' ,url:`/product/products`,data}) //修改产品
const deleteProducts = data => http({ methods:'delete' ,url:`/product/products`,data}) //删除产品

const categoryQueryParent = data => http({ methods:'get' ,url:`/common/settings/category/queryParent`,data}) //查找所有分类
const categoryCreate = data => http({ methods:'post' ,url:`/common/settings/category/create`,data}) //创建分类接口
const skuCreate = data => http({ methods:'post' ,url:`/common/settings/sku/create`,data}) //创建SKU接口
const categoryUpdate = data => http({ methods:'put' ,url:`/common/settings/category/update`,data}) //  更新分类接口
const skuUpdate = data => http({ methods:'put' ,url:`/common/settings/sku/update`,data}) //  修改SKU接口

const enumsTagTypes = data => http({ methods:'get' ,url:`/common/settings/enums/tagTypes`,data}) //查询所有的便签类型
const partitionMethods = data => http({ methods:'get' ,url:`/common/settings/enums/partitionMethods`,data}) //查询所有的分区方法
const getTags = data => http({ methods:'get' ,url:`/common/settings/tags`,data}) //分页查询
const postTags = data => http({ methods:'post' ,url:`/common/settings/tags`,data}) //创建标签
const putTags = data => http({ methods:'put' ,url:`/common/settings/tags`,data}) //修改标签
const deleteTags = data => http({ methods:'delete' ,url:`/common/settings/tags`,data}) //删除标签

const countryQueryAll = data => http({ methods:'get' ,url:`/common/settings/countries/queryAll`,data}) //获取所有国家
const queryByCountryCode = data => http({ methods:'get' ,url:`/common/settings/subdivision/queryByCountryCode`,data}) //根据国家代码（二字码）查找所有行政区域
const locationQueryAll = data => http({ methods:'get' ,url:`/common/settings/location/queryAll`,data}) //查找地区
const locationCreate = data => http({ methods:'post' ,url:`/common/settings/location/create`,data}) //创建地区
const locationUpdate = data => http({ methods:'put' ,url:`/common/settings/location/update`,data}) //修改地区
const locationDelete = data => http({ methods:'delete' ,url:`/common/settings/location/delete`,data}) //删除地区

const getOrders = data => http({ methods:'get' ,url:`/business/orders`,data}) //获取订单
const putOrders = data => http({ methods:'put' ,url:`/business/orders`,data}) //修改订单
const getQueryLevelTwo = data => http({ methods:'get' ,url:`/common/settings/standardState/queryLevelTwo`,data}) //查询所有的订单的状态 
const getProductBrief = data => http({ methods:'get' ,url:`/product/productBrief`,data}) //查询所有产品
const getCustomerBrief = data => http({ methods:'get' ,url:`/business/customer/customerBrief`,data}) //查询所有的用户的Id和名字

const getLogisticsException = data => http({ methods:'get' ,url:`/business/customer/care/logisticsExceptions`,data}) //物流异常 -查询
const postLogisticsException = data => http({ methods:'post' ,url:`/business/customer/care/logisticsExceptions`,data}) //物流异常 -添加
const putLogisticsException = data => http({ methods:'put' ,url:`/business/customer/care/logisticsExceptions`,data}) //物流异常 -修改
const getOrderState = data => http({ methods:'get' ,url:`/business/orderState/queryByOrderNum`,data}) //通过订单号获得货态列表

const getStandardState = data => http({ methods:'get' ,url:`/common/settings/standardState/queryTree`,data}) //查找货态实体结构
const postStandardState = data => http({ methods:'post' ,url:`/common/settings/standardState/create`,data}) //创建
const putStandardState = data => http({ methods:'put' ,url:`/common/settings/standardState/update`,data}) //修改
const deleteStandardState = data => http({ methods:'delete' ,url:`/common/settings/standardState/delete`,data}) //删除
const putUpdateStatus = data => http({ methods:'put' ,url:`/common/settings/standardState/updateStatus`,data}) //启用

const organizationQueryAll = data => http({ methods:'get' ,url:`/admin/settings/organization/queryAll`,data}) //查询所有组织列表
const queryByOrgId = data => http({ methods:'get' ,url:`/admin/user/role/queryByOrgId`,data}) //查询某组织下的所有角色
const getUsers = data => http({ methods:'get' ,url:`/admin/user/auth/getUsers`,data}) //分页查询用户列表
const getUserRoleQueryAll = data => http({ methods:'get' ,url:`/admin/user/role/queryAll`,data}) //查询所有角色列表
const createUser = data => http({ methods:'post' ,url:`/admin/user/auth/createUser`,data}) //创建用户
const updateUser = data => http({ methods:'put' ,url:`/admin/user/auth/updateUser`,data}) //修改用户
const resetRole = data => http({ methods:'put' ,url:`/admin/user/auth/resetRole`,data}) //修改用户角色
const deleteUser = data => http({ methods:'delete' ,url:`/admin/user/auth/deleteUser`,data}) //删除用户

const getPermission = data => http({ methods:'get' ,url:`/admin/settings/permission`,data}) //权限管理_查询全部
const getFindRouterPathList = data => http({ methods:'get' ,url:`/admin/settings/permission/findRouterPathList`,data}) //权限路径_查询全部
const putPermission = data => http({ methods:'put' ,url:`/admin/settings/permission`,data}) //权限管理_修改
const postPermission = data => http({ methods:'post' ,url:`/admin/settings/permission`,data}) //权限管理_添加
const getPermissionRole = data => http({ methods:'get' ,url:`/admin/settings/permission/role`,data}) //权限管理_查询角色的权限
const postPermissionRole = data => http({ methods:'post' ,url:`/admin/settings/permission/role`,data}) //权限管理_修改角色的权限 

const codeQueryPage = data => http({ methods:'post' ,url:`/common/rule/code/queryPage`,data}) //查询编码规则
const codeCreate = data => http({ methods:'post' ,url:`/common/rule/code/create`,data}) //创建编码规则
const codeUpdate = data => http({ methods:'put' ,url:`/common/rule/code/update`,data}) //修改编码规则
const codeDelete = data => http({ methods:'delete' ,url:`/common/rule/code/delete`,data}) //删除编码规则
const codeStatus = data => http({ methods:'get' ,url:`/common/rule/code/status`,data}) //更新状态

const queryByVendorId = data => http({ methods:'get' ,url:`/business/vendorState/queryByVendorId`,data}) //查询供应商货态
const vendorStateCreate = data => http({ methods:'post' ,url:`/business/vendorState/create`,data}) //新增供应商货态
const vendorStateUpdate = data => http({ methods:'put' ,url:`/business/vendorState/update`,data}) //修改供应商货态
const vendorStateDelete = data => http({ methods:'delete' ,url:`/business/vendorState/delete`,data}) // 删除供应商货态

export default {
    queryByVendorId,
    vendorStateCreate,
    vendorStateUpdate,
    vendorStateDelete,
    
    codeQueryPage,
    codeCreate,
    codeUpdate,
    codeDelete,
    codeStatus,
    
    getPermission,
    getFindRouterPathList,
    putPermission,
    postPermission,
    getPermissionRole,
    postPermissionRole,

    organizationQueryAll,
    queryByOrgId,
    getUsers,
    getUserRoleQueryAll,
    createUser,
    updateUser,
    resetRole,
    deleteUser,

    getStandardState,
    postStandardState,
    putStandardState,
    deleteStandardState,
    putUpdateStatus,

    getOrders,
    putOrders,
    getQueryLevelTwo,
    getProductBrief,
    getCustomerBrief,

    getLogisticsException,
    postLogisticsException,
    putLogisticsException,
    getOrderState,

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
    vendorType,
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

