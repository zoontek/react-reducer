import { Component, ReactNode } from 'react';

type NoUpdateAction = {
  type: 'NO_UPDATE';
};

type UpdateAction<S> = {
  type: 'UPDATE';
  state: S;
};

type SideEffectsAction<E> = {
  type: 'SIDE_EFFECTS';
  sideEffects: E;
};

type UpdateWithSideEffectsAction<S, E> = {
  type: 'UPDATE_WITH_SIDE_EFFECTS';
  state: S;
  sideEffects: E;
};

export const noUpdate: (action: { type: never }) => void;

export const update: <S>(state: S) => UpdateAction<S>;

export const sideEffects: <E>(sideEffects: E) => SideEffectsAction<E>;

export const updateWithSideEffects: <S, E>(
  state: S,
  sideEffects: E,
) => UpdateWithSideEffectsAction<S, E>;

interface Props<S, A> {
  initialState: S;
  reducer: (
    state: S,
    action: A,
  ) =>
    | NoUpdateAction
    | UpdateAction<S>
    | SideEffectsAction<(state: S) => any>
    | UpdateWithSideEffectsAction<S, (state: S) => any>;
  render: (
    { state, send }: { state: S; send: (action: A) => void },
  ) => ReactNode;
}

interface State<S> {
  internalState: S;
}

export default class Component<
  S,
  A extends {
    type: string;
    [key: string]: any;
  }
> extends Component<Props<S, A>, State<S>> {}
