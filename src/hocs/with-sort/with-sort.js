import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducers/travel/travel.js';
import pt from 'prop-types';
import cl from 'classnames';


const options = [
  {value: `popular`, label: `Popular`},
  {value: `low-high`, label: `Price: low to high`},
  {value: `high-low`, label: `Price: high to low`},
  {value: `rating`, label: `Top rated first`},
];

const withSort = (Component) => {
  class WithSort extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        selected: {value: `popular`, label: `Popular`},
        isOpen: false,
      };
      this.handleOptionClick = this.handleOptionClick.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
      this.setState((state) => ({
        isOpen: !state.isOpen
      }));
    }

    handleOptionClick(option) {
      const {changeSorting} = this.props;
      this.setState({
        selected: option,
        isOpen: false
      });
      changeSorting(option.value);
    }

    render() {
      const {selected, isOpen} = this.state;

      return (
        <Component
          {...this.props}
        >
          <span className="places__sorting-type" tabIndex="0"
            onClick={this.handleToggle}>
            {selected.label}
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className={cl(`places__options places__options--custom`,
              {[`places__options--opened`]: isOpen})}>
            {options.map((option) => (
              <li key={option.value} tabIndex="0"
                onClick={() => this.handleOptionClick(option)}
                className={cl(`places__option`, {[`places__option--active`]: option.value === selected.value})}
              >{option.label}</li>
            ))}
          </ul>
        </Component>
      );
    }
  }

  WithSort.propTypes = {
    changeSorting: pt.func.isRequired
  };

  const mapDispatchToProps = (dispatch) => ({
    changeSorting(typeSorting) {
      dispatch(ActionCreator.setSorting(typeSorting));
    }
  });

  return connect(undefined, mapDispatchToProps)(WithSort);
};

export default withSort;
