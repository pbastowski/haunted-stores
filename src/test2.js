import { html, virtual, json, useEffect } from './libs'
import rootStore from './store/root.js'

export default virtual(title => {
    useEffect(() => rootStore.$set({ text: 'Using TEST2' }), [])
    return html`
        <h3>This is ${title}</h3>
        <pre>${json(rootStore)}</pre>
        <button @click=${() => rootStore.add(1)}>+1</button>
        ${console.log('@ RENDER test 2')}
    `
})

console.log('! test2')
