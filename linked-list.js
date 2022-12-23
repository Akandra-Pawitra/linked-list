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
}

class Node {
  constructor (value = null, next = null) {
    this.value = value
    this.next = next
  }
}

const LIST = new LinkedList()

const n = 20
for (let i = 0; i < n; i++) {
  if (i % 2) LIST.append(i)
  else LIST.prepend(i)
}

console.log(LIST.memory)
