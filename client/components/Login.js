require('../styles/App.less');

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  changeEmail(event) {
    this.props.setState({email: event.target.value});
  }

  changePassword(event) {
    this.props.setState({password: event.target.value});
  }

  login(event) {
    event.preventDefault();
    this.props.login(this.props.email, this.props.password, '/');
  }

  render() {
    return (
      <form>
        <FormGroup controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl type="email" value={this.props.email} onChange={this.changeEmail.bind(this)}/>
        </FormGroup>
        <FormGroup controlId="formControlsPassword">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" value={this.props.password} onChange={this.changePassword.bind(this)}/>
        </FormGroup>

        <Button type="submit" bsStyle="primary"
                onClick={this.login.bind(this)}>
          Submit
        </Button>
      </form>
    );
  }
}

export default Login;
