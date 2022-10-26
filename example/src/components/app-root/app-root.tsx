import { Component, h, Host } from '@stencil/core';

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
            <router-standard />
            <router-ordered />
            <router-individual />
        </section>
      </Host>
    );
  }
}
