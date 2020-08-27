import { http } from "./http";

export const getWorkdays = data => http({ methods:'get' ,url:`/business/vendor`,data}) //获取工作日历
export const putWorkdays = data => http({ methods:'put' ,url:`/business/vendor`,data}) //修改工作日历
 
export const getOperation = data => http({ methods:'get' ,url:`/admin/settings/organization/getOrzByOrzCode/OPERATION`,data}) //运营主体列表
export const getService = data => http({ methods:'get' ,url:`/admin/user/auth/getUsersBySalesAndCustomerService`,data}) //代表列表
 
export const chargeUnits = data => http({ methods:'get' ,url:`/common/settings/chargeUnits`,data}) //查询所有的收费单位
export const chargeUnitsType = data => http({ methods:'get' ,url:`/common/settings/chargeUnits/type`,data}) //通过单位类型查询对应的收费单位
export const unitTypes = data => http({ methods:'get' ,url:`/common/settings/enums/unitTypes`,data}) //查询所有的单位类型
export const chargeUnit = data => http({ methods:'get' ,url:`/common/settings/query/chargeUnit`,data}) //查询具体的某个收费单位
export const addChargeUnits = data => http({ methods:'post' ,url:`/common/settings/chargeUnits`,data}) //新增收费单位
export const modifyChargeUnit = data => http({ methods:'put' ,url:`/common/settings/chargeUnits`,data}) //修改收费单位信息
export const delChargeUnit = data => http({ methods:'delete' ,url:`/common/settings/chargeUnits`,data}) // 删除收费单位
 
export const queryServerType = data => http({ methods:'get' ,url:`/common/settings/serviceTypes/query/serverType`,data}) //查询某个具体的服务类型
 // const queryServerTypes = data => http({ methods:'get' ,url:`/common/settings/serviceTypes/query/serverTypes`,data}) //查询所有的服务类型列表
export const queryServerTypes = data => http({ methods:'get' ,url:`/common/settings/enums/serviceTypes`,data}) //查询所有的服务类型列表
export const subjectQueryItem = data => http({ methods:'get' ,url:`/accounting/subject/queryItem`,data}) //查询所有的科目

export const createServerType = data => http({ methods:'post' ,url:`/common/settings/serviceTypes/create/serverType`,data}) //  新增服务类型
export const modifyServiceType = data => http({ methods:'post' ,url:`/common/settings/serviceTypes/modify/serviceType`,data}) //   修改服务类型的名称
// const createChargeItem = data => http({ methods:'post' ,url:`/common/settings/serviceTypes/chargeItems`,data}) //   新增服务类型收费项
// const modifyChargeItem = data => http({ methods:'put' ,url:`/common/settings/serviceTypes/chargeItems`,data}) //   修改服务收费项
// const deleteChargeItem = data => http({ methods:'delete' ,url:`/common/settings/serviceTypes/chargeItems`,data}) //   删除服务收费项
export const deleteServiceType = data => http({ methods:'post' ,url:`/common/settings/serviceTypes/delete/serviceType`,data}) //   删除某个服务类型

export const getChargeItem = data => http({ methods:'get' ,url:`/common/settings/chargeItems`,data}) //   查询收费项
export const getAccountObject = data => http({ methods:'get' ,url:`/common/settings/enums/accountObject`,data}) //   查询所有的计费依据 
export const getChargeItemAll = data => http({ methods:'get' ,url:`/common/settings/chargeItems/all`,data}) //   查询收费项
export const createChargeItem = data => http({ methods:'post' ,url:`/common/settings/chargeItems`,data}) //  新增收费项
export const modifyChargeItem = data => http({ methods:'put' ,url:`/common/settings/chargeItems`,data}) //   修改收费项
export const deleteChargeItem = data => http({ methods:'delete' ,url:`/common/settings/chargeItems`,data}) // 删除收费项

export const customerQueryAll = data => http({ methods:'get' ,url:`/business/customer/queryAll`,data}) //查询全部客户
export const dictionaryCURRENCY = data => http({ methods:'get' ,url:`/business/customer/care/dictionaryData/CURRENCY`,data}) //查询币种
export const customerQueryById = data => http({ methods:'get' ,url:`/business/customer/queryAll`,data}) //根据ID查询

