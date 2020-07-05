import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);
      this._handleItemClick = this._handleItemClick.bind(this);

      this.state = {
        activItemId: null,
      };
    }

    _handleItemClick(selectedItem) {
      if (this.state.activItemId !== selectedItem) {
        this.setState({
          activItemId: selectedItem,
        });
      }
    }

    render() {
      return <Component
        {...this.props}
        activItem={this.state.activItemId}
        onItemClick={this._handleItemClick}
      />;
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
