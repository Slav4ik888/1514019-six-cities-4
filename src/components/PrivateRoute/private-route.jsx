import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {AuthStatus} from '../../reducers/user/user.js';
import {AppRoute} from '../../utils/const.js';
import {getUserStatus} from '../../reducers/user/selectors.js';
import pt from 'prop-types';

const PrivateRoute = (props) => {
  const {exact, path, render, userStatus} = props;
  // console.log('PRIV userStatus: ', userStatus);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        return (
          userStatus === AuthStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN}/>
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: pt.bool.isRequired,
  path: pt.string.isRequired,
  render: pt.func.isRequired,
  userStatus: pt.string.isRequired
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps, undefined)(PrivateRoute);
