import { FunctionalComponent } from '@stencil/core';
import { GeneralProps } from '../../types/types';

export const AddClass: FunctionalComponent<GeneralProps> = (props, children, utils) =>
  utils.map(children, child => {
    child.vattrs = child.vattrs ?? {};
    child.vattrs.class = child.vattrs.class ?? '';
    child.vattrs.key = props.key ? props.key : child.vattrs.key;
    return {
      ...child,
      vattrs: {
        ...child.vattrs,
        class: `${child.vattrs.class} ${props.class}`,
      },
    };
  });

