import { json, createStore, createStore2, createStoreProxy, reactiveStore } from '../libs'
// import { useState, hook, Hook } from 'haunted'

const store = {
    abc: 123,
    text: 'lalala',

    add(dx = 1) {
        store.$set({ abc: store.abc + dx })
    }
}

const useStore = createStore(store)
// export default createStore2(state)
// export default createStoreProxy(state)
// export default reactiveStore(state)

export { store as default, useStore }
