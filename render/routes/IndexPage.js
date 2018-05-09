import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

import { Button } from 'antd';

function IndexPage(props) {
  console.log(props);
  const { user, h, dispatch } = props;
  console.log(user, h);
  if (!user) {
    dispatch({ type: 'account/fetch' });
  }

  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <Button type="danger">Danger</Button>
      <Button type="primary">Hello Button</Button>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

const mapStateToProps = (state) => {
  console.log(state);
  return {};
}

export default connect(mapStateToProps)(IndexPage);
