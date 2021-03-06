import { html, virtual, json } from './libs'
import rootStore from './store/root.js'

export default virtual(title => {
    const [store, setStore] = rootStore()

    return html`
        <h3>This is REACTER</h3>
        <pre>${json(store)}</pre>
        <button @click=${() => setStore({ abc: store.abc + 1 })}>+1</button>
        ${console.log('@ RENDER reacter')}
    `
})

console.log('! reacter')
