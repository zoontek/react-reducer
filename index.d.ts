import { Component, ReactNode } from 'react';

export type Reducer<State, Action> = (
  state: State,
  action: Action,
) => State | void;

export function assertAction(action: { type: never }): void;

interface Props<State, Action> {
  initialState: State;
  reducer: Reducer<State, Action>;
  render: (
    { state, send }: { state: State; send: (action: Action) => void },
  ) => ReactNode;
}

export class ReducerComponent<
  State,
  Action extends {
    type: string;
    [key: string]: any;
  }
> extends Component<Props<State, Action>, { reducerState: State }> {}
