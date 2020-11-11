import { render, virtual, html, useState, json } from '/@/libs'

// import Test1 from '../test1.js'
import Test1 from '../test2.js'

import rootStore from '../store/root.js'

export default virtual(() => {
    const [show1, setShow1] = useState(true)
    const [show2, setShow2] = useState(true)
    const [show3, setShow3] = useState(true)
    // const store = rootStore({ root: true })
    const [store] = rootStore({ root: true })
    // const store = {}

    return html`
        <h1>This is the APP</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi, at dolorem, et
            excepturi explicabo fugit hic labore nisi rem repellendus, voluptate? Accusantium atque
            consectetur exercitationem explicabo, quos saepe voluptatibus.
        </p>

        <p>${json(store)}</p>

        <div class="row">
            <div class="col">
                ${(show1 && Test1('ONE')) || null}
                <hr />
                <button @click=${() => setShow1(!show1)}>toggle</button>
            </div>
            <div class="col">
                ${(show2 && Test1('TWO')) || null}
                <hr />
                <button @click=${() => setShow2(!show2)}>toggle</button>
            </div>
            <div class="col">
                ${(show3 && Test1('THREE')) || null}
                <hr />
                <button @click=${() => setShow3(!show3)}>toggle</button>
            </div>
        </div>
        ${console.log('@ RENDER app')}
    `
})

console.log('! app')
