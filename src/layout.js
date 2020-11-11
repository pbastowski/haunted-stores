import { render, virtual, html } from '/@/libs'
import App from './app/app'

export default virtual(() => {
    return html` <div class="container-fluid">${App()}</div> `
})

console.log('! layout')