export const customerCreate = data => http({ methods:'post' ,url:`/business/customer/create`,data}) //  创建客户
export const customerUpdate = data => http({ methods:'put' ,url:`/business/customer/update`,data}) //  更新客户
export const customerUpdateStatus = data => http({ methods:'post' ,url:`/business/customer/updateStatus`,data}) //  更新状态

export const vendorGetVendors = data => http({ methods:'get' ,url:`/business/vendor/getVendors`,data}) //全部供应商信息
export const vendorType = data => http({ methods:'get' ,url:`/common/settings/enums/vendorType`,data}) //查询所有的供应商类型
export const vendorPostVendor = data => http({ methods:'post' ,url:`/business/vendor/postVendor`,data}) //  创建供应商
export const vendorPutVendor = data => http({ methods:'put' ,url:`/business/vendor/putVendor`,data}) //  修改供应商
export const vendorDeleteVendor = data => http({ methods:'delete' ,url:`/business/vendor/deleteVendor`,data}) //  删除供应商

export const vendorGetVendor1 = data => http({ methods:'get' ,url:`/business/vendor`,data}) //全部供应商费用表
export const vendorPostVendor1 = data => http({ methods:'post' ,url:`/business/vendor`,data}) //添加供应商费用表
export const vendorPutVendor1 = data => http({ methods:'put' ,url:`/business/vendor`,data}) //  修改供应商费用表
export const vendorDeleteVendor1 = data => http({ methods:'delete' ,url:`/business/vendor`,data}) //删除供应商费用表

export const vendorPostChargeItems = data => http({ methods:'post' ,url:`/business/vendor`,data}) //添加供应商费用表收费项
export const vendorPutChargeItems = data => http({ methods:'put' ,url:`/business/vendor`,data}) //  修改供应商费用表收费项

export const getVendorsByServiceType = data => http({ methods:'get' ,url:`/business/vendor`,data}) //根据服务类型ID获取对于的供应商列表
// const channelGetChannels = data => http({ methods:'get' ,url:`/product/channel/getChannels`,data}) //渠道列表
// const channelPostChannel = data => http({ methods:'post' ,url:`/product/channel/postChannel`,data}) //创建渠道
// const channelPutChannel = data => http({ methods:'put' ,url:`/product/channel/putChannel`,data}) //修改渠道
export const channelGetChannels = data => http({ methods:'get' ,url:`/product/channel`,data}) //渠道列表
export const getChannels = data => http({ methods:'get' ,url:`/product/channel/channelsWithPage`,data}) //渠道列表
export const channelPostChannel = data => http({ methods:'post' ,url:`/product/channel`,data}) //创建渠道
export const channelPutChannel = data => http({ methods:'put' ,url:`/product/channel`,data}) //修改渠道

export const organizationQueryParent = data => http({ methods:'get' ,url:`/admin/settings/organization/queryParent`,data}) //查找所有节点
export const subjectQueryParent = data => http({ methods:'get' ,url:`/accounting/subject/queryParent`,data}) //查找科目/级别
export const organizationCreate = data => http({ methods:'post' ,url:`/admin/settings/organization/create`,data}) //创建组织
export const organizationUpdate = data => http({ methods:'put' ,url:`/admin/settings/organization/update`,data}) //  修改组织

export const roleCreate = data => http({ methods:'post' ,url:`/admin/user/role/create`,data}) //创建角色
export const subjectCreate = data => http({ methods:'post' ,url:`/accounting/subject/create`,data}) //创建科目/级别
export const roleUpdate = data => http({ methods:'put' ,url:`/admin/user/role/update`,data}) //  修改角色
export const subjectUpdate = data => http({ methods:'put' ,url:`/accounting/subject/update`,data}) //  修改科目/级别

export const authCreateUser = data => http({ methods:'post' ,url:`/admin/user/auth/createUser`,data}) //创建用户

