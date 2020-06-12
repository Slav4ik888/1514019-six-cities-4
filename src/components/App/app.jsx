import React from 'react';
import Main from '../Main/main.jsx';


class App extends React.PureComponent {

  render() {
    // eslint-disable-next-line react/prop-types
    const {offerValue} = this.props;
    return (
      <Main offerValue={offerValue} />
    );
  }
}

export default App;
