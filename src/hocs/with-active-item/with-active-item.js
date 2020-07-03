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

    _handleItemClick(id) {
      if (this.state.activItemId !== id) {
        this.setState({
          activItemId: id,
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
