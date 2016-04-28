import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {FormGroup, ControlLabel, FormControl, Button, Alert} from 'react-bootstrap';
import {hashHistory} from 'react-router';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  changePassword(event) {
    this.props.setState({resetPassword: {password: event.target.value}});
  }

  changeConfirmPassword(event) {
    this.props.setState({resetPassword: {confirmPassword: event.target.value}});
  }

  resetPassword(event) {
    if (this.valid()) {
      event.preventDefault();
      this.props.resetPassword(this.props.password, this.props.location.query.access_token);
    }
  }

  valid() {
    return this.props.password && this.props.password === this.props.confirmPassword;
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        {this.props.resetStatus ?
          <Alert bsStyle="info">
            {this.props.ok ? '' : <i className="fa fa-fw fa-exclamation-circle"/>}
            {this.props.resetStatus}
          </Alert> :
          ''
        }
        <form>
          <FormGroup controlId="formControlsPassword">
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" value={this.props.password}
                         onChange={this.changePassword.bind(this)} required/>
          </FormGroup>
          <FormGroup controlId="formControlsConfirmPassword">
            <ControlLabel>Confirm password</ControlLabel>
            <FormControl type="password" value={this.props.confirmPassword}
                         onChange={this.changeConfirmPassword.bind(this)} required/>
          </FormGroup>

          <Button type="submit" bsStyle="primary" className="full-width"
                  onClick={this.resetPassword.bind(this)}>
            Change
          </Button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
