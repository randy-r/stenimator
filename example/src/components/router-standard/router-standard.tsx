import { Component, Host, h, State } from '@stencil/core';
import { Stenimator } from 'stenimator';
import { CodeSection } from '../Code/CodeSection';
import { Router, Switch, Route, href } from '../router';

@Component({
  tag: 'router-standard',
  styleUrl: 'router-standard.css',
  shadow: false,
  scoped: false,
})
export class RouterStandard {
  @State() showCode: boolean = false;
  lastAp = '';

  render() {
    let activePath = Router.activePath;
    this.lastAp = activePath.startsWith('/standard') ? activePath : this.lastAp;

    return (
      <Host>
        <h2>Page Transitions</h2>
        <nav>
          <a {...href('/standard/a', Router)} class={{ active: activePath === '/standard/a' }}>
            /a
          </a>
          <a {...href('/standard/b', Router)} class={{ active: activePath === '/standard/b' }}>
            /b
          </a>
          <a {...href('/standard/c', Router)} class={{ active: activePath === '/standard/c' }}>
            /c
          </a>
        </nav>
        <section>
          <Stenimator criteria={this.lastAp} class="base" enter="enter" exit="exit">
            <Switch>
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
              <Route path="/" to="/standard/a" />
              <Route path={/./}>
                <div key="fallback">A</div>
              </Route>
            </Switch>
          </Stenimator>

          <CodeSection
            type="router-standard"
            onClick={() => (this.showCode = !this.showCode)}
            show={this.showCode}
          />
        </section>
      </Host>
    );
  }
}
