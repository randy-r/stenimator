import { Component, Host, h, State } from '@stencil/core';
import { Stenimator, StenimatorItem } from 'stenimator';
import { basePath } from '../../utils/basepath';
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
    this.lastAp = activePath.startsWith(basePath + '/individual') ? activePath : this.lastAp;

    return (
      <Host>
        <h2>Individual Page Transitions</h2>
        <nav>
          <a
            {...href(basePath + '/individual/a', Router)}
            class={{ active: activePath === basePath + '/individual/a' }}
          >
            /a
          </a>
          <a
            {...href(basePath + '/individual/b', Router)}
            class={{ active: activePath === basePath + '/individual/b' }}
          >
            /b
          </a>
          <a
            {...href(basePath + '/individual/c', Router)}
            class={{ active: activePath === basePath + '/individual/c' }}
          >
            /c
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
              <Route path={basePath + '/'} to={basePath + '/individual/c'} />
              <Route path={basePath + '/individual'} to={basePath + '/individual/c'} />
              <Route path={basePath + '/individual/a'}>
                <div key="a" data-order={1}>
                  A
                </div>
              </Route>
              <Route path={basePath + '/individual/b'}>
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
              <Route path={basePath + '/individual/c'}>
                <div key="c" data-order={3}>
                  C
                </div>
              </Route>
              <Route path={/./}>
                <div key="fallback">C</div>
              </Route>
            </Switch>
          </Stenimator>
          <CodeSection
            type="router-individual"
            onClick={() => (this.showCode = !this.showCode)}
            show={this.showCode}
          />
        </section>
      </Host>
    );
  }
}
