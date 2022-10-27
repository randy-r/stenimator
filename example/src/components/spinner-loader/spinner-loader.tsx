import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'spinner-loader',
  styleUrl: 'spinner-loader.css',
  shadow: true,
})
export class SpinnerLoader {
  render() {
    return (
      <Host>
       <div class="spinner-loader">Loading...</div>
      </Host>
    );
  }
}
