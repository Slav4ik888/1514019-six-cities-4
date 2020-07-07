import React, {PureComponent} from 'react';
import pt from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);
      this._handleItemClick = this._handleItemClick.bind(this);

      this.state = {
        activeItemId: null,
      };
    }

    _handleItemClick(selectedItem) {
      // console.log('selectedItem: ', selectedItem);
      if (this.state.activeItemId !== selectedItem) {
        this.setState({
          activeItemId: selectedItem,
        });
        // if (this.props.onItemClick) {
        this.props.onItemClick(selectedItem);
        // }
      }
    }

    render() {
      return <Component
        {...this.props}
        activeItemId={this.state.activeItemId}
        onItemClick={this._handleItemClick}
      />;
    }
  }

  WithActiveItem.propTypes = {
    onItemClick: pt.func.isRequired,
  };

  return WithActiveItem;
};

export default withActiveItem;
