import { Component, h } from '@stencil/core';
import { createRouter, Route, href } from 'stencil-router-v2';
import { Stenimator } from '../stenimator/Stenimator';

const Router = createRouter();

@Component({
  tag: 'st-playground',
  styleUrl: 'st-playground.css',
  shadow: false,
  scoped: false,
})
export class StPlayground {
  render() {
    let activePath = Router.activePath;
    return (
      <div>
        <h2>Playground</h2>
        <nav>
          <a {...href('/a', Router)}>a</a>
          <a {...href('/b', Router)}>b</a>
          <a {...href('/c', Router)}>c</a>
        </nav>
        <main>
          <Stenimator criteria={activePath} class="base" enter="enter" exit="exit">
            <Router.Switch>
              <Route path="/" to="/a" />
              <Route path="/a">
                <div key="a">A</div>
              </Route>
              <Route path="/b">
                <div key="b"> B</div>
              </Route>
              <Route path="/c">
                <section>C</section>
              </Route>
            </Router.Switch>
          </Stenimator>
        </main>
      </div>
    );
  }
}