export const ristrictedWords = data => http({ methods:'get' ,url:`/ristrictedWords`,data}) //查询所有的敏感词
export const paymentMethods = data => http({ methods:'get' ,url:`/common/settings/enums/paymentMethods`,data}) //查询所有的到付方式
export const products = data => http({ methods:'get' ,url:`/product/products`,data}) //获取所有的产品
export const productsSimpleList = data => http({ methods:'get' ,url:`/product/products/simpleList`,data}) //获取所有的产品
export const productsId = data => http({ methods:'get' ,url:`/product/products`,data}) //通过 id 获取对应的产品
export const servicePartitions = data => http({ methods:'get' ,url:`/product`,data}) // 通过产品Id和区域查询所有的服务分区

export const postProducts = data => http({ methods:'post' ,url:`/product/products`,data}) //创建产品
export const putProducts = data => http({ methods:'put' ,url:`/product/products`,data}) //修改产品
export const deleteProducts = data => http({ methods:'delete' ,url:`/product/products`,data}) //删除产品
 
 // const categoryQueryParent = data => http({ methods:'get' ,url:`/common/settings/category/queryParent`,data}) //查找所有分类
 // const categoryCreate = data => http({ methods:'post' ,url:`/common/settings/category/create`,data}) //创建分类接口
 // const skuCreate = data => http({ methods:'post' ,url:`/common/settings/sku/create`,data}) //创建SKU接口
 // const categoryUpdate = data => http({ methods:'put' ,url:`/common/settings/category/update`,data}) //  更新分类接口
 // const skuUpdate = data => http({ methods:'put' ,url:`/common/settings/sku/update`,data}) //  修改SKU接口
 
export const categoryQueryParent = data => http({ methods:'get' ,url:`/common/settings/category`,data}) //查找所有分类
export const categoryCreate = data => http({ methods:'post' ,url:`/common/settings/category`,data}) //创建分类接口
export const skuCreate = data => http({ methods:'post' ,url:`/common/settings/sku`,data}) //创建SKU接口
export const categoryUpdate = data => http({ methods:'put' ,url:`/common/settings/category`,data}) //  更新分类接口
export const skuUpdate = data => http({ methods:'put' ,url:`/common/settings/sku`,data}) //  修改SKU接口

export const enumsTagTypes = data => http({ methods:'get' ,url:`/common/settings/enums/tagTypes`,data}) //查询所有的便签类型
export const partitionMethods = data => http({ methods:'get' ,url:`/common/settings/enums/partitionMethods`,data}) //查询所有的分区方法
export const getTags = data => http({ methods:'get' ,url:`/common/settings/tags`,data}) //分页查询
export const postTags = data => http({ methods:'post' ,url:`/common/settings/tags`,data}) //创建标签
export const putTags = data => http({ methods:'put' ,url:`/common/settings/tags`,data}) //修改标签
export const deleteTags = data => http({ methods:'delete' ,url:`/common/settings/tags`,data}) //删除标签

export const countryQueryAll = data => http({ methods:'get' ,url:`/common/settings/countries/queryAll`,data}) //获取所有国家
export const queryByCountryCode = data => http({ methods:'get' ,url:`/common/settings/subdivision/queryByCountryCode`,data}) //根据国家代码（二字码）查找所有行政区域
export const locationQueryAll = data => http({ methods:'get' ,url:`/common/settings/location/queryAll`,data}) //查找地区
export const locationCreate = data => http({ methods:'post' ,url:`/common/settings/location/create`,data}) //创建地区
export const locationUpdate = data => http({ methods:'put' ,url:`/common/settings/location/update`,data}) //修改地区
export const locationDelete = data => http({ methods:'delete' ,url:`/common/settings/location/delete`,data}) //删除地区

export const getOrders = data => http({ methods:'get' ,url:`/business/orders`,data}) //获取订单列表
export const getOrdersInfo = data => http({ methods:'get' ,url:`/business/orders`,data}) //获取订单详情
export const putOrders = data => http({ methods:'put' ,url:`/business/orders`,data}) //修改订单
export const deleteOrders = data => http({ methods:'delete' ,url:`/business/orders`,data}) //删除订单
export const patchOrders = data => http({ methods:'patch' ,url:`/business/orders`,data}) //拦截订单
export const getQueryLevelTwo = data => http({ methods:'get' ,url:`/common/settings/standardState/queryLevelTwo`,data}) //查询所有的订单的状态 
export const getProductBrief = data => http({ methods:'get' ,url:`/product/productBrief`,data}) //查询所有产品
export const getCustomerBrief = data => http({ methods:'get' ,url:`/business/customer/customerBrief`,data}) //查询所有的用户的Id和名字

