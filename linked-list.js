class LinkedList {
  constructor () {
    /* to simulate memory allocation behaviour
      instead of memory address, the pointer point to array index */
    this.memory = {
      start: null,
      list: []
    }
  }

  #size = 0
  #addNode (value) {
    // create a new node
    const newNode = new Node(value)
    // store the node in memory
    this.memory.list.push(newNode)
    this.#size++
    // create an address to attach to next pointer
    const address = this.memory.list.indexOf(newNode)
    return address
  }

  append (value) {
    const address = this.#addNode(value)
    // if list is empty, attach address to start
    if (this.memory.list.length === 1) this.memory.start = address
    else {
      // follow node pointer until reach null
      let node = this.memory.list[this.memory.start]
      let pointer = node.next
      while (pointer !== null) {
        node = this.memory.list[pointer]
        pointer = node.next
      }
      // when node pointer is null, set it to new node address
      node.next = address
    }
  }

  prepend (value) {
    const address = this.#addNode(value)
    if (this.memory.list.length === 1) this.memory.start = address
    else {
      // copy start pointer
      const pointer = this.memory.start
      // point node next to start address
      this.memory.list[address].next = pointer
      // change start pointer to node address
      this.memory.start = address
    }
  }

  size () {
    return this.#size
  }

  head () {
    const head = this.memory.start
    return this.memory.list[head]
  }

  tail () {
    // set node at node pointed by start, or first node in list
    let node = this.memory.list[this.memory.start]
    let pointer = node.next
    let prev
    while (pointer !== null) {
      node = this.memory.list[pointer]
      // store previous pointer address before following next
      prev = pointer
      pointer = node.next
    }
    return this.memory.list[prev]
  }

  at (index) {
    let [count, prev] = [0]
    let node = this.memory.list[this.memory.start]
    let pointer = node.next
    // return first node if index is 0
    if (index === 0) {
      return node
    } else {
      // else start following next
      while (count < index) {
        node = this.memory.list[pointer]
        // exit if node doesn't not exist
        if (node === undefined) return
        prev = pointer
        pointer = node.next
        count++
      }
      return this.memory.list[prev]
    }
  }

  pop () {
    let node = this.memory.list[this.memory.start]
    let pointer = node.next
    let prevNode
    while (pointer !== null) {
      // set previous node to node before updating node
      prevNode = node
      node = this.memory.list[pointer]
      pointer = node.next
    }
    // get node and previous node memory address
    const prevIndex = this.memory.list.indexOf(prevNode)
    const index = this.memory.list.indexOf(node)
    // set previous node pointer to null
    this.memory.list[prevIndex].next = null
    // remove node from memory
    this.memory.list.splice(index, 1)
    // don't forget to reduce size
    this.#size--
  }

  contains (value) {
    let node = this.memory.list[this.memory.start]
    let pointer = node.next
    while (pointer !== null) {
      // conditional below doesn't check last node value
      if (node.value === value) return true
      node = this.memory.list[pointer]
      pointer = node.next
    }
    // check last node value
    return (node.value === value)
  }

  find (value) {
    let node = this.memory.list[this.memory.start]
    let pointer = node.next
    while (pointer !== null) {
      if (node.value === value) {
        return this.memory.list.indexOf(node)
      }
      node = this.memory.list[pointer]
      pointer = node.next
    }
    return (node.value === value) ? this.memory.list.indexOf(node) : null
  }

  toString () {
    if (this.#size === 0) return null
    else {
      let string = ''
      let node = this.memory.list[this.memory.start]
      let pointer = node.next
      // append node value to string except the last node
      for (let i = 0; i < this.#size - 1; i++) {
        string += `( ${node.value} ) -> `
        node = this.memory.list[pointer]
        if (node === undefined) return
        pointer = node.next
      }
      // append last node value
      // last node appended separately because node.next is undefined
      // it will break pointer = node.next in the loop
      string += `( ${node.value} ) -> null`
      return string
    }
  }

  insertAt (value, index) {
    if (index === 0) this.prepend(value)
    else if (index > 0) {
      const address = this.#addNode(value)
      const node = this.memory.list[address]
      let nextNode = this.memory.list[this.memory.start]
      let pointer = nextNode.next
      let [count, prevNode, prevPointer] = [0]
      while (count < index) {
        prevNode = nextNode
        prevPointer = prevNode.next
        nextNode = this.memory.list[pointer]
        if (nextNode === undefined) return
        pointer = nextNode.next
        count++
      }
      // set new node pointer to previous node pointer
      // then set previous node pointer to new node address
      node.next = prevPointer
      prevNode.next = address
    }
  }
}

class Node {
  constructor (value = null, next = null) {
    this.value = value
    this.next = next
  }
}

const LIST = new LinkedList()

// code below is for testing
const n = 5
for (let i = 0; i < n; i++) {
  // if (i % 2)
  LIST.append(i)
  // else LIST.prepend(i)
}

console.log(LIST.toString())
LIST.insertAt('value', 2)
console.log(LIST.toString())
