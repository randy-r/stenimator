import { Component, h } from '@stencil/core';
import { createRouter, Route, href } from 'stencil-router-v2';
import { Stenimator } from 'stenimator';

const Router = createRouter();

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    const activePath = Router.activePath;
    return (
      <div>
        <h2>App Root</h2>
        <nav>
          <a {...href('/a', Router)}>a</a>
          <a {...href('/b', Router)}>b</a>
          <a {...href('/c', Router)}>c</a>
        </nav>
        <main>
          <Stenimator criteria={activePath} class="base" enter="enter" exit="exit">
            <Router.Switch>
              <Route path="/a">
                <div>A</div>
              </Route>
              <Route path="/b">
                <div key="b">B</div>
              </Route>
              <Route path="/c">
                <div key="c">C</div>
              </Route>
            </Router.Switch>
          </Stenimator>
        </main>
      </div>
    );
  }
}
