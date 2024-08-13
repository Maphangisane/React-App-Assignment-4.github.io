import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useMembersCrud } from "../context/MembersCrudContext";

const EditMember = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  //  getting data
  const { id, name, jobTitle, image } = location.state.member;

  // states - sets default values
  const [newJobTitle, setNewJobTitle] = useState(jobTitle);
  const [newName, setNewName] = useState(name);
  const [newImage, setNewImage] = useState(image);

  // calling functin from context Api
  const { updateMemberHandler } = useMembersCrud();

  // file upload function for edit
  const HandleUpdateChange = (e) => {
    const data = new FileReader();
    const file = e.target.files[0];
    data.addEventListener("loadend", () => {
      setNewImage(data.result);
    });
    data.readAsDataURL(file);
  };

  // update function onsubmit
  const update = (e) => {
    // prevent refresh
    e.preventDefault();

    // check if fields are filled
    if (newName === "" || newJobTitle === "") {
      alert("ALl the fields are required!");
      return;
    }

    // checks if image is set
    if (!newImage) {
      alert("Please set your profile picture!");
      return;
    }

    // call handler to set new values
    updateMemberHandler({
      id,
      name: newName,
      jobTitle: newJobTitle,
      image: newImage,
    });

    // clear form
    setNewName("");
    setNewJobTitle("");
    setNewImage([]);

    // redirect
    navigate("/");
  };

  return (
    <div className="ui main">
      {/* heading */}
      <h2>Edit Member</h2>

      {/* back button */}
      <Link to={"/"}>
        <button className="ui button blue">Back</button>
      </Link>

      {/* form */}
      <form className="ui form" onSubmit={update}>
        <div className="field">
          {/* display image on form */}
          <div className="image-circle">
            {newImage && (
              <img
                src={newImage}
                alt="Profile Picture"
                className="ui medium centered circular image"
              />
            )}
          </div>

          {/* file input label */}
          <label htmlFor="fileInput" className="custom-file-input">
            {newImage ? "old" : "new"}
          </label>

          {/* file input */}
          <input
            className="UploadImage"
            id="fileInput"
            name="file"
            type="file"
            accept="image/*"
            onChange={HandleUpdateChange}
          />

          {/* name field */}
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <div className="field">
          {/* JobTitle field */}
          <label>Job Title</label>
          <input
            type="text"
            name="Job Title"
            placeholder="jobTitle"
            value={newJobTitle}
            onChange={(e) => setNewJobTitle(e.target.value)}
          />
        </div>

        {/* edit button */}
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditMember;
