import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/card.jsx';


class CardList extends PureComponent {
  constructor(props) {
    super(props);
    this.cardFocusHandler = this.cardFocusHandler.bind(this);
    this.state = {focusCard: null};
  }

  cardFocusHandler(id) {
    this.setState({focusCard: id});
  }

  render() {
    const {offers} = this.props;

    return (
      <>
        {offers.map((offer) => {
          return <Card
            key={offer.id}
            offer={offer}
            onCardFocus={this.cardFocusHandler}
          />;
        })}
      </>
    );
  }
}


CardList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        cardMark: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        priceValue: PropTypes.number.isRequired,
        priceText: PropTypes.string.isRequired,
        raiting: PropTypes.number.isRequired,
        cardName: PropTypes.string.isRequired,
        cardType: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};

export default CardList;
