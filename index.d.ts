import * as React from 'react';

export function checkExhaustiveness(action: { type: never }): void;

interface ActionShape {
  type: string;
  [key: string]: any;
}

interface Props<State, Action> {
  initialState: State;
  reducer: (state: State, action: Action) => State;
  render: (
    { state, send }: { state: State; send: (action: Action) => void },
  ) => React.ReactNode;
}

export class Component<
  State,
  Action extends ActionShape
> extends React.Component<Props<State, Action>, { reducerState: State }> {}
