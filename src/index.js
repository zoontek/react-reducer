// @flow

import { Component } from 'react';
import type { Node } from 'react';

export type Reducer<State, Action> = (
  state: State,
  action: Action,
) => State | void;

export function assertAction(action: { type: empty }): void {
  throw new Error(`Unexpected action of type ${action.type}`);
}

type Props<State, Action> = {|
  initialState: State,
  reducer: Reducer<State, Action>,
  render: ({|
    state: State,
    send: (action: Action) => void,
  |}) => Node,
|};

export class ReducerComponent<
  State,
  Action: { type: $Subtype<string> },
> extends Component<Props<State, Action>, {| reducerState: State |}> {
  constructor(props: Props<State, Action>) {
    super(props);

    this.state = {
      reducerState: props.initialState,
    };
  }

  render() {
    return this.props.render({
      state: this.state.reducerState,
      send: action => {
        this.setState(state => {
          const reducerState = this.props.reducer(state.reducerState, action);
          return typeof reducerState === 'undefined' ? state : { reducerState };
        });
      },
    });
  }
}
