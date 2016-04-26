import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {hashHistory} from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    console.log(this.props.isAuthenticated);
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Twitter Challenge</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.props.isAuthenticated ?
            <Nav pullRight>
              < NavItem eventKey={3} onClick={() => this.props.logout()}>Log Out</NavItem>
            </Nav> :
            <Nav pullRight>
              <NavItem eventKey={1}>Sign Up</NavItem>
              < NavItem eventKey={2} onClick={() => hashHistory.push('/login')}>Log In</NavItem>
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Dashboard;
