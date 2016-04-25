require('../styles/App.less');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <form>
        <FormGroup controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl type="email"/>
        </FormGroup>
        <FormGroup controlId="formControlsPassword">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password"/>
        </FormGroup>

        <Button type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

export default Login;
