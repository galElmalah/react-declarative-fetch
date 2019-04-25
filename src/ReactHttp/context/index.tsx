import * as React from 'react';
import { FetchState } from '../index';
export const HttpContext = React.createContext(null);

type requestPhases = 'error' | 'success' | 'fetching';

const HttpContextConsumer = HttpContext.Consumer;

export const throwIfNoContext = (contextValue: FetchState | null) => {
  if (!contextValue) {
    throw new Error(
      'ReactHttp compound components must be rendered insisde a provider i.e ReactHttp'
    );
  }
};

export const consumerCreator = (prop: requestPhases) => {
  const Phase = ({ children }: any): JSX.Element => {
    return (
      <HttpContextConsumer>
        {(contextValue): JSX.Element => {
          throwIfNoContext(contextValue);
          if (!contextValue[prop]) {
            return null;
          }
          return typeof children === 'function'
            ? children(contextValue)
            : children;
        }}
      </HttpContextConsumer>
    );
  };
  Phase.displayName = `Fetch(${prop}Phase)`;
  return Phase;
};
