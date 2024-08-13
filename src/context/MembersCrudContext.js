import { createContext, useContext, useState } from "react";
import api from "../api/members";
// import { uuid } from "uuidv4";
import { v4 as uuidv4 } from "uuid";

// context
const membersCrudContext = createContext();

// context provider
export function MembersCrudContextProvider({ children }) {
  // Members state
  const [members, setMembers] = useState([]);
  // member state
  const [member, setMember] = useState([]);
  // text for search state
  const [text, setText] = useState("");
  // search result state
  const [searchResults, setSearchResults] = useState([]);

  //RetrieveMembers
  const retrieveMembers = async () => {
    // get data from axios and save in response
    const response = await api.get("/members");
    // if there is respone exists set cantacts to response
    if (response.data) {
      setMembers(response.data);
    }
  };

  // add Member function
  const addMemberHandler = async (member) => {
    // set id to submitted member and add to list
    const request = {
      id: uuidv4(),
      ...member,
    };
    // send data to database
    const response = await api.post("/members", request);
    // add to member
    setMembers([...members, response.data]);
  };

  // edit function
  const updateMemberHandler = async (member) => {
    // create new response using data from db
    const response = await api.put(`/members/${member.id}`, member);
    // grab id from response
    const { id } = response.data;
    // set member using data from db
    setMembers(
      // loop thru member list searching using id
      members.map((member) => {
        return member.id === id ? { ...response.data } : member;
      })
    );
  };

  // delete function
  const removeMemberHandler = async (id) => {
    // fetch member using id
    await api.delete(`/members/${id}`);
    // create new list without deleted id
    const newMemberList = members.filter((member) => {
      // compare ids
      return member.id !== id;
    });

    // set new list to DB
    setMembers(newMemberList);
  };

  // search function
  const searchHandler = (searchTerm) => {
    // set text to search item
    setText(searchTerm);
    // if search term is not empty create new list with search text
    if (searchTerm !== "") {
      // new search list
      const newMemberList = members.filter((member) => {
        console.log(member);
        // return list with search word
        return Object.values(member)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      // set results with new list
      setSearchResults(newMemberList);
    } else {
      // otherwise set results to member list
      setSearchResults(members);
    }
  };

  // context children
  const value = {
    //states
    member,
    members,
    text,
    searchResults,

    //functions
    retrieveMembers,
    addMemberHandler,
    removeMemberHandler,
    updateMemberHandler,
    searchHandler,
  };

  return (
    <membersCrudContext.Provider value={value}>
      {children}
    </membersCrudContext.Provider>
  );
}

export function useMembersCrud() {
  return useContext(membersCrudContext);
}
