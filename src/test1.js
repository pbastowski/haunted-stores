import { html, virtual, json } from './libs'
import rootStore from './store/root.js'

export default virtual(title => {
    const store = rootStore()

    return html`
        <h3>This is ${title}</h3>
        <pre>${json(store)}</pre>
        <button @click=${() => store.$set({ abc: store.abc + 1 })}>+1</button>
        ${console.log('@ TEST 1')}
    `
})

console.log('! test1')
