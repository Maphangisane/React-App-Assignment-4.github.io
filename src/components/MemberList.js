import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMembersCrud } from "../context/MembersCrudContext";
import MemberCard from "./MemberCard";

const MemberList = (props) => {
  // contexts
  const { members, retrieveMembers, searchHandler, text, searchResults } =
    useMembersCrud();

  // retrieve members using context
  useEffect(() => {
    retrieveMembers();
  }, []);

  // displays the search results
  const renderMemberList = (text.length < 1 ? members : searchResults).map(
    (member) => {
      return <MemberCard member={member} key={member.id} />;
    }
  );

  // search target value
  const onUserSearch = (e) => {
    searchHandler(e.target.value);
  };

  return (
    <div className="main">
      {/* heading with add button */}
      <h2>
        Members List
        <Link to="/add">
          <button className="ui button blue right">Add Member</button>
        </Link>
      </h2>

      {/* search input */}
      <div className="ui search">
        <div className="ui icon input">
          <input
            type="text"
            placeholder="Search Members"
            className="prompt"
            value={text}
            onChange={(e) => onUserSearch(e)}
          />
          <i className="search icon"></i>
        </div>
      </div>

      {/* List */}
      <div className="ui celled list">
        {renderMemberList.length > 0
          ? renderMemberList
          : "No Members available add a member"}
      </div>
    </div>
  );
};

export default MemberList;
