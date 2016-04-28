import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {FormGroup, ControlLabel, FormControl, Button, Alert} from 'react-bootstrap';
import {Link} from 'react-router';
import {isEmail} from '../utils';

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
    if (this.valid()) {
      event.preventDefault();
      this.props.login(this.props.email, this.props.password, '/');
    }
  }

  valid() {
    return this.props.email && this.props.password && isEmail(this.props.email);
  }

  errorText() {
    return this.props.authStatus === 401 ?
      'Invalid email and/or password.' :
      this.props.authError;
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        {this.props.authError ?
          <Alert bsStyle="danger">
            <i className="fa fa-fw fa-exclamation-circle"/>{this.errorText()}
          </Alert> :
          ''
        }
        {this.props.passwordChangedSuccessful ?
          <Alert bsStyle="info">
            Password changed successfully
          </Alert> :
          ''
        }
        <form>
          <FormGroup controlId="email">
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" value={this.props.email}
                         onChange={this.changeEmail.bind(this)} required/>
          </FormGroup>
          <FormGroup controlId="formControlsPassword">
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" value={this.props.password}
                         onChange={this.changePassword.bind(this)} required/>
          </FormGroup>

          <div className="clearfix">
            <Link className="pull-right forgot-password" to="/forgot-password">Forgot password?</Link>
          </div>

          <Button type="submit" bsStyle="primary" className="full-width"
                  onClick={this.login.bind(this)}>
            Log In
          </Button>

          <div className="separator">
            <hr/>
          </div>

          <div className="clearfix">
            <span className="pull-left pt-6">Don't have an account?</span>
            <Button bsStyle="default" className="pull-right">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
