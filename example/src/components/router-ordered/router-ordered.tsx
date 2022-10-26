import { Component, Host, h, State } from '@stencil/core';
import { createRouter, Route, href } from 'stencil-router-v2';
import { Stenimator } from 'stenimator';

const Router = createRouter();

@Component({
  tag: 'router-ordered',
  styleUrl: 'router-ordered.css',
  shadow: false,
  scoped: false,
})
export class RouterOrdered {
  @State() showCode: boolean = false;

  render() {
    const activePath = Router.activePath;
    const RouterSwitch = Router.Switch;

    return (
      <Host>
        <h2>Ordered Page Transitions</h2>
        <nav>
          <a {...href('/ordered/a', Router)} class={{ active: activePath === '/ordered/a' }}>
            a
          </a>
          <a {...href('/ordered/b', Router)} class={{ active: activePath === '/ordered/b' }}>
            b
          </a>
          <a {...href('/ordered/c', Router)} class={{ active: activePath === '/ordered/c' }}>
            c
          </a>
        </nav>
        <section>
          <Stenimator
            criteria={Router.activePath}
            class="base"
            enter="enter"
            exit="exit"
            enterReverse="enter-reverse"
            exitReverse="exit-reverse"
          >
            <RouterSwitch>
              <Route path="/" to="/ordered/a" />
              <Route path="/ordered" to="/ordered/a" />
              <Route path="/ordered/a">
                <div key="a" data-order={1}>
                  A
                </div>
              </Route>
              <Route path="/ordered/b">
                <div key="b" data-order={2}>
                  B
                </div>
              </Route>
              <Route path="/ordered/c">
                <div key="c" data-order={3}>
                  C
                </div>
              </Route>
            </RouterSwitch>
          </Stenimator>
          <h3
            onClick={() => {
              this.showCode = !this.showCode;
            }}
          >
            Code
          </h3>
          {this.showCode && <router-standard-code class="code-shower" />}
        </section>
      </Host>
    );
  }
}
