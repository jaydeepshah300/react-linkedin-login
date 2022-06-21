import React from "react";
import "../App.css";

const ProfileCard = ({
  pictureURL,
  profileURL,
  firstName,
  lastName,
  email,
  headline,
}) => {
  return (
    <div className="profile">
      <div className="profile-container">
        <img src={pictureURL} alt="" height="200px" width="200px" />
        <h1>
          <a href={profileURL} target="_blank" rel="noopener noreferrer">
            {firstName} {lastName}
          </a>
        </h1>
        <h2>{headline}</h2>
        <h3>Email: {email}</h3>
      </div>
    </div>
  );
};

export default ProfileCard;
