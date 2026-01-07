import { Inert, state, mount } from './inert.js';
const count = state(0);
function App() {
    return /*#__PURE__*/ Inert("div", null, /*#__PURE__*/ Inert("h1", null, "JSX using InertJS"), /*#__PURE__*/ Inert("p", null, "Count: ", count.get()), /*#__PURE__*/ Inert("button", {
        onClick: ()=>count.set(count.get() + 1)
    }, "Count: ", count.get()));
}
mount(App);
