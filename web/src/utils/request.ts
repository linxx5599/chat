export default function (...arg: any) {
    return new Promise((resolve, reject) => {
        fetch(...arg).then(res => res.json()).then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}