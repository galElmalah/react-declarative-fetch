# REACT-DECLARATIVE-FETCH

## What

A Declarative Way To Make HTTP Requests in React.

## Why

The process of making external API requests in a react component often repeats itself and I found myself handling the same state changes in different components to many times.  
For example, showing a `<Loader />`
component while fetching and taking into account the different responses from the API i.e Error or Success.

## How

In most cases, when making an async external call from a component you will want to account for three different phases in the request lifecycle:

1. **Fetching**
2. **Success**
3. **Error**

_REACT-DECLARATIVE-FETCH_ aims to give a dead simple and declarative API for handling the different state changes in an API call.
<br>

**example**

```npm
npm i react-declarative-fetch
```

```javascript
import { Fetch } from 'react-declarative-fetch';
const ImageGallery = () => {
  return (
    <Fetch url="https://www.someImageApiUrl">
      <Fetch.Error>Error while loading the images</Fetch.Error>
      <Fetch.Fetching>show loader</Fetch.Fetching>
      <Fetch.Success>
        {({ data }) => data.map(img => <Image {...img} />)}
      </Fetch.Success>
    </Fetch>
  );
};
```

[more examples](https://codesandbox.io/embed/j7q27xwlj9?fontsize=14)

Each of the compound components will only get rendered when the appropriate state is set, i.e when fetching `<Fetch.Fetching>` will get rendered and at the end of the request either `<Fetch.Success>` or `<Fetch.Error>` will get rendered.

## API

Both `<Fetch.Success>` and `<Fetch.Error>` can be used as a render props and they will be invoked with the current state.  
The `<Fetch>` component can also be used alone as a render props component and will be invoked with the current state.

### Props

| Name      | Type    | Required                      | Description                                                                                        |
| --------- | ------- | ----------------------------- | -------------------------------------------------------------------------------------------------- |
| url       | string  | yes                           | the url to make the request from                                                                   |
| options   | object  | no, the default method is GET | options to pass to the request agent (i.e axios) like method, headers, etc...                      |
| withCache | boolean | no                            | if present the results would be cached and would be retrieved from the cache on following requests |
| delay     | number  | no                            | delay the request X amount of milliseconds                                                         |

### State - render props components will be invoked with the state object

| Name       | Type     | Description                                 |
| ---------- | -------- | ------------------------------------------- |
| fetching   | boolean  | Is in process of fetching the data          |
| success    | boolean  | Did the request ended successfuly           |
| data       | object   | The current request respones                |
| error      | Error    | The current request Error                   |
| resetCache | function | function that resets the cache when invoked |

## TODO

[ ] expose reset cache api outside of the component.  
[ ] add examples and use cases.  
[ ] move to the native fetch instead of axios.
