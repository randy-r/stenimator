import { Fragment, FunctionalComponent, h } from '@stencil/core';
import { Stenimator } from 'stenimator';
import { Options } from '../code-loader/types';

export type CodeSectionProps = {
  onClick: () => void;
  show: boolean;
  type: Options;
};

export const CodeSection: FunctionalComponent<CodeSectionProps> = props => {
  const { onClick, show, type } = props;
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  return (
    <Fragment>
      <section>
        <button onClick={handleClick} class="code-trigger">
          <span>{show ? '▽' : '▷'}</span> Code
        </button>
        <Stenimator criteria={show} class="show-code-base" enter="enter-top" exit="exit-top">
          {show && <code-loader type={type} class="code-shower" />}
          {!show && <span />}
        </Stenimator>
      </section>
    </Fragment>
  );
};
