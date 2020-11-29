import { html, virtual, json, useEffect } from './libs'
import rootStore from './store/root.js'

export default virtual(title => {
    const store = rootStore()

    useEffect(() => store.$set({ text: 'This is TWO' }), [])

    return html`
        <h3>This is ${title}</h3>
        <pre>${json(store)}</pre>
        <button @click=${() => store.add(1)}>+1</button>
        ${console.log('@ TEST 2')}
    `
})

console.log('! test2')
