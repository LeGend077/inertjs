import { Inert, state, mount } from "./inert.js";

const newTodo = state("");
const todos = state([]);

function App() {
    return (
        <div style={{ width: "400px", backgroundColor: "#2a2a2a", padding: "20px", borderRadius: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}>
            <h1 style={{ color: "#ffffff", marginBottom: "15px", textAlign: "center" }}>
                InertJS Todo
            </h1>

            <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
                <input
                    type="text"
                    placeholder="Add a todo..."
                    value={newTodo.get()}
                    onChange={(e) => newTodo.set(e.target.value, false)}
                    style={{ flex: "1", padding: "8px", borderRadius: "6px", border: "none", outline: "none" }}
                />

                <button
                    onClick={() => {
                        if (!newTodo.get().trim()) return;

                        todos.set([
                            ...todos.get(),
                            newTodo.get()
                        ]);
                        newTodo.set("");
                    }}
                    style={{ padding: "8px 12px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: "#4caf50", color: "#ffffff", fontWeight: "600" }}
                >
                    Add
                </button>
            </div>

            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                {todos.get().map((todo, index) => {
                    return (
                        <li key={index} style={{ backgroundColor: "#3a3a3a", color: "#ffffff", padding: "8px", borderRadius: "6px", marginBottom: "6px" }}>
                            {todo}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

mount(App, "#app");
