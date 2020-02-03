export function getPromiseAction( p , commit , mutationType ){
    let promise = new Promise( (resolve,reject) => {
        p.then( res => {
            let {code ,message ,body} = res.data
            if(code === 200) {
                commit(mutationType, body)
                
                return resolve(message)
                
            } else {
                return reject( {code: 0,message: message} )
            }
        }, error => {
            
            return reject(
                {code:0,message:`数据加载失败，请重试,${error}`}
            )
        }).catch( error => {
            return reject(
                {code:0,message:`数据请求异常，请重试,${error}`}
            )
        })
    })
    return promise ;
}

export function getPromiseActionNoMutations(p){
    let promise = new Promise( (resolve,reject) => {
        p.then( res => {
            let {code ,message ,body} = res.data
            if(code === 200) {
                return resolve(message)
                
            } else {
                return reject( {code: 0 , message: message} )
            }
        }, error => {
            return reject(
                
                {code:0,message:`数据加载失败，请重试,${error}`}
            )
        }).catch( error => {
            return reject(
                {code:0,message:`数据请求异常，请重试,${error}`}
            )
        })
    })
    return promise ;
}