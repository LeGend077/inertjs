import { Inert, state, mount, effect, compute } from "./inert.js";
function Todo({ content }) {
  return /* @__PURE__ */ Inert("li", null, content);
}
function App() {
  const value = state("");
  const todos = state([]);
  const count = state(0);
  const doubledCount = compute(() => count.get() * 2);
  let todoList = /* @__PURE__ */ Inert("ul", null);
  effect(() => {
    todoList.innerHTML = "";
    todos.get().forEach((todo) => {
      todoList.appendChild(/* @__PURE__ */ Inert(Todo, { content: todo }));
    });
  }, [todos]);
  const handleClick = () => {
    todos.set([...todos.get(), value.get()]);
    value.set("");
  };
  return /* @__PURE__ */ Inert("div", null, /* @__PURE__ */ Inert("button", { onClick: () => count.set(count.get() + 1) }, "Count: ", count, " | Doubled: ", doubledCount), " ", /* @__PURE__ */ Inert("br", null), /* @__PURE__ */ Inert("input", { value, onChange: (e) => value.set(e.target.value) }), /* @__PURE__ */ Inert("button", { onClick: handleClick }, "Add"), todoList);
}
mount(App, "#app");
