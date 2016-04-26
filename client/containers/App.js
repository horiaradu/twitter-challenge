import React from 'react';
import NavigationContainer from '../containers/NavigationContainer';

class App extends React.Component {
  render() {
    return <div className="container pt-70 pb-50">
      <NavigationContainer />
      {this.props.children}
    </div>;
  }
}

export default App;
