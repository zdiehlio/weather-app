let asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(typeof a === 'number' && typeof b === 'number') {
        resolve(a + b)
      } else {
        reject('aruments must be numbers')
      }
    }, 1000)
  })
}

asyncAdd(7, 5).then(res => {
  console.log('Result: ', res)
  return asyncAdd(res, 'aicm')
}).then(res => {
  console.log('new result', res)
  
}).catch(error => {
  console.log('error:', error)
  
})

// let somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('it worked!')
//     reject('unable to finish!')
//   }, 2500)
// })


// somePromise.then((message) => {
//   console.log(message)
//   }, (error) => {
//     console.log(error)
    
//   })