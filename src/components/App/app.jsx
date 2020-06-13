import React from 'react';
import Main from '../Main/main.jsx';


class App extends React.PureComponent {

  render() {
    // eslint-disable-next-line react/prop-types
    const {offers} = this.props;
    return (
      <Main offers={offers} />
    );
  }
}

export default App;
