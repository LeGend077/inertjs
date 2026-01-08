let currentEffect = null;

export function effect(fn) {
    const run = () => {
        currentEffect = run;
        fn();
        currentEffect = null;
    };
    run();
}

export function state(initial) {
    let value = typeof initial === "function" ? initial() : initial;
    const subscribers = new Set();

    return {
        get() {
            if (currentEffect) subscribers.add(currentEffect);
            return value;
        },
        set(v) {
            value = v;
            subscribers.forEach(fn => fn());
        }
    };
}

export function compute(fn) {
    const result = state(fn());
    effect(() => result.set(fn()));
    return result;
}

export function Inert(type, props, ...children) {
    if (typeof type === "function") {
        return type(props || {});
    }

    const el = document.createElement(type);
    props = props || {};

    for (const key in props) {
        if (key === "style" && typeof props.style === "object") {
            Object.assign(el.style, props.style);
        } else if (key.startsWith("on")) {
            el.addEventListener(key.slice(2).toLowerCase(), props[key]);
        } else if (type === "input" && key === "value") {
            effect(() => {
                el.value = props.value?.get ? props.value.get() : props.value;
            });
        } else {
            el.setAttribute(key, props[key]);
        }
    }

    children.flat().forEach(child => {
        if (child == null || child === false) return;

        if (typeof child === "function") {
            const text = document.createTextNode("");
            el.appendChild(text);
            effect(() => {
                text.nodeValue = child();
            });
        } else if (child?.get) {
            const text = document.createTextNode("");
            el.appendChild(text);
            effect(() => {
                text.nodeValue = child.get();
            });
        } else if (child instanceof Node) {
            el.appendChild(child);
        } else {
            el.appendChild(document.createTextNode(child));
        }
    });

    return el;
}

export const Fragment = ({ children }) => children;

export function mount(App, selector) {
    const root = document.querySelector(selector);
    root.appendChild(App());
}
