const queue = []

function add(item){
    queue.push(item)
}

function remove(){
    return queue.shift()
}
function peek(){
    return queue[0]
}

function isEmpty(){
    return queue.length === 0
}

function size(){
    return queue.length
}

module.exports = {
    add,
    remove,
    peek,
    isEmpty,
    size
}