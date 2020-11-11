import { useState, useEffect, hook, Hook } from 'haunted'
import * as hyperactiv from 'hyperactiv/src'
const { observe, computed } = hyperactiv.default

/*
    hook: merge new data into state instead of overwriting the state
    This is useful for objects that have a group of props in them.

    For example:
      const [filters, setFilters] = useObj({ sortBy: 'a', sortOrder: 'asc' })
      setFilters({sortBy: 'b'})  --> filters { sortBy: 'b', sortDesc: 'asc' }

    With useState the same result can be achieved like this
      const [filters, setFilters] = useState({ sortBy: 'a', sortOrder: 'asc' })
      setFilters({ ...filters, sortBy: 'b' })

*/
export const useObj = obj => {
    const [v, s] = useState(obj)
    return [v, nv => s({ ...v, ...nv })]
}

/*
    createStore(store: Object)

    Create a data store, which can be accessed in any component in the app.
    Changes to this store, no matter in which component they are made,
    will re-render the app (for details see "How Does It Work", below).

    Returns:
    useStore hook as the default export.

    Usage:

    // /src/store/user.js
    import { createStore } from '/src/libs'
    let state = {
        name: '',
        surname: ''
    }
    export default createStore(state)
    export const fullName = () => store.name + ' ' + store.surname

    // /src/app.js
    import UserName from '/src/user-name'
    import userStore from '/src/store/user'
    export default () => {
        userStore()
        return html`
            <h1>The App</h1>
            ${UserName()}
        `
    }

    // /src/user-name.js
    import userStore, { fullName } from '/src/store/user'
    export default () => {
        const [store, setStore] = userStore()
        // do stuff with the store
        // ...
        return html`<h1>User Name: ${ fullName() }</h1>`
    }


    How does it work?

    It works because a re-render in a parent component also re-renders all
    of it's child components.

    The createStore function returns a useStore hook, which, when it's called,
    returns a the store value and a setter function that triggers an update
    in the first component that it is used in.
    This is why it must be called at a top level component in your app, in the
    example above that is app.js. When app.js re-renders it also triggers
    a re-render in user-name.js. When user-name re-renders it calls useStore,
    which retrieves the current store value and everything works as expected.

*/
export function createStore(state) {
    // console.log('@ CREATE STORE', getCallerFunction())
    return () => {
        if (!state.$set) {
            let [v, sv] = useState(state)
            state.$set = nv => sv(Object.assign(state, nv))
            // console.log('@ USE STORE', getCallerFunction())
        }
        return [state, state.$set]
    }
}

function getCallerFunction(line = 3) {
    if (line === -1) return new Error().stack
    else return new Error().stack.split('    at ')[3]
}

/*
    createStore2

    Unlike createStore, createStore2 triggers updates in only the components
    that actually call useStore and does not require a useStore in a parent
    component.

    If you need to useStore in a parent component, then you should call it
    lie this `useStore({ root: true })` to ensure that only one re-render per
    store update is executed. Otherwise, multiple un-necessary re-renders will
    occur.
*/
export function createStore2(store) {
    const updaters = new Set()

    let rootUpdater = null

    const setter = nv => {
        // store = { ...store, ...nv }
        Object.assign(store, nv)

        if (rootUpdater) {
            console.log('ROOT update')
            // A root component uses a store above other components in the component tree.
            // In this case we only update the root component, because doing so will
            // trigger updates in all child components anyway.
            rootUpdater()
        } else {
            console.log('ALL update')
            // notify all subscribers that the store has been updated
            for (let update of updaters) update()
        }
    }

    store.$set = setter

    return hook(
        class extends Hook {
            constructor(id, state, { root } = {}) {
                super(id, state)
                if (root) rootUpdater = this.state.update
                else updaters.add(this.state.update)
                console.log('10 HOOK: updaters:', store.$name || '', updaters.size)
            }

            update() {
                // console.log('20 HOOK:', store.$name, store, updaters.size)
                return [store, setter]
            }

            teardown() {
                if (this.state.update === rootUpdater) rootUpdater = null
                else updaters.delete(this.state.update)
                console.log('99 HOOK: updaters:', store.$name || '', updaters.size)
            }
        }
    )
}

/*

    createStoreProxy works the same as createStore2, but returns a shallow proxy to the store.

    Shallow means that only its first level props are watched for changes, that given this

        state = { a: 1, b: { c: 2 } }

    The following assignment statement will trigger a reactive update.

        state.a = 2

    However, the statement below will not, because it is assigning a value nested two levels deep.

        state.b.c = 3

*/
export function createStoreProxy(state) {
    const updaters = new Set()
    let rootUpdater = null

    const proxy = new Proxy(state, {
        set(o, p, v) {
            o[p] = v
            if (rootUpdater) {
                console.log('ROOT update')
                // A root component uses a store above other components in the component tree.
                // In this case we only update the root component, because doing so will
                // trigger updates in all child components anyway.
                rootUpdater()
            } else {
                console.log('ALL update')
                // notify all subscribers that the store has been updated
                for (let update of updaters) update()
            }
            return true
        }
    })

    return hook(
        class extends Hook {
            constructor(id, state, { root } = {}) {
                super(id, state)
                if (root) rootUpdater = this.state.update
                else updaters.add(this.state.update)
                console.log('10 HOOK: updaters:', updaters.size)
            }

            update(store) {
                // console.log('20 HOOK:', proxy, updaters.size)
                return proxy
            }

            teardown() {
                if (this.state.update === rootUpdater) rootUpdater = null
                else updaters.delete(this.state.update)
                console.log('99 HOOK: updaters:', updaters.size)
            }
        }
    )
}

export function reactiveStore(state) {
    const updaters = new Set()

    const proxy = observe(state, { batch: true, bind: true })

    computed(() => {
        state = state
        // notify all subscribers that the store has been updated
        for (let update of updaters) update()
        return true
    })

    return hook(
        class extends Hook {
            constructor(id, state) {
                super(id, state)
                updaters.add(this.state.update)
                console.log('10 HOOK: updaters:', updaters.size)
            }

            update() {
                console.log('20 HOOK:', proxy, updaters.size)
                return proxy
            }

            teardown() {
                updaters.delete(this.state.update)
                console.log('99 HOOK: updaters:', updaters.size)
            }
        }
    )
}

/*
    hook: Register an element click handler
    Use it, for example, to be notified when the user has clicked outside of your component,
    in which case the document object should receive the bubbled click event.
    Automatically removes the clickHandler when the component goes out of scope.

    Usage:
       const hideMenu = () => { ... }
       useClick(document.body, hideMenu)

*/
export const useClick = (el, onClick) => {
    useEffect(() => {
        el.addEventListener('click', onClick)
        return () => {
            el.removeEventListener('click', onClick)
        }
    }, [])
}
