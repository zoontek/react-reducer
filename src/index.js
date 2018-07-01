// @flow

import * as React from 'react';

export function checkExhaustiveness(action: { type: empty }): void {
  throw new Error(`Unhandled action of type ${action.type}`);
}

type ActionShape = {
  type: $Subtype<string>,
};

type Props<State, Action> = {|
  initialState: State,
  reducer: (State, Action) => State,
  render: ({|
    state: State,
    send: Action => void,
  |}) => React.Node,
|};

export class Component<State, Action: ActionShape> extends React.Component<
  Props<State, Action>,
  {| reducerState: State |},
> {
  constructor(props: Props<State, Action>) {
    super(props);

    this.state = {
      reducerState: props.initialState,
    };
  }

  render() {
    return this.props.render({
      state: this.state.reducerState,
      send: action =>
        this.setState(state => ({
          reducerState: this.props.reducer(state.reducerState, action),
        })),
    });
  }
}
