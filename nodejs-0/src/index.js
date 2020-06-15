'use strict'

const fibonacci = () => {
    let arr = [0,1]
    while(arr[arr.length-1] <= 350){
        const newNumber = arr[arr.length-1] + arr[arr.length-2]
        arr.push(newNumber)
    }
    return arr
}

const isFibonnaci = (num) => fibonacci().includes(num)

module.exports = {
    fibonacci,
    isFibonnaci
}
