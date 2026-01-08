import { Inert, state, mount, effect, compute } from "./inert.js";
function Todo({ content }) {
  return /* @__PURE__ */ Inert("li", null, content);
}
function App() {
  const value = state("");
  const todos = state([]);
  let todoList = /* @__PURE__ */ Inert("ul", null);
  effect(() => {
    todoList.innerHTML = "";
    todos.get().forEach((todo) => {
      todoList.appendChild(/* @__PURE__ */ Inert(Todo, { content: todo }));
    });
  });
  return /* @__PURE__ */ Inert("div", null, /* @__PURE__ */ Inert("input", { value: value.get(), onChange: (e) => value.set(e.target.value) }), /* @__PURE__ */ Inert("button", { onClick: () => todos.set([...todos.get(), value.get()]) }, "Add"), todoList);
}
mount(App, "#app");
