import { Component, Host, h, State } from '@stencil/core';
import { Stenimator, StenimatorItem } from 'stenimator';
import { Router, Route, Switch, href } from '../router';

@Component({
  tag: 'router-individual',
  styleUrl: 'router-individual.css',
  shadow: false,
  scoped: false,
})
export class RouterIndividual {
  @State() showCode: boolean = false;
  lastAp = '';

  render() {
    let activePath = Router.activePath;
    this.lastAp = activePath.startsWith('/individual') ? activePath : this.lastAp;

    return (
      <Host>
        <h2>individual Page Transitions</h2>
        <nav>
          <a {...href('/individual/a', Router)} class={{ active: activePath === '/individual/a' }}>
            a
          </a>
          <a {...href('/individual/b', Router)} class={{ active: activePath === '/individual/b' }}>
            b
          </a>
          <a {...href('/individual/c', Router)} class={{ active: activePath === '/individual/c' }}>
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
              <Route path="/" to="/individual/a" />
              <Route path="/individual" to="/individual/a" />
              <Route path="/individual/a">
                <div key="a" data-order={1}>
                  A
                </div>
              </Route>
              <Route path="/individual/b">
                <StenimatorItem
                  order={2}
                  enter="enter2"
                  exit="exit2"
                  enterReverse="enter2-reverse"
                  exitReverse="exit2-reverse"
                >
                  <div key="b">B</div>
                </StenimatorItem>
              </Route>
              <Route path="/individual/c">
                <div key="c" data-order={3}>
                  C
                </div>
              </Route>
              <Route path={/./}>
                <div key="fallback">A</div>
              </Route>
            </Switch>
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
