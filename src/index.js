import 'bootstrap/dist/css/bootstrap.min.css'

import { render, virtual, html } from '/@/libs'
import Layout from './layout.js'
import rootStore from './store/root.js'

const Counter = virtual(() => {
    const store = rootStore()
    return html`
        <small style="position: absolute; top:15px; right: 20px;"> counter: ${store.abc} </small>
        ${console.log('@ COUNTER')}
    `
})

const root = virtual(() => {
    return html`
        <div>
            ${Counter()}
            <!---->
            ${Layout()}
        </div>
    `
})

render(root(), window.app)
// render(Layout(), window.app)

console.log('! index')
