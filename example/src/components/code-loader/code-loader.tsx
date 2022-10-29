import { Component, Host, h, State, Prop, Build } from '@stencil/core';
import { Options } from './types';

const cacheMap = new Map<string, string>();

async function fetchTxt(input: string, init?: RequestInit): Promise<string> {
  const cached = cacheMap.get(input);
  if (cached) {
    return cached;
  }
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Fetching text errr: ${response.statusText}`);
  }
  const text = await response.text();
  cacheMap.set(input, text);
  return text;
}

@Component({
  tag: 'code-loader',
  styleUrl: 'code-loader.css',
  shadow: false,
  scoped: false,
})
export class CodeLoader {
  @State() selected: 'css' | 'tsx' = 'tsx';
  @Prop() type: Options;
  tsxContent = '';
  cssContent = '';
  fetchError: Error | null = null;

  async componentWillRender() {
    try {
      if (Build.isBrowser) {
        const { type } = this;
        const [tsxTxt, cssTxt] = await Promise.all([
          fetchTxt(`/assets/code-snippets/${type}.tsx.txt`, { cache: 'force-cache' }),
          fetchTxt(`/assets/code-snippets/${type}.css.txt`, { cache: 'force-cache' }),
        ]);
        this.tsxContent = tsxTxt;
        this.cssContent = cssTxt;
      }
    } catch (error) {
      this.fetchError = error as Error;
    }
  }

  render() {
    const { selected, tsxContent, cssContent } = this;
    if (this.fetchError) {
      console.error(this.fetchError);
      return (
        <Host class="code-renderer">
          <p>An error accured when fetching example code snippets.</p>
        </Host>
      );
    }
    return (
      <Host class="code-renderer">
        <div class="tabs">
          <button
            class={{ selected: selected === 'tsx' }}
            onClick={() => {
              this.selected = 'tsx';
            }}
          >
            tsx
          </button>
          <button
            class={{ selected: selected === 'css' }}
            onClick={() => {
              this.selected = 'css';
            }}
          >
            css
          </button>
        </div>
        <div class="code hljs--vars">
          <pre class={{ selected: selected === 'tsx' }}>
            <code class="jsx" innerHTML={tsxContent}></code>
          </pre>
          <pre class={{ selected: selected === 'css' }}>
            <code class="css" innerHTML={cssContent}></code>
          </pre>
        </div>
      </Host>
    );
  }
}
