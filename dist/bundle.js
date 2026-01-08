// src/inert.js
function Inert(type, props, ...children) {
  return {
    type,
    props: props || {},
    children: children.flat()
  };
}
function render(vnode, container) {
  if (vnode == null || typeof vnode === "boolean") {
    return;
  }
  if (Array.isArray(vnode)) {
    vnode.forEach((child) => render(child, container));
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
  children.forEach((child) => render(child, el));
  container.appendChild(el);
}
function state(initial) {
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
var rootComponent = null;
var app = null;
function mount(component, querySelector) {
  app = document.querySelector(querySelector);
  rootComponent = component;
  rerender();
}
function rerender() {
  app.innerHTML = "";
  render(rootComponent(), app);
}

// src/main.jsx
var newTodo = state("");
var todos = state([]);
function App() {
  return /* @__PURE__ */ Inert("div", { style: { width: "400px", backgroundColor: "#2a2a2a", padding: "20px", borderRadius: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" } }, /* @__PURE__ */ Inert("h1", { style: { color: "#ffffff", marginBottom: "15px", textAlign: "center" } }, "InertJS Todo"), /* @__PURE__ */ Inert("div", { style: { display: "flex", gap: "8px", marginBottom: "15px" } }, /* @__PURE__ */ Inert(
    "input",
    {
      type: "text",
      placeholder: "Add a todo...",
      value: newTodo.get(),
      onChange: (e) => newTodo.set(e.target.value, false),
      style: { flex: "1", padding: "8px", borderRadius: "6px", border: "none", outline: "none" }
    }
  ), /* @__PURE__ */ Inert(
    "button",
    {
      onClick: () => {
        if (!newTodo.get().trim()) return;
        todos.set([
          ...todos.get(),
          newTodo.get()
        ]);
        newTodo.set("");
      },
      style: { padding: "8px 12px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: "#4caf50", color: "#ffffff", fontWeight: "600" }
    },
    "Add"
  )), /* @__PURE__ */ Inert("ul", { style: { listStyle: "none", padding: "0", margin: "0" } }, todos.get().map((todo, index) => {
    return /* @__PURE__ */ Inert("li", { key: index, style: { backgroundColor: "#3a3a3a", color: "#ffffff", padding: "8px", borderRadius: "6px", marginBottom: "6px" } }, todo);
  })));
}
mount(App, "#app");
