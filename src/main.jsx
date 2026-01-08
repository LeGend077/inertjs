import { Inert, state, mount, effect, compute } from "./inert.js";

function Todo({ content }) {
    return (
	<li>
	    {content}
	</li>
    );
}

function App() {
    const value = state("");
    const todos = state([])

    let todoList = <ul></ul>;

    // this runs when a state changes
    effect(() => {
        todoList.innerHTML = "";
        todos.get().forEach(todo => {
	    todoList.appendChild(<Todo content={todo}/>);
        });
    });


    return (
	<div>
	<input value={value.get()} onChange={(e) => value.set(e.target.value)}  />
	<button onClick={() => todos.set([...todos.get(), value.get()])}>Add</button>
	    {todoList}
	</div>
   );
}

mount(App, "#app");

