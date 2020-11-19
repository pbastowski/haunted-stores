import {
    json,
    createStore,
    createStore2,
    createStore3,
    createStoreProxy,
    reactiveStore
} from '../libs'
// import { useState, hook, Hook } from 'haunted'

const state = {
    abc: 123,
    add(dx) {
        return state.$set({ abc: state.abc + dx })
    }
}

export default createStore3(state)
// export default createStore(state)
// export default createStore2(state)
// export default createStoreProxy(state)
// export default reactiveStore(state)
