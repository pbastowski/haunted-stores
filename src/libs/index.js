// Put all the imports into one lib file to make it
// easier to access in other source files.

// lit-html has lots of useful methods, of which we only want a subset.
// The most useful to us are listed below.
// export { render, html, EventPart, directive, nothing } from 'lit-html'
export { EventPart, directive, nothing } from 'lit-html'
export {
    render,
    html,
    component,
    virtual,
    useState,
    useMemo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useReducer,
    useRef,
    useContext
} from 'haunted'

// export { render, EventPart, directive, nothing } from 'https://unpkg.com/lit-html'
export { repeat } from 'lit-html/directives/repeat'
export { styleMap } from 'lit-html/directives/style-map'
export { classMap } from 'lit-html/directives/class-map'
export { unsafeHTML } from 'lit-html/directives/unsafe-html'

// easyrouter is a small client side hash #router
// import r from 'https://unpkg.com/easyrouter?module'
// export const router = r

// A small utility function that pretty-prints any objects given to it.
export const json = arg => JSON.stringify(arg, null, 4)
export const log = console.log.bind(console)
// export { createRoutes } from './cr.js'

// export { LionPagination } from '@lion/pagination'

// ing-wc-helpers
export * from './ing-wc-helpers.js'

// Hooks
export * from './hooks.js'

// Axios
// export * from './axios-helpers.js'

// Hyperactiv
import * as hyperactiv from 'hyperactiv/src'
export const { observe, computed, dispose } = hyperactiv.default
