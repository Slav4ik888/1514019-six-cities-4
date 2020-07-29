import React from 'react';
import pt from 'prop-types';

import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import {AuthStatus} from '../../reducers/user/user.js';
import {getUserStatus} from '../../reducers/user/selectors.js';
import {Operation as DataOperation} from '../../reducers/data/data.js';

import {AppRoute} from '../../utils/const.js';


const PrivateRoute = ({exact, path, render, userStatus, handleLoadFavorites}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (userStatus === AuthStatus.AUTH) {
          console.log(`PRIV AUTH`);
          handleLoadFavorites();
          return render();
        } else {
          console.log(`PRIV NO_AUTH`);
          return <Redirect to={AppRoute.SIGN_IN} />;
        }
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: pt.bool.isRequired,
  path: pt.string.isRequired,
  render: pt.func.isRequired,
  userStatus: pt.string.isRequired,
  handleLoadFavorites: pt.func.isRequired,

};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleLoadFavorites() {
    dispatch(DataOperation.loadFavorites());
  },
});

export {PrivateRoute};
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
