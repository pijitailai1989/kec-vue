export function getPromiseAction( p , commit , mutationType ){
    let promise = new Promise( (resolve,reject) => {
        p.then( res => {
            let {code ,message ,body} = res.data
            if(code === 200) {
                commit(mutationType, body)
                
                return resolve(message)
                
            } else {
                return reject(message)
            }
        }, error => {
            
            return reject(error)
        }).catch( error => {
            return reject(error)
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
                return reject(message)
            }
        }, error => {
            return reject(error)
        }).catch( error => {
            return reject(error)
        })
    })
    return promise ;
}