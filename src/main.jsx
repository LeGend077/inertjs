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
    const todos = state([]);
    const count = state(0);
    let todoList = <ul></ul>;

    effect(() => {
        todoList.innerHTML = "";
        todos.get().forEach(todo => {
	    todoList.appendChild(<Todo content={todo}/>);
        });
    }, [todos]);
 
    return (
	<div><button onClick={() => count.set(count.get() + 1)}>Count: {count}</button> <br/>
	<input value={value.get()} onChange={(e) => value.set(e.target.value)}  />
	<button onClick={() => { todos.set([...todos.get(), value.get()]); }}>Add</button>
	    {todoList}
	</div>
   );
}

mount(App, "#app");

