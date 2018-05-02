console.log('Starting up')

setTimeout(() => {
  console.log('inside of callback')
  
}, 2000)

setTimeout(() => {
  console.log('no timeout')
}, 0)

console.log('Ending')

