export default function (...arg: any) {
    return new Promise((resolve, reject) => {
        fetch(...arg).then(res => res.json()).then(resilt => {
            resolve(resilt)
            resolve(resilt)
        }).catch(err => {
            reject(err)
        })
    })
}