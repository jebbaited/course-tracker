import React, { useState } from "react";

import Tags from "./Tags";

export default function CourseForm({ courseAdded }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState([]);
  const [count, setCount] = useState(0);

  const resetForm = () => {
    setName("");
    setLink("");
    setCount(count + 1);
  };

  const submitCourse = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/submit`, {
        method: "POST",
        body: JSON.stringify({ name, link, tags }),
      });
      resetForm();
      courseAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <div className="card-header">Add a New Course</div>
      <div className="card-body">
        <form className="" onSubmit={submitCourse}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link</label>
            <input
              type="text"
              name="link"
              className="form-control"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="form-group">
            <p>Tags</p>
            <Tags tagsUpdated={setTags} tagsKey={count} />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
