import React from 'react';
import Main from '../Main/index.jsx';


class App extends React.PureComponent {

    render() {
        const { offerValue } = this.props; // eslint-disable-next-line react/prop-types
        return (
            <Main offerValue={offerValue} />
        )
    }

}

export default App;
