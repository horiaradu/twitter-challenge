import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {FormGroup, ControlLabel, FormControl, Button, Alert} from 'react-bootstrap';
import {isEmail} from '../utils'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  changeEmail(event) {
    this.props.setState({email: event.target.value});
  }

  sendEmail(event) {
    if (this.valid()) {
      event.preventDefault();
      this.props.forgotPassword(this.props.email);
    }
  }

  valid() {
    return this.props.email && isEmail(this.props.email);
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        {this.props.emailStatus ?
          <Alert bsStyle="info">
            {this.props.ok ? '' : <i className="fa fa-fw fa-exclamation-circle"/>}
            {this.props.emailStatus}
          </Alert> :
          ''
        }
        <form>
          <FormGroup controlId="email">
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" value={this.props.email}
                         onChange={this.changeEmail.bind(this)} required/>
          </FormGroup>

          <Button type="submit" bsStyle="primary" className="full-width"
                  onClick={this.sendEmail.bind(this)}>
            Send email
          </Button>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
