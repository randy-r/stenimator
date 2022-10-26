import { Component, Host, h, State } from '@stencil/core';
import { createRouter, Route, href } from 'stencil-router-v2';
import { Stenimator } from 'stenimator';

const Router = createRouter();

@Component({
  tag: 'router-standard',
  styleUrl: 'router-standard.css',
  shadow: false,
  scoped: false,
})
export class RouterStandard {
  @State() showCode: boolean = false;

  render() {
    const activePath = Router.activePath;

    return (
      <Host>
        <h2>Page Transitions</h2>
        <nav>
          <a {...href('/standard/a', Router)} class={{ active: activePath === '/standard/a' }}>
            a
          </a>
          <a {...href('/standard/b', Router)} class={{ active: activePath === '/standard/b' }}>
            b
          </a>
          <a {...href('/standard/c', Router)} class={{ active: activePath === '/standard/c' }}>
            c
          </a>
        </nav>
        <section>
          <Stenimator criteria={activePath} class="base" enter="enter" exit="exit">
            <Router.Switch>
              <Route path="/" to="/standard/a" />
              <Route path="/standard" to="/standard/a" />
              <Route path="/standard/a">
                <div>A</div>
              </Route>
              <Route path="/standard/b">
                <div key="/standard/b">B</div>
              </Route>
              <Route path="/standard/c">
                <div key="/standard/c">C</div>
              </Route>
            </Router.Switch>
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
