import React from "react";

import Course from "./Course";

const CourseList = ({ courses, refreshCourses }) => {
  const purchasedCourse = (isPurchased) =>
    courses
      .filter((course) => {
        if (isPurchased) return course.fields.Purchased;
        return !course.fields.Purchased;
      })
      .map((course) => (
        <Course
          course={course}
          key={course.id}
          refreshCourses={refreshCourses}
        />
      ));

  return (
    <div>
      <h2 className="mt-5 mb-3">To Learn</h2>
      <div className="list-group">{purchasedCourse(false)}</div>
      <h2 className="mt-5 mb-3">Already Purchased</h2>
      {purchasedCourse(true)}
    </div>
  );
};

export default CourseList;
