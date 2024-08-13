import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMembersCrud } from "../context/MembersCrudContext";
import user from "../images/user1.png";

const AddMember = () => {
  // states
  const [jobTitle, setJobTitle] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(user);

  // variables
  // calling functin from context Api
  const { addMemberHandler } = useMembersCrud();
  const navigate = useNavigate();

  // file input function
  const HandleChange = (e) => {
    const data = new FileReader();
    const file = e.target.files[0];
    data.addEventListener("loadend", () => {
      setImage(data.result);
    });
    data.readAsDataURL(file);
  };
  //

  // submit function
  const add = (e) => {
    // prevents refresh
    e.preventDefault();
    // check if fields are filled
    if (name === "" || jobTitle === "") {
      alert("All the fields are required!");
      return;
    }

    // checks if image is set
    if (image === user) {
      alert("Please set your profile picture!");
      return;
    }

    // sets the
    addMemberHandler({ name, jobTitle, image });

    // clear form
    setJobTitle("");
    setName("");
    setImage([]);

    // redirect
    navigate("/");
  };

  // component template
  return (
    <div className="ui main">
      {/* form heading */}
      <h2>Add Member</h2>

      {/* back button */}
      <Link to={"/"}>
        <button className="ui button blue">Back</button>
      </Link>

      {/* form  */}
      <form className="ui form" onSubmit={add}>
        <div className="field">
          {/* image input */}
          {/* display image on form */}
          <div className="image-circle">
            {image && (
              <img
                src={image}
                alt="Profile Picture"
                className="ui medium centered circular image"
              />
            )}
          </div>

          {/* file input label */}
          <label htmlFor="fileInput" className="custom-file-input">
            {image === user ? "add image" : "change image"}
          </label>

          {/* file input */}
          <input
            className="UploadImage"
            id="fileInput"
            name="file"
            type="file"
            accept="image/*"
            onChange={HandleChange}
          />
		  
          {/*  */}
          {/* name input  */}
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name...."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* jobTitle input */}
        <div className="field">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Enter Job Title...."
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        {/* submit button */}
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
};

export default AddMember;
