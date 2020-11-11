import { json, createStore, createStore2, createStoreProxy, reactiveStore } from '../libs'
// import { useState, hook, Hook } from 'haunted'

const state = {
    abc: 123
}

// export default createStore(state)
export default createStore2(state)
// export default createStoreProxy(state)
// export default reactiveStore(state)
