import { FunctionalComponent, Fragment, h, Build } from '@stencil/core';
import { CxOrderProps, StenimatorProps } from '../types/types';

const defaultEnter = 'enter-right-left';
const defaultExit = 'exit-right-left';

export const FunctionalGrabber: FunctionalComponent<StenimatorProps> = (props, children, utils) => {
  const { criteria, enter: givenEnter, enterReverse, exit: givenExit, exitReverse, class: cx, key } = props;
  const enter = givenEnter ?? defaultEnter;
  const exit = givenExit ?? defaultExit;
  if (!children?.length || children.length > 1) {
    throw new Error(
      `This component support one child only. Number of children components passed "${children?.length}".`,
    );
  }
  return (
    <Fragment>
      <shift-handler
        data-prerendered={Build.isServer}
        class={cx}
        key={key}
        getJsx={() => {
          return children;
        }}
        getChildConfig={() => {
          let vattrs = {};
          utils.forEach(children, c => {
            vattrs = c.vattrs;
          });
          const order = vattrs?.['data-order'] as number;
          const enter = vattrs?.['data-enter'] as string;
          const enterReverse = vattrs?.['data-enter-reverse'] as string;
          const exit = vattrs?.['data-exit'] as string;
          const exitReverse = vattrs?.['data-exit-reverse'] as string;
          const conf: CxOrderProps = {
            order,
            enter,
            enterReverse,
            exit,
            exitReverse,
          };
          return conf;
        }}
        criteria={criteria}
        enter={enter}
        exit={exit}
        enterReverse={enterReverse}
        exitReverse={exitReverse}
      />
    </Fragment>
  );
};
