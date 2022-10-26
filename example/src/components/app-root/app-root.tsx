import { Component, h, Host } from '@stencil/core';
import { createRouter } from 'stencil-router-v2';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <Host>
        <header class="header"><h4>Stenimator</h4></header>
        <section class="content">
            {/* <router-standard /> */}
            <router-ordered />
        </section>
      </Host>
    );
  }
}
