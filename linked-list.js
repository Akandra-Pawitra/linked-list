class LinkedList {
  constructor () {
    /* to simulate memory allocation behaviour
      instead of memory address, the pointer point to array index */
    this.memory = {
      head: null,
      list: []
    }
  }

  #addNode (value) {
    // create a new node
    const newNode = new Node(value)
    // store the node in memory
    this.memory.list.push(newNode)
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
    // if list is empty, attach address to head
    if (this.memory.list.length === 1) this.memory.head = address
    else {
      // recursively follow next pointer, start from head
      this.#nextPointer(this.memory.head, address)
    }
  }

  prepend (value) {
    const address = this.#addNode(value)
    if (this.memory.list.length === 1) this.memory.head = address
    else {
      // copy head pointer
      const pointer = this.memory.head
      // point node next to head address
      this.memory.list[address].next = pointer
      // change head address to node address
      this.memory.head = address
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

LIST.append(0)
LIST.prepend(1)
LIST.append(2)
LIST.prepend(3)
LIST.append(4)
LIST.prepend(5)
LIST.append(6)
LIST.prepend(7)

console.log(LIST.memory)
