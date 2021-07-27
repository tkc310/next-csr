import useIsComponentMounted from './useIsComponentMounted';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

/**
 * Like React's [useState](https://reactjs.org/docs/hooks-reference.html#usestate)
 * but it makes sure the component that uses this hook is mounted when updating state
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 * @export
 * @param {any} initialState
 * @returns {[any, Diapatch<any>]} an array of 2 items
 * the first is the current state, the second is a function that enables
 * updating the state if the component is not mounted
 */

const useSafeState = <S = undefined>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
  const isComponentMounted = useIsComponentMounted();
  const [state, setState] = useState(initialState);

  const newSetState = (newState: SetStateAction<S>) => {
    if (isComponentMounted.current) {
      setState(newState);
    }
  };

  return [state, newSetState];
};

export default useSafeState;
