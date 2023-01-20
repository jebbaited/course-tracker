import React, { useState } from 'react';
import Tags from './Tags';

const SERVERLESS_FN_URL =
  'https://courses.my-worker-testing.workers.dev/submit';

export default function CourseForm({ courseAdded }) {
  const [tags, setTags] = useState([]);

  return (
    <div className="card">
      <div className="card-header">Add a New Course</div>
      <div className="card-body">
        <form className="" action={SERVERLESS_FN_URL} method="POST">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link</label>
            <input type="text" name="link" id="link" className="form-control" />
          </div>
          <div className="form-group">
            <p>Tags</p>
            <Tags tagsUpdated={setTags} />
            <input
              name="tags"
              value={tags.join(', ')}
              className="hidden-button"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
