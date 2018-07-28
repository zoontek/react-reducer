// @flow

import * as React from 'react';
import { render } from 'react-dom';
import Counter from './Counter';

const EXAMPLES = {
  Counter,
};

type Example = $Keys<typeof EXAMPLES>;

const Link = ({ to, onClick }: { to: Example, onClick: Example => void }) => (
  <li>
    <a
      style={{ marginRight: 10 }}
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick(to);
      }}
    >
      {to}
    </a>
  </li>
);

type State = {|
  selected: Example,
|};

class App extends React.Component<{}, State> {
  state = {
    selected: 'Counter',
  };

  render() {
    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        <ul style={{ paddingLeft: 20 }}>
          <Link
            to="Counter"
            onClick={selected => this.setState({ selected })}
          />
        </ul>

        {EXAMPLES[this.state.selected]()}
      </div>
    );
  }
}

const root = document.querySelector('#root');
root && render(<App />, root);
