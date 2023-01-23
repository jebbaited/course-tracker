import React from 'react';

const Course = ({ course, refreshCourses }) => {
  const WORKER_URL = 'https://courses.my-worker-testing.workers.dev/api/courses'
  const courseFields = course.fields;

  const markCoursePurchased = async () => {
    try {
      await fetch(
        `${WORKER_URL}/${course.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({fields: { ...course.fields, Purchased: 'true' }}),
        }
      );
      refreshCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCourse = async () => {
    try {
      await fetch(
        `${WORKER_URL}/${course.id}`,
        {
          method: 'DELETE',
        }
      );
      refreshCourses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="list-group-item">
      <a href={courseFields.Link}>
        <h4 className="list-group-item-heading">{courseFields.Name}</h4>
      </a>
      <p>
        Tags:{' '}
        {courseFields.Tags &&
          courseFields.Tags.split(', ').map((tag, index) => (
            <span className="badge badge-primary mr-2" key={index}>
              {tag}
            </span>
          ))}
      </p>
      {!courseFields.Purchased && (
        <button
          className="btn btn-sm btn-primary"
          onClick={markCoursePurchased}
        >
          Purchased
        </button>
      )}
      <button className="btn btn-sm btn-danger ml-2" onClick={deleteCourse}>
        Delete
      </button>
    </div>
  );
};
export default Course;
