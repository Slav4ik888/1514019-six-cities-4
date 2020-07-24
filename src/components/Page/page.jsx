import React from 'react';
import pt from 'prop-types';
import Header from '../Header/header.jsx';
import Footer from '../Footer/footer.jsx';
import cl from 'classnames';
import {pageType} from '../../utils/const.js';

const Page = ({type, children}) => {

  return (
    <div className={cl(`page`,
        {[`page--gray`]: type === pageType.MAIN || type === pageType.SIGN_IN},
        {[`page--login`]: type === pageType.SIGN_IN},
        {[`page--main`]: type === pageType.MAIN},
        {[`page--favorites-empty`]: type === pageType.FAVORITES_EMPTY}
    )}>
      <Header/>
      {children}
      {(type === pageType.FAVORITES || type === pageType.FAVORITES_EMPTY) &&
        <Footer/>
      }
    </div>
  );
};

Page.propTypes = {
  type: pt.string.isRequired,
  children: pt.oneOfType([
    pt.arrayOf(pt.node),
    pt.node
  ]).isRequired
};

export default Page;
