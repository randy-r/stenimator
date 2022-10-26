import { Component, Host, h, State } from '@stencil/core';
import tsxText from './tsx.txt';
import cssText from './css.txt';

@Component({
  tag: 'router-standard-code',
  styleUrl: 'router-standard-code.css',
  shadow: false,
  scoped: false,
})
export class RouterStandardCode {
  @State() selected: 'css' | 'tsx' = 'tsx';

  render() {
    return (
      <Host class="code-renderer">
        <div class="tabs">
          <button
            class={{ selected: this.selected === 'tsx' }}
            onClick={() => {
              this.selected = 'tsx';
            }}
          >
            tsx
          </button>
          <button
            class={{ selected: this.selected === 'css' }}
            onClick={() => {
              this.selected = 'css';
            }}
          >
            css
          </button>
        </div>
        <div class="code hljs--vars">
          <pre class={{ selected: this.selected === 'tsx' }}>
            <code class="jsx" innerHTML={tsxText}></code>
          </pre>
          <pre class={{ selected: this.selected === 'css' }}>
            <code class="css" innerHTML={cssText}></code>
          </pre>
        </div>
      </Host>
    );
  }
}
