// Register an ING Web component given its CamelCased name
export const registerElement = (name, component, { styles } = {}) => {
    component = addStyles(component, styles)
    !customElements.get(name) && customElements.define(name, component)
}

export const registerIngComponent = (name, { tag = '', styles } = {}) => {
    import('ing-web').then(m => {
        if (!m[name]) throw new Error(`ing-web does not export component "${name}"`)
        let component = m[name]
        if (!tag) tag = toSnakeCase(name).slice(1)

        component = addStyles(component, styles)

        !customElements.get(tag) && customElements.define(tag, component)
    })

    function toSnakeCase(s) {
        return s.replace(/[A-Z]/g, function (a) {
            return '-' + a.toLowerCase()
        })
    }
}

// sub-class and add user supplied styles
function addStyles(component, styles) {
    if (styles) {
        let style
        if (typeof styles === 'string') style = CSS(styles)
        else style = styles

        component = class extends component {
            static get styles() {
                return [super.styles, style]
            }
        }
    }
    return component
}

export function CSS(styles) {
    // Create a CSSResult object, like the lit-element css() string-literal tag function
    let style = new CSSStyleSheet()
    style.replaceSync(styles)
    return { cssText: styles, styleSheet: style }
}
