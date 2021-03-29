// Fisher–Yates shuffle
let shuffle = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const random = Math.floor(Math.random() * (i + 1))
    let temp = arr[i]
    arr[i] = arr[random]
    arr[random] = temp
  }
}

export default (arr, n) => {
  if (n <= arr.length) {
    shuffle(arr)
    let ret = arr.splice(1, n)
    return ret
  } else {
    console.log('everyone has get their prize!')
  }
}