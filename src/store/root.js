import {
    json,
    createStore,
    createStore2,
    createStore3,
    createStore4,
    createStoreProxy,
    reactiveStore
} from '../libs'

export const store = {
    abc: 123,
    add(dx) {
        return store.$set({ abc: store.abc + dx })
    }
}

export default createStore4(store)