export const getLogisticsException = data => http({ methods:'get' ,url:`/business/customer/care/logisticsExceptions`,data}) //物流异常 -查询
export const postLogisticsException = data => http({ methods:'post' ,url:`/business/customer/care/logisticsExceptions`,data}) //物流异常 -添加
export const putLogisticsException = data => http({ methods:'put' ,url:`/business/customer/care/logisticsExceptions`,data}) //物流异常 -修改
export const getOrderState = data => http({ methods:'get' ,url:`/business/orderState/queryByOrderNum`,data}) //通过订单号获得货态列表

export const getStandardState = data => http({ methods:'get' ,url:`/common/settings/standardState/queryTree`,data}) //查找货态实体结构
export const postStandardState = data => http({ methods:'post' ,url:`/common/settings/standardState/create`,data}) //创建
export const putStandardState = data => http({ methods:'put' ,url:`/common/settings/standardState/update`,data}) //修改
export const deleteStandardState = data => http({ methods:'delete' ,url:`/common/settings/standardState/delete`,data}) //删除
export const putUpdateStatus = data => http({ methods:'put' ,url:`/common/settings/standardState/updateStatus`,data}) //启用

export const organizationQueryAll = data => http({ methods:'get' ,url:`/admin/settings/organization/queryAll`,data}) //查询所有组织列表
export const queryByOrgId = data => http({ methods:'get' ,url:`/admin/user/role/queryByOrgId`,data}) //查询某组织下的所有角色
export const getUsers = data => http({ methods:'get' ,url:`/admin/user/auth/getUsers`,data}) //分页查询用户列表
export const getUserRoleQueryAll = data => http({ methods:'get' ,url:`/admin/user/role/queryAll`,data}) //查询所有角色列表
export const createUser = data => http({ methods:'post' ,url:`/admin/user/auth/createUser`,data}) //创建用户
export const updateUser = data => http({ methods:'put' ,url:`/admin/user/auth/updateUser`,data}) //修改用户
export const resetRole = data => http({ methods:'put' ,url:`/admin/user/auth/resetRole`,data}) //修改用户角色
export const deleteUser = data => http({ methods:'delete' ,url:`/admin/user/auth/deleteUser`,data}) //删除用户

export const getPermission = data => http({ methods:'get' ,url:`/admin/settings/permission`,data}) //权限管理_查询全部
export const getFindRouterPathList = data => http({ methods:'get' ,url:`/admin/settings/permission/findRouterPathList`,data}) //权限路径_查询全部
export const putPermission = data => http({ methods:'put' ,url:`/admin/settings/permission`,data}) //权限管理_修改
export const postPermission = data => http({ methods:'post' ,url:`/admin/settings/permission`,data}) //权限管理_添加
export const getPermissionRole = data => http({ methods:'get' ,url:`/admin/settings/permission/role`,data}) //权限管理_查询角色的权限
export const postPermissionRole = data => http({ methods:'post' ,url:`/admin/settings/permission/role`,data}) //权限管理_修改角色的权限 

export const codeQueryPage = data => http({ methods:'post' ,url:`/common/rule/code/queryPage`,data}) //查询编码规则
export const codeCreate = data => http({ methods:'post' ,url:`/common/rule/code/create`,data}) //创建编码规则
export const codeUpdate = data => http({ methods:'put' ,url:`/common/rule/code/update`,data}) //修改编码规则
export const bindRelation = data => http({ methods:'put' ,url:`/common/rule/code/bindRelation`,data}) //编码规则绑定
export const releaseRelation = data => http({ methods:'put' ,url:`/common/rule/code/releaseRelation`,data}) //编码规则解绑
export const codeDelete = data => http({ methods:'delete' ,url:`/common/rule/code/delete`,data}) //删除编码规则
export const codeStatus = data => http({ methods:'get' ,url:`/common/rule/code/status`,data}) //更新状态
export const codeQuery = data => http({ methods:'get' ,url:`/common/rule/code/query`,data}) //单个查询

