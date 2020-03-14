#!/bin/bash

# need to test

# property
file_fold="./dist"
remote_ip=47.106.197.252
identity_file="~/.ssh/id_rsa"

# git pull
git pull

# dist fold
if [ -d "./dist" ]; then
  echo "dist 文件夹存在, 进行删除"
  rm -rf ./dist
  echo "dist 文件夹删除成功"
fi

#package
echo "开始打包"
npm run build
echo "打包成功, 上传文件到远程服务器"
# copy to remote
scp -r -i ${identity_file} ${file_fold} root@${remote_ip}:/usr/share/nginx/html
echo "成功上传文件到服务器"

# exec command
echo "开始执行命令"
ssh -i ${identity_file} root@${remote_ip} "cd /usr/share/nginx/html; rm -rf ./index.html ./static; mv ./dist/** ./; rm -rf ./dist; nginx -s reload;"
echo "执行命令完成"