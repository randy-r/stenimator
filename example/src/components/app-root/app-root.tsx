import { Component, h, Host } from '@stencil/core';
import { Github, Npm } from '../Icons/Icons';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <Host>
        <header class="header">
          <h4>Stenimator</h4>
          <span class="external-links">
            <a href="https://github.com/randy-r/stenimator" target="_blank">
              <Github />
            </a>
            <a href="https://www.npmjs.com/package/stenimator" target="_blank">
              <Npm />
            </a>
            </span>
        </header>
        <section class="content">
          <router-standard />
          <router-ordered />
          <router-individual />
          <data-fetching />
          <data-fetching-fast />
        </section>
      </Host>
    );
  }
}