export const queryByVendorId = data => http({ methods:'get' ,url:`/business/vendorState/queryByVendorId`,data}) //查询供应商货态
export const vendorStateCreate = data => http({ methods:'post' ,url:`/business/vendorState/create`,data}) //新增供应商货态
export const vendorStateUpdate = data => http({ methods:'put' ,url:`/business/vendorState/update`,data}) //修改供应商货态
export const vendorStateDelete = data => http({ methods:'delete' ,url:`/business/vendorState/delete`,data}) // 删除供应商货态

export const getVendorProducts = data => http({ methods:'get' ,url:`/business/vendor-products`,data}) //查询供应商产品
export const postVendorProducts = data => http({ methods:'post' ,url:`/business/vendor-products`,data}) //新增供应商产品
export const putVendorProducts = data => http({ methods:'put' ,url:`/business/vendor-products`,data}) //修改供应商产品

export const postLogin = data => http({ methods:'post' ,url:`/auth/login`,data}) //登陆
export const postLogout = data => http({ methods:'post' ,url:`/auth/logout`,data}) //登出

export const putInvestAccount = data => http({ methods:'put' ,url:`/business/customer/investAccount`,data}) //充值
export const getQueryAccount = data => http({ methods:'get' ,url:`/business/customer/queryAccount`,data}) //账户余额

export const getLastMileExtraInfos = data => http({ methods:'get' ,url:`/business/last-mile-extra-infos`,data}) // 末公里附加信息模块_查询全部
// const getLastMileExtraInfosOrder = data => http({ methods:'get' ,url:`/business/last-mile-extra-infos/order`,data}) // 末公里附加信息模块_用ProductCode查一个 
export const postLastMileExtraInfos = data => http({ methods:'post' ,url:`/business/last-mile-extra-infos`,data}) //末公里附加信息模块_新建
export const putLastMileExtraInfos= data => http({ methods:'put' ,url:`/business/last-mile-extra-infos`,data}) //末公里附加信息模块_更改一个
export const deleltLastMileExtraInfos = data => http({ methods:'delete' ,url:`/business/last-mile-extra-infos`,data}) // 末公里附加信息模块_删除一个

export const getFindAll = data => http({ methods:'get' ,url:`/product/findAll`,data}) //可用产品
export const getUsersByRoleCodeSALES = data => http({ methods:'get' ,url:`/admin/user/auth/getUsersByRoleCode/SALES_REP`,data}) //查找销售代表的用户
export const getUsersByRoleCodeSERVICE = data => http({ methods:'get' ,url:`/admin/user/auth/getUsersByRoleCode/SERVICE_REP`,data}) //查找客服代表的用户
export const postAgreementCreate = data => http({ methods:'post' ,url:`/business/agreement/create`,data}) //新增合同
export const postAgreementQueryPage = data => http({ methods:'post' ,url:`/business/agreement/queryPage`,data}) //分页查询合同
export const putAgreementfirstExamine = data => http({ methods:'put' ,url:`/business/agreement/firstExamine`,data}) //合同审核
export const putAgreementUpdate = data => http({ methods:'put' ,url:`/business/agreement/update`,data}) //修改合同

export const getCustomerInfo = data => http({ methods:'get' ,url:`/business/customer/customerInfo`,data}) //查询顾客的名字和顾客编码 
export const getProductByCustomer = data => http({ methods:'get' ,url:`/business/agreement/productByCustomer`,data}) //获取客户下的合同产品
export const getQueryRelation = data => http({ methods:'get' ,url:`/common/rule/code/queryRelation`,data}) //查询关系
export const getCostStatements = data => http({ methods:'get' ,url:`/business/cost-statements`,data}) //查询成本
export const putCostStatements = data => http({ methods:'put' ,url:`/business/cost-statements`,data}) //修改成本

