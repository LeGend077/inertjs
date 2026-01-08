import { Inert, state, mount, effect, compute } from "./inert.js";
function Todo({ content }) {
  return /* @__PURE__ */ Inert("li", null, content);
}
function App() {
  const value = state("");
  const todos = state([]);
  const count = state(0);
  let todoList = /* @__PURE__ */ Inert("ul", null);
  effect(() => {
    todoList.innerHTML = "";
    todos.get().forEach((todo) => {
      todoList.appendChild(/* @__PURE__ */ Inert(Todo, { content: todo }));
    });
  }, [todos]);
  return /* @__PURE__ */ Inert("div", null, /* @__PURE__ */ Inert("button", { onClick: () => count.set(count.get() + 1) }, "Count: ", count), " ", /* @__PURE__ */ Inert("br", null), /* @__PURE__ */ Inert("input", { value: value.get(), onChange: (e) => value.set(e.target.value) }), /* @__PURE__ */ Inert("button", { onClick: () => {
    todos.set([...todos.get(), value.get()]);
    effect(() => value.set(""));
  } }, "Add"), todoList);
}
mount(App, "#app");
