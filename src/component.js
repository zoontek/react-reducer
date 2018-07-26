// @flow

import { Component as ReactComponent } from 'react';
import type { Node } from 'react';

import type {
  NoUpdateAction,
  UpdateAction,
  SideEffectsAction,
  UpdateWithSideEffectsAction,
} from './updates';

type Props<S, A> = {|
  initialState: S,
  reducer: (
    state: S,
    action: A,
  ) =>
    | NoUpdateAction
    | UpdateAction<S>
    | SideEffectsAction<(state: S) => any>
    | UpdateWithSideEffectsAction<S, (state: S) => any>,
  render: ({|
    state: S,
    send: (action: A) => void,
  |}) => Node,
|};

type State<S> = {|
  internalState: S,
|};

export default class Component<
  S,
  A: { type: $Subtype<string> },
> extends ReactComponent<Props<S, A>, State<S>> {
  constructor(props: Props<S, A>) {
    super(props);

    this.state = {
      internalState: props.initialState,
    };
  }

  render() {
    return this.props.render({
      state: this.state.internalState,
      send: action => {
        let sideEffects: ?(state: S) => any;

        this.setState(
          state => {
            const reduced = this.props.reducer(state.internalState, action);

            switch (reduced.type) {
              case 'NO_UPDATE':
                return null;
              case 'UPDATE':
                return { internalState: reduced.state };
              case 'SIDE_EFFECTS':
                sideEffects = reduced.sideEffects;
                return null;
              case 'UPDATE_WITH_SIDE_EFFECTS':
                sideEffects = reduced.sideEffects;
                return { internalState: reduced.state };
              default:
                return state;
            }
          },
          () => {
            sideEffects && sideEffects(this.state.internalState);
          },
        );
      },
    });
  }
}