export const getProductQuotations = data => http({ methods:'get' ,url:`/product/product-quotations`,data}) //查询供应商产品成本
export const getCostByProduct = data => http({ methods:'get' ,url:`/business/cost-statements/getCostByProduct`,data}) //查询产品成本
export const putProductQuotations = data => http({ methods:'put' ,url:`/product/product-quotations`,data}) //修改供应商产品成本

export const getCostStatementsVersions = data => http({ methods:'get' ,url:`/business/cost-statements/versions`,data}) //成本表_查_版本编号列表
export const getCostStatementsVersionsTwo = data => http({ methods:'get' ,url:`/business/cost-statements/versions`,data}) //成本表_查_通过版本编码查
// const getQueryItem = data => http({ methods:'get' ,url:`/accounting/subject/queryItem`,data}) //获取应付/应付类型科目
export const getQueryItem = data => http({ methods:'get' ,url:`/common/settings/ledgerSubject`,data}) //获取应付/应付类型科目
export const getExamineLog = data => http({ methods:'get' ,url:`/business/agreement/examineLog`,data}) //合同日志

export const getLocations = data => http({ methods:'get' ,url:`/common/settings/location/locations`,data}) //分页查询地点
export const getPartitionSchemas = data => http({ methods:'get' ,url:`/common/settings/PartitionSchemas`,data}) //分页查询分区
export const getPartitionSchemasAll = data => http({ methods:'get' ,url:`/common/settings/PartitionSchemas/all`,data}) //全部查询分区
export const postPartitionSchemas = data => http({ methods:'post' ,url:`/common/settings/PartitionSchemas`,data}) //新增供应商分区
export const putPartitionSchemas = data => http({ methods:'put' ,url:`/common/settings/PartitionSchemas`,data}) //修改供应商分区
export const deletePartitionSchemas = data => http({ methods:'delete' ,url:`/common/settings/PartitionSchemas`,data}) // 删除供应商分区

export const putRecall = data => http({ methods:'put' ,url:`/business/cost-statements/recall`,data}) //成本表_审核_撤回
export const putEexamine = data => http({ methods:'put' ,url:`/business/cost-statements/examine`,data}) //成本表_审核_审核
export const putSubmit = data => http({ methods:'put' ,url:`/business/cost-statements/submit`,data}) //成本表_审核_提交 

export const getCostGradients = data => http({ methods:'get' ,url:`/business/cost-gradients`,data}) //梯度成本_查_通过PriceId 
export const postCostGradients = data => http({ methods:'post' ,url:`/business/cost-gradients`,data}) //梯度成本_增 
export const putCostGradients = data => http({ methods:'put' ,url:`/business/cost-gradients`,data}) //梯度成本_改
export const putCostStatementsPrice = data => http({ methods:'put' ,url:`/business/cost-statements/price`,data}) //单一成本_改

export const getServicePartitions = data => http({ methods:'get' ,url:`/common/settings/ServicePartitions`,data}) //通过供应商产品的id查询对应的所有分区 
export const getProductTypes = data => http({ methods:'get' ,url:`/common/settings/enums/ProductTypes`,data}) //产品类型 

export const getProductQuotation = data => http({ methods:'get' ,url:`/product/product-quotations/list`,data}) //报价单_查询单个列表
export const getProductQuotationId = data => http({ methods:'get' ,url:`/product/product-quotations`,data}) //报价单_查询单个
export const getCountryPartition = data => http({ methods:'get' ,url:`/product/product-quotations/country-and-partition`,data}) //报价单_查询单个产品所有报价表的国家和分区
export const postProductQuotation = data => http({ methods:'post' ,url:`/product/product-quotations`,data}) //报价单_增加单个
export const putProductQuotation = data => http({ methods:'put' ,url:`/product/product-quotations`,data}) //报价单_集体修改

export const getAgreementQuotations = data => http({ methods:'get' ,url:`/product/agreement-quotations`,data}) //合同报价表_
export const postAgreementQuotations = data => http({ methods:'post' ,url:`/product/agreement-quotations`,data}) //合同报价表_增加单个
export const putAgreementQuotations = data => http({ methods:'put' ,url:`/product/agreement-quotations`,data}) //合同报价表_修改单个

