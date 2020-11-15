import { html, virtual, json, useEffect } from './libs'
import { store } from './store/root.js'

export default virtual(title => {
    useEffect(() => store.$set({ text: 'Using TEST2' }), [])
    return html`
        <h3>This is ${title}</h3>
        <pre>${json(store)}</pre>
        <button @click=${() => store.add(1)}>+1</button>
        ${console.log('@ RENDER test 2')}
    `
})

console.log('! test2')
