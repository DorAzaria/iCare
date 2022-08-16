import React from "react";
import PropTypes from "prop-types";

import AppContext from "@contexts/App";
import moment from "moment";
import "./index.css";
import DatabaseDriver from "@database/Driver";
import AppKeys from "@shared/AppKeys";
import {
  Navbar,
  NavbarBrand, 
  Nav,
  NavLink,
  NavbarToggler,
  Collapse,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import Notifications from "react-notifications-menu";
import { LinkContainer } from "react-router-bootstrap";

const SERVER_PROFILE_URL = AppKeys["SERVER_PROFILE_URL"];
const KEY_NUMBER_USER = AppKeys["NUMBER_USER"];

class ShellNavigation extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false,
      notifications: [],
    };
    this.toggle = this.toggle.bind(this);
    this.toggleDrop = this.toggleDrop.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  toggleDrop() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }
  componentDidMount() {
    this.loadNotification();
  }

  loadNotification() {
    const { context } = this;

    const { user } = context;

    const { number } = user;

    const parameters = {
      [KEY_NUMBER_USER]: number,
    };

    DatabaseDriver.loadNotifications(parameters)
      .then((data) => {
        data.map((item) => {
          item.receivedTime = moment(item.receivedTime).fromNow();
          item.image = item.image
            ? SERVER_PROFILE_URL + item.image
            : "logo.png";
        });
        this.setState({ notifications: data });
      })
      .catch((error) => {});
  }
  render() {
    const { props, context, state } = this;

    const { body, links } = props;
    const { notifications } = state;
    const { strings, user } = context;

    const profileUrl = SERVER_PROFILE_URL + user.avatar;

    //const appTitle = strings['TITLE_APP'];
    const navigationLinks = links.map((pair) => {
      const { key, link } = pair;
      const label = strings[key];
      return (
        <NavItem>
          <NavLink
            key={key}
            href={link}
            style={{
              backgroundColor: "#dadada",
              color: "#5B5B5B",
              paddingLeft: "26px",
              marginBottom:"-15px",
              fontFamily: 'JetBrains Mono',
            }}
          >
            {label}
          </NavLink>
        </NavItem>
      );
    });

    return (
      <>
        <header className="sticky-top icare-navbar">
          <Navbar
            dark
            style={{ height: 90 }}
            expand="md"
            className="container-xxl"
          >
            <NavbarBrand href="/">
              <img alt="iCare" src="logo.png" className="logo-img" />
              
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <div className="flex-grow-1">
                <Nav className="mr-auto" navbar>
                  {navigationLinks}
                  {/* <img src = { profileUrl ? profileUrl : 'logo.png'} className = "profile-avatar" alt = "user profile"></img> */}
                </Nav>
              </div>
              <div className="ms-md-auto">
                <Nav className="mr-auto" navbar>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "20px",
                    }}
                  >
                    <Notifications
                      data={notifications}
                      width="300px"
                      cardOption={(data) => console.log(data)}
                      //markAsRead={data => console.log(data)}
                      headerBackgroundColor="#ECD4FF"
                      header={{
                        title: "Notifications",
                        fontFamily: 'JetBrains Mono',
                        option: { text: "View All", onClick: () => {} },
                      }}
                    />
                  </div>

                  <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggleDrop}
                  >
                    <DropdownToggle
                      aria-expanded
                      data-toggle="dropdown"
                      tag="span"
                    >
                      <img
                        src={user.avatar ? profileUrl : "EmptyProfile.jpg"}
                        className="profile-avatar"
                        alt="user profile"
                      ></img>
                    </DropdownToggle>
                    <DropdownMenu end>
                      <LinkContainer to="/profile" replace>
                        <DropdownItem
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Profile
                        </DropdownItem>
                      </LinkContainer>

                      <DropdownItem divider />
                      <LinkContainer to="/log-out" replace>
                        <DropdownItem
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Log out
                        </DropdownItem>
                      </LinkContainer>
                    </DropdownMenu>
                  </Dropdown>
                </Nav>
              </div>
            </Collapse>
          </Navbar>
        </header>

        <div className="ShellNavigation_body">{body}</div>
      </>
    );
  }
}

ShellNavigation.propTypes = {
  body: PropTypes.element.isRequired,
  links: PropTypes.array,
};

export default ShellNavigation;
