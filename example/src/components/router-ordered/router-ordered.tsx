import { Component, Host, h, State } from '@stencil/core';
import { Stenimator } from 'stenimator';
import { CodeSection } from '../Code/CodeSection';
import { Router, Route, Switch, href } from '../router';

@Component({
  tag: 'router-ordered',
  styleUrl: 'router-ordered.css',
  shadow: false,
  scoped: false,
})
export class RouterOrdered {
  @State() showCode: boolean = false;
  lastAp = '';

  render() {
    let activePath = Router.activePath;
    this.lastAp = activePath.startsWith('/ordered') ? activePath : this.lastAp;

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
            criteria={this.lastAp}
            class="base"
            enter="enter"
            exit="exit"
            enterReverse="enter-reverse"
            exitReverse="exit-reverse"
          >
            <Switch>
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
              <Route path={/./}>
                <div key="fallback">A</div>
              </Route>
            </Switch>
          </Stenimator>

          <CodeSection
            type="ordered"
            onClick={() => (this.showCode = !this.showCode)}
            show={this.showCode}
          />
        </section>
      </Host>
    );
  }
}
