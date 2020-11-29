import { render, virtual, html } from '/@/libs'
import App from './app/app'

import rootStore from './store/root.js'

const Counter = virtual(() => {
    const store = rootStore()

    return html``
})

export default virtual(() => {
    return html` <div class="container-fluid">${App()}</div> `
})

console.log('! layout')
