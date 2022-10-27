import { Component, Host, h, State } from '@stencil/core';
import { Stenimator, StenimatorItem } from 'stenimator';
import { CodeSection } from '../Code/CodeSection';
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
        <h2>Individual Page Transitions</h2>
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
          <CodeSection
            type="individual"
            onClick={() => (this.showCode = !this.showCode)}
            show={this.showCode}
          />
        </section>
      </Host>
    );
  }
}
