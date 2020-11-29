import { render, virtual, html, useState, json, useObj, useEffect } from '/@/libs'

import Test1 from '../test1.js'
import Test2 from '../test2.js'

import rootStore from '../store/root.js'

export default virtual(() => {
    const [show, setShow] = useObj({ 1: true, 2: true, 3: true })
    const store = rootStore({ root: true })

    useEffect(() => {
        return () => console.log('<<< DESTROY app')
    }, [])

    return html`
        <h1>This is the APP</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi, at dolorem, et
            excepturi explicabo fugit hic labore nisi rem repellendus, voluptate? Accusantium atque
            consectetur exercitationem explicabo, quos saepe voluptatibus.
        </p>

        <div class="row">
            ${Object.keys(show).map(
                i => html`
                    <div class="col">
                        ${(show[i] && Test1('ONE-' + i)) || null}
                        <hr />
                        <button @click=${() => setShow({ [i]: !show[i] })}>toggle</button>
                    </div>
                `
            )}
            <div class="col">${Test2('TWO')}</div>
        </div>
        ${console.log('@ APP')}
    `
})

console.log('! app')
