import { FunctionalComponent } from '@stencil/core';
import { CxOrderProps } from '../../types/types';

export const StenimatorItem: FunctionalComponent<CxOrderProps> = (props, children, utils) =>
  utils.map(children, child => {
    return {
      ...child,
      vattrs: {
        ...child.vattrs,
        ['data-order']: props.order,
        ['data-enter']: props.enter,
        ['data-exit']: props.exit,
        ['data-enter-reverse']: props.enterReverse,
        ['data-exist-reverse']: props.exitReverse,
      },
    };
  });
