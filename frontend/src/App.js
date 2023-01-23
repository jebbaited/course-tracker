import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    try {
      const res = await fetch(
        'https://courses.my-worker-testing.workers.dev/api/courses'
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
      <CourseForm />
      <CourseList courses={courses} refreshCourses={loadCourses} />
    </div>
  );
}

export default App;
