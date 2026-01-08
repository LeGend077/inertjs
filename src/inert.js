export function Inert(type, props, ...children) {
    return {
        type,
        props: props || {},
        children: children.flat()
    };
}

export const Fragment = ({ children }) => children;

function render(vnode, container) {
    if (vnode == null || typeof vnode === "boolean") {
        return;
    }

    if (Array.isArray(vnode)) {
        vnode.forEach(child => render(child, container));
        return;
    }

    if (typeof vnode === "string" || typeof vnode === "number") {
        container.appendChild(document.createTextNode(vnode));
        return;
    }

    if (typeof vnode.type === "function") {
        const result = vnode.type(vnode.props);
        render(result, container);
        return;
    }

    const el = document.createElement(vnode.type);

    for (const key in vnode.props) {
        if (key === "key") continue;

        if (key === "style" && typeof vnode.props.style === "object") {
            Object.assign(el.style, vnode.props.style);
        } else if (key.startsWith("on") && key !== "onChange") {
            el.addEventListener(
                key.slice(2).toLowerCase(),
                vnode.props[key]
            );
        } else if (vnode.type === "input") {
            if (key === "value") {
                el.value = vnode.props[key];
            } else if (key === "onChange") {
                el.addEventListener("input", vnode.props[key]);
            }
        } else {
            el.setAttribute(key, vnode.props[key]);
        }
    }

    const children = vnode.children || [];
    children.forEach(child => render(child, el));
    container.appendChild(el);
}

/**
 * @param {*} initial Initial value of the state.
 * Will rerender when a state changes.
 */
export function state(initial) {
    let value = initial;

    return {
        /**
         * @returns Returns the value of the state.
         */
        get: () => value,

        /**
         * @param {*} v Change the state's value.
         * @param {Boolean} notify Whether the state change
         * triggers a rerender.
         */
        set: (v, notify = true) => {
            value = v;
            if (notify) rerender();
        }
    };
}

let rootComponent = null;
let app = null;

/**
 * @param {Function} component Component (function returning JSX)
 * to mount as root.
 * @param {String} querySelector Element selector to mount into.
 */
export function mount(component, querySelector) {
    app = document.querySelector(querySelector);
    rootComponent = component;
    rerender();
}

function rerender() {
    app.innerHTML = "";
    render(rootComponent(), app);
}

