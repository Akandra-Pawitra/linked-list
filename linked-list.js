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

  #nextPointer (next, address) {
    /* technically pointer variable is unnecessary, but (pointer === null)
      is easier to read than (this.memory.list[next].next === null) */
    const pointer = this.memory.list[next].next
    if (pointer === null) {
      this.memory.list[next].next = address
    } else {
      this.#nextPointer(pointer, address)
    }
  }

  append (value) {
    const address = this.#addNode(value)
    // if list is empty, attach address to start
    if (this.memory.list.length === 1) this.memory.start = address
    else {
      // recursively follow next to set the pointer
      this.#nextPointer(this.memory.start, address)
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

for (let i = 0; i < 10; i++) {
  if (i % 2) LIST.append(i)
  else LIST.prepend(i)
}

console.log(LIST.head())
