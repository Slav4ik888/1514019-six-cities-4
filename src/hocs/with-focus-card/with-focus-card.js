import React, {PureComponent} from 'react';

const withFocusCard = (Component) => {
  class WithFocusCard extends PureComponent {
    constructor(props) {
      super(props);
      this._handleCardFocusEnter = this._handleCardFocusEnter.bind(this);
      this._handleCardFocusLeave = this._handleCardFocusLeave.bind(this);

      this.state = {focusCard: null};
    }

    _handleCardFocusEnter(offer) {
      // console.log(`FOCUS`, offer);
      this.setState({focusCard: offer});
    }

    _handleCardFocusLeave() {
      // console.log(`NOT FOCUS`);
      this.setState({focusCard: null});
    }

    render() {
      const {focusCard} = this.state;

      return <Component
        {...this.props}
        focusCard={focusCard}
        onCardFocusEnter={this._handleCardFocusEnter}
        onCardFocusLeave={this._handleCardFocusLeave}
      />;
    }
  }

  return WithFocusCard;
};

export default withFocusCard;
