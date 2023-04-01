import { useUrlQueryState } from 'use-url-query-state';
import './App.css'

function App() {
  const [count, setCount] = useUrlQueryState('c', 0)
  const [text, setText] = useUrlQueryState("s", "");
  const [data, setData] = useUrlQueryState("d", { name: "name", value: 0 });
  return (
    <div className="App">
      <h1>useUrlQueryState</h1>
      <p>Update the values below and see how the route query parameter updated</p>
      <div className="card">
        <div>
          <input value={text} onInput={(e) => setText(e.target.value)} placeholder="Enter value"></input>
        </div>
        <div>
          <button onClick={() => setCount(count + 1)}>
            count is {count}
          </button>
        </div>
        <div>
          <button onClick={() => setData({ ...data, value: data.value + 1 })}>
            Update object value {JSON.stringify(data)}
          </button>
        </div>
      </div>
      <a className="read-the-docs" href="https://github.com/hpieterse/use-url-query-state">
        View the documentation
      </a>
    </div>
  )
}

export default App
