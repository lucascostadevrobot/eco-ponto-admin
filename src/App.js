import React, { Component } from 'react';
import { auth, storageKey } from './service/base';
import Routes from './routes';

class App extends Component {
  state = {
    uid: null,

  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({ uid: user.uid });
      } else {
        window.localStorage.removeItem(storageKey);
        this.setState({ uid: null });
      }
    })

  }

  render() {
    return (<div><Routes /></div>);

  }
}

export default App;
