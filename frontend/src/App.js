import { useEffect, useState } from "react";

import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import "./App.css";

function App() {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/courses`,
        // `https://courses.my-worker-testing.workers.dev/api/courses`,
        {
          method: "GET",
        }
      );
      const courses = await res.json();
      setCourses(courses.records);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-5 text-center">Course Tracker</h1>
      <CourseForm courseAdded={loadCourses} />
      <CourseList courses={courses} refreshCourses={loadCourses} />
    </div>
  );
}

export default App;
