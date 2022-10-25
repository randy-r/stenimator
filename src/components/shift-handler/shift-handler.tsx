import { Component, Host, h, State, Prop, Element, Build } from '@stencil/core';
import { Status, CxProps, CxOrderProps } from '../../types/types';
import { mapConfigToCx } from '../../utils/utils';
import { AddClass } from './AddClass';

const animationendEventOptions = { once: true };

@Component({
  tag: 'shift-handler',
  styleUrl: 'shift-handler.css',
  shadow: false,
  scoped: false,
})
export class ShiftHandler {
  @Element() host: HTMLElement;

  @Prop() class: string | undefined;

  @Prop() enter!: CxProps['enter'];
  @Prop() exit!: CxProps['exit'];
  @Prop() enterReverse: CxProps['enterReverse'];
  @Prop() exitReverse: CxProps['exitReverse'];
  @Prop() stableChild: string | undefined;

  @Prop() getJsx!: () => any;
  @Prop() criteria!: any;
  @Prop() getChildConfig!: () => CxOrderProps;

  @State() status: Status = 'stable';

  lastCrit = this.criteria;
  crtCrit = this.criteria;
  lastBeforeStable: any = {};

  lastJsxBeforeStable: any = null;
  crtJsx: any = null;
  lastBeforeStableChildConfig: null;
  crtChildConfig = null;
  prerendered: boolean | null = null;
  animationendCount = 0;

  becomeStable = () => {
    this.lastCrit = this.crtCrit;
    this.crtCrit = this.criteria;
    this.status = 'stable';
  };

  handleAnimationEnd = (_e: AnimationEvent): void => {
    if (++this.animationendCount === 2) {
      this.becomeStable();
      this.animationendCount = 0;
    }
  };

  componentWillLoad() {
    this.crtJsx = this.getJsx();
    this.crtChildConfig = this.getChildConfig();
    this.prerendered = this.host.dataset?.prerendered === 'true';
  }

  componentDidUpdate() {
    if (this.status === 'between') {
      const crtEl = this.host.querySelector('.current');
      const lastEl = this.host.querySelector('.previous');
      crtEl.addEventListener('animationend', this.handleAnimationEnd, animationendEventOptions);
      lastEl.addEventListener('animationend', this.handleAnimationEnd, animationendEventOptions);
    }
  }

  componentWillRender() {
    if (this.status === 'between') {
      // freeze everything
      return;
    }
    if (this.criteria !== this.lastCrit && !this.prerendered) {
      this.lastBeforeStable = this.lastCrit;
      this.lastJsxBeforeStable = this.crtJsx;
      this.lastBeforeStableChildConfig = this.crtChildConfig;
      this.crtJsx = this.getJsx();
      this.crtChildConfig = this.getChildConfig();
      this.lastCrit = this.crtCrit;
      this.crtCrit = this.criteria;
      this.status = 'between';
    }
  }

  componentDidLoad() {
    this.prerendered = Build.isServer;
    this.host.dataset.prerendered = this.prerendered + '';
  }

  render() {
    const {
      enter,
      exit,
      enterReverse,
      exitReverse,
      status,
      crtChildConfig,
      lastBeforeStableChildConfig,
      stableChild,
    } = this;
    const { c, l } = mapConfigToCx(
      enter,
      exit,
      enterReverse,
      exitReverse,
      status,
      crtChildConfig,
      lastBeforeStableChildConfig,
      stableChild,
    );
    return (
      <Host class={this.class}>
        {(this.status === 'stable' || this.status === 'between') && (
          <AddClass class={c}>{this.crtJsx}</AddClass>
        )}
        {this.status === 'between' && <AddClass class={l}>{this.lastJsxBeforeStable}</AddClass>}
      </Host>
    );
  }
}
