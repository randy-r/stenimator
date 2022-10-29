import { Component, Host, h, State } from '@stencil/core';
import { Stenimator } from 'stenimator';
import { basePath } from '../../utils/basepath';
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
    this.lastAp = activePath.startsWith(basePath + '/ordered') ? activePath : this.lastAp;

    return (
      <Host>
        <h2>Ordered Page Transitions</h2>
        <nav>
          <a
            {...href(basePath + '/ordered/a', Router)}
            class={{ active: activePath === basePath + '/ordered/a' }}
          >
            /a
          </a>
          <a
            {...href(basePath + '/ordered/b', Router)}
            class={{ active: activePath === basePath + '/ordered/b' }}
          >
            /b
          </a>
          <a
            {...href(basePath + '/ordered/c', Router)}
            class={{ active: activePath === basePath + '/ordered/c' }}
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
              <Route path={basePath + '/'} to={basePath + '/ordered/b'} />
              <Route path={basePath + '/ordered'} to={basePath + '/ordered/b'} />
              <Route path={basePath + '/ordered/a'}>
                <div key="a" data-order={1}>
                  A
                </div>
              </Route>
              <Route path={basePath + '/ordered/b'}>
                <div key="b" data-order={2}>
                  B
                </div>
              </Route>
              <Route path={basePath + '/ordered/c'}>
                <div key="c" data-order={3}>
                  C
                </div>
              </Route>
              <Route path={/./}>
                <div key="fallback">B</div>
              </Route>
            </Switch>
          </Stenimator>

          <CodeSection
            type="router-ordered"
            onClick={() => (this.showCode = !this.showCode)}
            show={this.showCode}
          />
        </section>
      </Host>
    );
  }
}
