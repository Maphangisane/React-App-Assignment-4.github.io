// packages
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MembersCrudContextProvider } from "../context/MembersCrudContext";
// components
import "./App.css";
import Header from "./Header";
import AddMember from "./AddMember";
import EditMember from "./EditMember";
import MemberList from "./MemberList";
import MemberDetail from "./MemberDetail";

function App() {
  return (
    <div className="ui container">
      <Router>
        <Header />
        <MembersCrudContextProvider>
          <Routes>
            <Route path="/" exact element={<MemberList />} />

            <Route path="/add" element={<AddMember />} />

            <Route path="/edit" element={<EditMember />} />

            <Route path="/member/:id" element={<MemberDetail />} />
          </Routes>
        </MembersCrudContextProvider>
      </Router>
    </div>
  );
}

export default App;
