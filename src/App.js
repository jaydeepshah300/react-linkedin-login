import "./App.css";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import React, { Component, useState, useEffect } from "react";

import Alert from "react-s-alert";
import ProfileCard from "./components/ProfileCard";
import _ from "lodash";

/*class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      email: null,
      profileURL: null,
      pictureURL: null,
    };
  }

  componentDidMount() {
    window.addEventListener("message", this.handlePostMessage);
  }

  handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      this.updateProfile(event.data.profile);
      Alert.success(
        `Login successful: ${event.data.profile.localizedFirstName}`,
        { position: "top" }
      );
    }
  };

  updateProfile = (profile) => {
    console.log(profile);
    this.setState({
      isAuthorized: true,
      firstName: _.get(profile, "localizedFirstName", ""),
      lastName: _.get(profile, "localizedLastName", ""),
      email: _.get(profile, "email", ""),
      profileURL: `https://www.linkedin.com/in/${_.get(
        profile,
        "vanityName",
        ""
      )}`,
      pictureURL: _.get(
        _.last(_.get(profile, "profilePicture.displayImage~.elements", "")),
        "identifiers[0].identifier",
        ""
      ),
    });
  };

  requestProfile = () => {
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=r_liteprofile,r_emailaddress&state=123456&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Linkedin Login</h1>
          <Alert />
        </header>
        <div className="App-body">
          <button className="social-login" onClick={this.requestProfile}>
            Linkedin Login
          </button>
          {this.state.isAuthorized && (
            <ProfileCard
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              email={this.state.email}
              profileURL={this.state.profileURL}
              pictureURL={this.state.pictureURL}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;*/

const App = () => {
  const [initialState, setInitialState] = useState({
    isAuthorized: false,
    firstName: null,
    lastName: null,
    email: null,
    profileURL: null,
    pictureURL: null,
  });

  useEffect(() => {
    window.addEventListener("message", handlePostMessage);

    // return () => {
    //   window.removeEventListener("message", handlePostMessage);
    // };
  });

  // function for handle login message
  const handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      updateProfile(event.data.profile);
      Alert.success(
        `Login successful: ${event.data.profile.localizedFirstName}`,
        { position: "top" }
      );
    }
  };

  // for handle update login user information
  const updateProfile = (profile) => {
    console.log(profile);
    setInitialState({
      isAuthorized: true,
      firstName: _.get(profile, "localizedFirstName", ""),
      lastName: _.get(profile, "localizedLastName", ""),
      email: _.get(profile, "emailAddress", ""),
      profileURL: `https://www.linkedin.com/in/${_.get(
        profile,
        "vanityName",
        ""
      )}`,
      pictureURL: _.get(
        _.last(_.get(profile, "profilePicture.displayImage~.elements", "")),
        "identifiers[0].identifier",
        ""
      ),
    });
  };

  const logoutUser = () => {
    setInitialState({
      isAuthorized: false,
      firstName: null,
      lastName: null,
      email: null,
      profileURL: null,
      pictureURL: null,
    });
  };

  //function for open linked authentication popup
  const requestProfile = () => {
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=r_liteprofile,r_emailaddress&state=123456&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">React Linkedin Login</h1>
        <Alert />
      </header>
      <div className="App-body">
        {initialState.isAuthorized ? (
          <button className="social-login" onClick={() => logoutUser()}>
            Logout
          </button>
        ) : (
          <button className="social-login" onClick={(e) => requestProfile(e)}>
            Linkedin Login
          </button>
        )}
        {initialState.isAuthorized && (
          <ProfileCard
            firstName={initialState.firstName}
            lastName={initialState.lastName}
            email={initialState.email}
            profileURL={initialState.profileURL}
            pictureURL={initialState.pictureURL}
          />
        )}
      </div>
    </div>
  );
};

export default App;
