import { Component, Host, h, State } from '@stencil/core';
import { Stenimator } from 'stenimator';
import { basePath } from '../../utils/basepath';
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
    this.lastAp = activePath.startsWith(basePath + '/standard') ? activePath : this.lastAp;

    return (
      <Host>
        <h2>Page Transitions</h2>
        <nav>
          <a
            {...href(basePath + '/standard/a', Router)}
            class={{ active: activePath === basePath + '/standard/a' }}
          >
            /a
          </a>
          <a
            {...href(basePath + '/standard/b', Router)}
            class={{ active: activePath === basePath + '/standard/b' }}
          >
            /b
          </a>
          <a
            {...href(basePath + '/standard/c', Router)}
            class={{ active: activePath === basePath + '/standard/c' }}
          >
            /c
          </a>
        </nav>
        <section>
          <Stenimator criteria={this.lastAp} class="base" enter="enter" exit="exit">
            <Switch>
              <Route path={basePath + '/'} to={basePath + '/standard/a'} />
              <Route path={basePath + '/standard'} to={basePath + '/standard/a'} />
              <Route path={basePath + '/standard/a'}>
                <div>A</div>
              </Route>
              <Route path={basePath + '/standard/b'}>
                <div key="b">B</div>
              </Route>
              <Route path={basePath + '/standard/c'}>
                <div key="c">C</div>
              </Route>
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
