import React from 'react';

const Course = ({ course, refreshCourses }) => {
  const fields = course.fields;

  const markCoursePurchased = async () => {
    try {
      await fetch(
        `https://courses.my-worker-testing.workers.dev/api/courses/${course.id}`,
        {
          method: 'PUT',
          // body: JSON.stringify({ ...course.fields, purchased: true }),
          body: course,
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
        `https://courses.my-worker-testing.workers.dev/api/courses/${course.id}`,
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
      <a href={fields.Link}>
        <h4 className="list-group-item-heading">{fields.Name}</h4>
      </a>
      <p>
        Tags:{' '}
        {fields.Tags &&
          fields.Tags.split(', ').map((tag, index) => (
            <span className="badge badge-primary mr-2" key={index}>
              {tag}
            </span>
          ))}
      </p>
      {!course.purchased && (
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
