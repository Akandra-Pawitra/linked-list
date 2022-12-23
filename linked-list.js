class LinkedList {
  constructor () {
    /* to simulate memory allocation behaviour
      instead of memory address, the pointer point to array index */
    this.memory = {
      head: null,
      list: []
    }
  }

  #nextPointer (next, address) {
    /* technically pointer variable is unnecessary, but (pointer === null)
      is easier to read than (this.memory.list[next].next === null) */
    let pointer = this.memory.list[next].next
    if (pointer === null) {
      pointer = address
    } else {
      this.#nextPointer(pointer, address)
    }
  }

  append (value) {
    // create a new node
    const newNode = new Node(value)
    // store the node in memory
    this.memory.list.push(newNode)
    // create an address to attach to next pointer
    const address = this.memory.list.indexOf(newNode)
    // if list is empty, attach address to head
    if (this.memory.list.length === 1) this.memory.head = address
    else {
      // recursively follow next pointer, start from head
      this.#nextPointer(this.memory.head, address)
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
LIST.append(8)
LIST.append(9)
LIST.append(10)
LIST.append(11)
console.log(LIST.memory)
