// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import * as Reducer from 'react-reducer';

type State = {|
  count: number,
|};

type Action =
  | {| type: 'INCREMENT', step: number |}
  | {| type: 'DECREMENT', step: number |}
  | {| type: 'RESET' |};

class Counter extends React.Component<{}> {
  initialState = {
    count: 0,
  };

  reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + action.step };
      case 'DECREMENT':
        return { ...state, count: state.count - action.step };
      case 'RESET':
        return { ...state, count: this.initialState.count };

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
        render={({ state, send }: Reducer.RenderArgs<State, Action>) => (
          <div>
            <h2>Count: {state.count}</h2>

            <div>
              <button onClick={() => send({ type: 'DECREMENT', step: 1 })}>
                -
              </button>

              <button onClick={() => send({ type: 'INCREMENT', step: 1 })}>
                +
              </button>

              <button onClick={() => send({ type: 'RESET' })}>reset</button>
            </div>
          </div>
        )}
      />
    );
  }
}

const root = document.getElementById('root');
root && ReactDOM.render(<Counter />, root);
