import { html, virtual, json } from './libs'
import rootStore from './store/root.js'

export default virtual(title => {
    const [store] = rootStore()

    return html`
        <h3>This is ${title}</h3>
        <pre>${json(store)}</pre>
        <button @click=${() => store.add(1)}>+1</button>
        ${console.log('@ RENDER test 2')}
    `
})

console.log('! test2')
