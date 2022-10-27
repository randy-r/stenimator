import { FunctionalComponent, h } from '@stencil/core';

export type SpinnerProps = {
  class?: string;
  key?: string;
};

export const Spinner: FunctionalComponent<SpinnerProps> = props => {
  const { key, class: cx } = props;
  return (
    <span class={cx}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        key={key}
        fill="currentColor"
        class={`spinner_GuJz`}
      >
        <g class="spinner_GuJz">
          <circle cx="3" cy="12" r="2" />
          <circle cx="21" cy="12" r="2" />
          <circle cx="12" cy="21" r="2" />
          <circle cx="12" cy="3" r="2" />
          <circle cx="5.64" cy="5.64" r="2" />
          <circle cx="18.36" cy="18.36" r="2" />
          <circle cx="5.64" cy="18.36" r="2" />
          <circle cx="18.36" cy="5.64" r="2" />
        </g>
      </svg>
    </span>
  );
};
