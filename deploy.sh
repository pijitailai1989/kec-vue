#!/bin/bash -e

# 服务器IP别名映射

declare -A ip_server_name_map=(["47.106.197.252"]="app" ["47.91.254.65"]="app-01" ["47.52.57.105"]="app-02")
declare -A server_name_ip_map=()

echo ""
echo "--------debug--------"

for key in ${!ip_server_name_map[@]}
do
	value=${ip_server_name_map[${key}]}
    echo "ip_server_name_map : ${key} = ${value}"
	server_name_ip_map[${value}]=${key}
done
echo ""
echo ""
for key in ${!server_name_ip_map[@]}
do
	value=${server_name_ip_map[${key}]}
    echo "server_name_ip_map : ${key} = ${value}"
done

echo ""
echo "--------debug--------"
echo ""

app_server_ip=${server_name_ip_map["app"]}
app_01_server_ip=${server_name_ip_map["app-01"]}
app_02_server_ip=${server_name_ip_map["app-02"]}

remote_ip_array=()
nginx_path="/usr/share/nginx/html"
case ${1} in
    "dev")
        remote_ip_array=(${app_server_ip})
        ;;
	"uat")
		remote_ip_array=(${app_server_ip})
		nginx_path="/usr/share/nginx/uat"
		;;
    "prod")
        remote_ip_array=(${app_01_server_ip} ${app_02_server_ip})
        ;;
	*)
	    echo "请传递正确的部署环境参数,目前支持打包环境参数为[dev,uat,prod]，例子： sh deploy-front.sh dev"
	    exit 1
	    ;;
esac
build_env="build-${1}"

# property
file_fold="./dist"
identity_file="~/.ssh/id_rsa"


git pull

# dist fold
if [[ -d "./dist" ]]; then
  echo "dist 文件夹存在, 进行删除"
  rm -rf ./dist
  echo "dist 文件夹删除成功"
fi

#package
echo "开始打包 npm run ${build_env}"
npm run ${build_env}
echo "打包成功, 上传文件到远程服务器"

echo "一共部署${#remote_ip_array[@]}个服务器"
echo ""
for remote_ip in ${remote_ip_array[@]}
do
    echo "build_env   : ${build_env}"
    echo "ip          : ${remote_ip}"
    echo "server name : ${ip_server_name_map[${remote_ip}]}"
    echo "nginx_path  : ${nginx_path}"
    # copy to remote
    scp -r -i ${identity_file} ${file_fold} root@${remote_ip}:${nginx_path}
    echo "成功上传文件到服务器"
    # exec command
    # 0 此前，已经上传最新的前端 dist 文件夹到对应的目录，如 /usr/share/nginx/html/dist
    # 1 进去 nginx 对应的目录，/usr/share/nginx/html/。
    # 2 删除 /usr/share/nginx/html/ 目录下的 index.html及static文件夹
    # 3 移动 /usr/share/nginx/html/dist 文件夹所有内容到上一级目录即 /usr/share/nginx/html
    # 4 删除 /usr/share/nginx/html/dist 文件夹，此时 /usr/share/nginx/html/dist 是个空的文件夹
    # 5 重新加载 nginx 的配置 nginx -s reload
    exec_command="cd ${nginx_path}; rm -rf ./index.html ./static; mv ./dist/** ./; rm -rf ./dist; nginx -s reload;"
    echo "开始执行命令"
    echo "${exec_command}"
    ssh -i ${identity_file} root@${remote_ip} "${exec_command}"
    now=`date +"%Y-%m-%d %H:%M:%S"`
    echo "执行完成，完成时间：${now}"
    echo ""
done
