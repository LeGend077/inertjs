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
    const doubledCount = compute(() => count.get() * 2);
    let todoList = <ul></ul>;

    effect(() => {
        todoList.innerHTML = "";
        todos.get().forEach(todo => {
	    todoList.appendChild(<Todo content={todo}/>);
        });
    }, [todos]);

    const handleClick = () => {
	todos.set([...todos.get(), value.get()]);
	value.set("");
    }
 
    return (
	<div><button onClick={() => count.set(count.get() + 1)}>Count: {count} | Doubled: {doubledCount}</button> <br/>
	<input value={value} onChange={(e) => value.set(e.target.value)}  />
	<button onClick={handleClick}>Add</button>
	    {todoList}
	</div>
   );
}

mount(App, "#app");

