import React from "react";
import { Link, useLocation } from "react-router-dom";
import user from "../images/user.jpg";

const MemberDetail = () => {
  // use location hook
  const location = useLocation();
  // set state
  const { name, jobTitle, image } = location.state.member;

  return (
    <div className="main">
      <div className="ui card centered">
        {/* image */}
        <div className="image rounded">
          <img src={image} alt="user" />
        </div>
        {/* card content */}
        <div className="content centered">
          <div className="header">{name}</div>
          <div className="description">{jobTitle}</div>
        </div>
      </div>
      {/* back to member list button  */}
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">Back to Member List</button>
        </Link>
      </div>
    </div>
  );
};

export default MemberDetail;
