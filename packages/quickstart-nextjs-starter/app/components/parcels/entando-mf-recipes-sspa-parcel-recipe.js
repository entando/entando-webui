import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import Root from './root.component';

export const MyParcel = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary() {
    return <div>This renders when a catastrophic error occurs</div>;
  },
});

export const bootstrap = MyParcel.bootstrap;
export const mount = MyParcel.mount;
export const unmount = MyParcel.unmount;
