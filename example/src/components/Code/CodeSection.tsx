import { FunctionalComponent, h } from '@stencil/core';
import { Stenimator } from 'stenimator';

export type CodeSectionProps = {
  onClick: () => void;
  show: boolean;
  type: 'ordered' | 'individual' | 'standard' | 'data-fetching';
};

export const CodeSection: FunctionalComponent<CodeSectionProps> = props => {
  const { onClick, show, type } = props;
  return (
    <div>
      <span role="button" onClick={onClick} class="btn-like" tabIndex={0}>
        {!show ? 'code' : 'x'}
      </span>
      <Stenimator criteria={show} class="show-code-base" enter="enter-top" exit="exit-top">
        {show && <code-loader class="code-shower" />}
        {!show && <span />}
      </Stenimator>
    </div>
  );
};
