// @flow

import React from 'react';

export const checkExhaustiveness = (action: { type: empty }) => {
  throw new Error(`Unhandled action of type ${action.type}`);
};

export type RenderParam<State, Action> = {|
  state: State,
  send: Action => void,
|};

type Props<State, Action> = {|
  initialState: State,
  reducer: (State, Action) => State,
  render: (RenderParam<State, Action>) => React$Node,
|};

export class Component<
  State: {},
  Action: { type: $Subtype<string> },
> extends React.Component<Props<State, Action>, State> {
  state: State;

  constructor(props: Props<State, Action>) {
    super(props);
    this.state = props.initialState;
  }

  render() {
    return this.props.render({
      state: this.state,
      send: action => this.setState(state => this.props.reducer(state, action)),
    });
  }
}
