import React from 'react';


class Main extends React.PureComponent {

    render() {
        const { offerValue } = this.props; // eslint-disable-next-line react/prop-types

        return (
            <>
                <div>Добро пожаловать!!!</div>
                <div>Сейчас для вас { offerValue } предложения</div>
            </>
        )
    }
}

export default Main;