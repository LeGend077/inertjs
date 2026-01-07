import { Inert, state, mount } from './inert.js';

const count = state(0);

function App() {
  return (
    <div>
      <h1>JSX using InertJS</h1>

      <p>Count: {count.get()}</p>

      <button onClick={() => count.set(count.get() + 1)}>Count: {count.get()}</button>
    </div>
  );
}

mount(App);
