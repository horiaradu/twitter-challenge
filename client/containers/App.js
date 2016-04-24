import React from 'react';

class App extends React.Component {
  render() {
    return <div className="container pt-70">
      {this.props.children}
    </div>;
  }
}

export default App;
