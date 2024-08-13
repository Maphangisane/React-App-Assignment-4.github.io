import React from "react";
import { Link } from "react-router-dom";
import { useMembersCrud } from "../context/MembersCrudContext";

const MemberCard = (props) => {
  // states
  const { id, name, jobTitle, image } = props.member;

  // call delete from context
  const { removeMemberHandler } = useMembersCrud();

  // delete function
  const deleteMember = (id) => {
    removeMemberHandler(id);
  };

  return (
    <div className="item">
      {/* image */}
      <img className="ui avatar tiny image" src={image} alt="user" />

      {/* content */}
      <div className="content">
        <Link to={`/member/${id}`} state={{ member: props.member }}>
          <div className="header">{name}</div>
          <div className="description">{jobTitle}</div>
        </Link>
      </div>

      {/* delete icon */}
      <i
        className="trash alternate outline icon"
        style={{ color: "blue", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => deleteMember(id)}
      ></i>

      {/* edit icon */}
      <Link to={`/edit`} state={{ member: props.member }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default MemberCard;