export const getBillCycles = data => http({ methods:'get' ,url:`/common/settings/enums/bill-cycles`,data}) //应付账单_查_账单周期
export const getApBills = data => http({ methods:'get' ,url:`/accounting/ap-bills`,data}) //应付账单_增_手工增加一个账单 
export const getApBillsItems = data => http({ methods:'get' ,url:`/accounting/ap-bills/items`,data}) //应付账单_查_通过账单id下载详单
export const postApBills = data => http({ methods:'post' ,url:`/accounting/ap-bills`,data}) //应付账单_查_通过VendorID
export const getArBills = data => http({ methods:'get' ,url:`/accounting/ar-bills`,data}) //应付账单_查_通过VendorID
export const getArBillsItems = data => http({ methods:'get' ,url:`/accounting/ar-bills/items`,data}) //应付账单_查_通过账单id下载详单
export const postArBills = data => http({ methods:'post' ,url:`/accounting/ar-bills`,data}) //应付账单_查_通过VendorID
export const deleteArBills = data => http({ methods:'delete' ,url:`/accounting/ar-bills`,data}) //应付账单_删除
export const putArBills = data => http({ methods:'put' ,url:`/accounting/ar-bills`,data}) //刷新账单_查_通过VendorID

export const getProductPrices = data => http({ methods:'get' ,url:`/product/product-prices`,data}) //梯度报价_查_通过PriceId 
export const postProductPrices = data => http({ methods:'post' ,url:`/product/product-prices`,data}) //梯度报价_增 
export const putProductPrices = data => http({ methods:'put' ,url:`/product/product-prices`,data}) //梯度报价_改
export const putProductPricesItem = data => http({ methods:'put' ,url:`/product/product-prices/item`,data}) //单一报价_改
export const getComparativeRelation = data => http({ methods:'get' ,url:`/common/settings/enums/comparative-relation`,data}) //查询所有的比较关系

export const postProductPricesPrice = data => http({ methods:'post' ,url:`/product/product-prices/price`,data}) //价目_增加
export const deleteProductPricesPrice = data => http({ methods:'delete' ,url:`/product/product-prices/price`,data}) //价目_删除
export const getChargeItems = data => http({ methods:'get' ,url:`/common/settings/chargeItems`,data}) //价目_科目项

export const postCostStatementsPrice = data => http({ methods:'post' ,url:`/business/cost-statements/price`,data}) //成本项_增加
export const deleteCostStatementsPrice = data => http({ methods:'delete' ,url:`/business/cost-statements/price`,data}) //成本项_删除

export const postResetPassword = data => http({ methods:'post' ,url:`/auth/resetPassword`,data}) //忘记密码_发起 
export const putResetPassword = data => http({ methods:'put' ,url:`/auth/resetPassword`,data}) //忘记密码_修改

export const getExpenses = data => http({ methods:'get' ,url:`/accounting/unamortized-expenses`,data}) //费用录入
export const getExpenseNumberType = data => http({ methods:'get' ,url:`/common/settings/enums/expense-number-type`,data}) //查费用录入_单据类型
export const postExpenses = data => http({ methods:'post' ,url:`/accounting/unamortized-expenses`,data}) //费用录入_增 
export const putExpenses = data => http({ methods:'put' ,url:`/accounting/unamortized-expenses`,data}) //费用录入_改

export const getBoxes = data => http({ methods:'get' ,url:`/business/boxes`,data}) //箱子_查_根据箱子编号
export const getLocationsByType = data => http({ methods:'get' ,url:`/common/settings/location/getLocationsByType`,data}) //查地区_查港口
export const getSimpleLadingBills = data => http({ methods:'get' ,url:`/business/lading-bills/simple-lading-bills`,data}) //单据_查简单_列表
export const getLadingBills = data => http({ methods:'get' ,url:`/business/lading-bills`,data}) //单据_查简单_单个
export const postLadingBills = data => http({ methods:'post' ,url:`/business/lading-bills`,data}) //单据_增单个
export const postUploadCreate = data => http({ methods:'post' ,url:`/business/agreement/upload-create`,data}) //批量协议


