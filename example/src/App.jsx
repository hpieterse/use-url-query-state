import { useUrlQueryState } from 'use-url-query-state';
import './App.css'

function App() {
  const [count, setCount] = useUrlQueryState('c', 0)
  const [text, setText] = useUrlQueryState("s", "");
  const [data, setData] = useUrlQueryState("d", { name: "name", value: 0 });

  const clearAllHandler = () => {
    setCount(0);
    setText("");
    setData({ name: "name", value: 0 });
  }

  const updateAllHandler = () => {
    setCount(count + 1);
    setText(`Value ${(Math.random() + 1).toString(36).substring(7)}`);
    setData({ ...data, value: data.value + 1 })

  }
  return (
    <div className="App">
      <h1>useUrlQueryState</h1>
      <p>Update the values below and see how the route query parameter updated</p>
      <div className="card">
        <input value={text} onInput={(e) => setText(e.target.value)} placeholder="Enter value"></input>
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setData({ ...data, value: data.value + 1 })}>
          Update object value {JSON.stringify(data)}
        </button>
        <button onClick={clearAllHandler}>
          Clear all
        </button>
        <button onClick={updateAllHandler}>
          Update all values at once
        </button>
      </div>
      <a className="read-the-docs" href="https://github.com/hpieterse/use-url-query-state">
        View the documentation
      </a>
    </div>
  )
}

export default App
