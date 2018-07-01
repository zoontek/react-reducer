// @flow

import * as React from 'react';
import * as Reducer from 'react-reducer';

type State = {|
  +count: number,
  +step: number,
|};

type Action =
  | {| type: 'INCREMENT' |}
  | {| type: 'DECREMENT' |}
  | {| type: 'RESET' |};

class Counter extends React.Component<{}> {
  initialState: State = {
    count: 0,
    step: 1,
  };

  reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + state.step };
      case 'DECREMENT':
        return { ...state, count: state.count - state.step };
      case 'RESET':
        return this.initialState;

      default:
        Reducer.checkExhaustiveness(action);
        return state;
    }
  };

  render() {
    return (
      <Reducer.Component
        initialState={this.initialState}
        reducer={this.reducer}
        render={({ state, send }) => (
          <div>
            <h2>Count: {state.count}</h2>

            <div>
              <button onClick={() => send({ type: 'DECREMENT' })}>-</button>
              <button onClick={() => send({ type: 'INCREMENT' })}>+</button>
              <button onClick={() => send({ type: 'RESET' })}>reset</button>
            </div>
          </div>
        )}
      />
    );
  }
}

export default Counter;
