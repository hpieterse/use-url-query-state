# useUrlQueryState
![build](https://github.com/hpieterse/use-url-query-state/actions/workflows/build.yml/badge.svg) 
<a href="https://www.npmjs.com/package/use-url-query-state"><img alt="npm" src="https://img.shields.io/npm/v/use-url-query-state.svg"></a>

`useUrlQueryState` is a React hook that makes it easy to manage the state in the URL query string.

Take a look at this [Demo](https://www.handsaw.co.za/use-url-query-state/) to see it in action.

`useUrlQueryState` is dependent on [React Router](https://reactrouter.com/).

## Why
In some cases, it's beneficial to use the route to store your application state. It allows the user to refresh or bookmark a page and keep its state. For example, if a user wants to share or bookmark a specific search result.

## Getting Started
To use `useUrlQueryState`, you can install it via npm:

```bash
npm install --save use-url-query-state
```

Import the hook into your React component:

```javascript
import { useUrlQueryState } from 'use-url-query-state';
```

Instantiate a new state variable:
```javascript
const [state, setState] = useUrlQueryState(paramName, initialState);
```

Here is an example of the hook in a component:

```javascript
import { useUrlQueryState } from 'use-url-query-state';

function Component = () => {
   const [count, setCount] = useUrlQueryState("c", 0);

   return (
     <button onClick={() => setCount(count + 1)}>Count: {count}</button>
   );
}
```

In the example above, we initialize the `count` state to `0` and use `useUrlQueryState` to read and write the value to the `c` query parameter in the URL.

## API

The `useUrlQueryState` hook provides the following API:

### `useUrlQueryState(paramName, defaultValue)`

This hook returns an array containing the current value of the state and a function to update the state value. The `paramName` parameter is the name of the query parameter in the URL, and the `defaultValue` parameter is the initial value of the state.

## Contributions

If you have any comments or suggestions, feel free to open an issue or pull request on the repository. We welcome any contributions or feedback to help improve the functionality and usability.

## License
`useUrlQueryState` is released under the MIT License.