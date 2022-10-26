import { Component, h, Host } from '@stencil/core';
import { createRouter, Route, href } from 'stencil-router-v2';
import { Stenimator } from 'stenimator';

const Router = createRouter();

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
        </section>
      </Host>
    );
  }
}
