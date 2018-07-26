// @flow

export type NoUpdateAction = {|
  type: 'NO_UPDATE',
|};

export const noUpdate = (action: { type: empty }): NoUpdateAction => ({
  type: 'NO_UPDATE',
});

export type UpdateAction<S> = {|
  type: 'UPDATE',
  state: S,
|};

export const update = <S>(state: S): UpdateAction<S> => ({
  type: 'UPDATE',
  state,
});

export type SideEffectsAction<E> = {|
  type: 'SIDE_EFFECTS',
  sideEffects: E,
|};

export const sideEffects = <E>(sideEffects: E): SideEffectsAction<E> => ({
  type: 'SIDE_EFFECTS',
  sideEffects,
});

export type UpdateWithSideEffectsAction<S, E> = {|
  type: 'UPDATE_WITH_SIDE_EFFECTS',
  state: S,
  sideEffects: E,
|};

export const updateWithSideEffects = <S, E>(
  state: S,
  sideEffects: E,
): UpdateWithSideEffectsAction<S, E> => ({
  type: 'UPDATE_WITH_SIDE_EFFECTS',
  state,
  sideEffects,
});
