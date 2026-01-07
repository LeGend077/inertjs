const app = document.getElementById("app");

export function Inert(type, props, ...children) {
  return { type, props: props || {}, children };
}

function render(vnode, container) {
  if (typeof vnode === "string" || typeof vnode === "number") {
    container.appendChild(document.createTextNode(vnode));
    return;
  }

  if (typeof vnode.type === "function") {
    render(vnode.type(vnode.props), container);
    return;
  }

  const el = document.createElement(vnode.type);

  for (const key in vnode.props) {
    if (key.startsWith("on")) {
      el.addEventListener(
        key.slice(2).toLowerCase(),
        vnode.props[key]
      );
    } else {
      el.setAttribute(key, vnode.props[key]);
    }
  }

  vnode.children.flat().forEach(child => render(child, el));
  container.appendChild(el);
}

export function state(initial) {
  let value = initial;
  return {
    get: () => value,
    set: v => {
      value = v;
      rerender();
    }
  };
}

let rootComponent = null;
export function mount(component) {
  rootComponent = component;
  rerender();
}

function rerender() {
  app.innerHTML = "";
  render(rootComponent(), app);
}

