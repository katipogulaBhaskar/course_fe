import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseForm = () => {
  const [course, setCourse] = useState({ name: "" });
  const [courses, setCourses] = useState([]);
  const [showCourses, setShowCourses] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input field changes for both adding and editing courses
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // Handle the form submission to add a new course or update an existing one
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editCourse) {
        // Update existing course
        const response = await axios.put(
          `http://localhost:5000/api/update-course/${editCourse._id}`,
          course
        );
        if (response.data.message === "Book updated successfully") {
          alert("Course updated successfully!");
          setEditCourse(null);
        } else {
          alert(response.data.message || "Failed to update course. Try again.");
        }
      } else {
        // Add new course
        const response = await axios.post(
          "http://localhost:5000/api/enroll-course",
          course
        );
        if (response.data.message === "Book added successfully") {
          alert("Course added successfully!");
        } else {
          alert(response.data.message || "Failed to add course. Try again.");
        }
      }

      // Reset the course form and fetch all courses
      setCourse({ name: "" });
      fetchAllCourses();
    } catch (err) {
      console.error(err);
      alert("Error adding or updating course.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all courses
  const fetchAllCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/enrolled-courses");
      setCourses(response.data);
      setShowCourses(true);
    } catch (err) {
      console.error(err);
      alert("Error fetching courses.");
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a course
  const handleEdit = (course) => {
    setCourse({ name: course.name });
    setEditCourse(course);
  };

  // Handle deleting a course
  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setLoading(true);
      try {
        const response = await axios.delete(`http://localhost:5000/api/delete-course/${courseId}`);
        if (response.data.message === "Book deleted successfully") {
          alert("Course deleted successfully!");
          fetchAllCourses();
        } else {
          alert(response.data.message || "Failed to delete course. Try again.");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting course.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("You have logged out successfully.");
    navigate("/login");
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editCourse ? "Edit Course" : "Enroll in a Course"}</h2>
        <input
          name="name"
          placeholder="Course Name"
          value={course.name}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : editCourse ? "Update Course" : "Enroll"}
        </button>
      </form>

      {/* Button to fetch all courses */}
      <button onClick={fetchAllCourses} disabled={loading}>
        {loading ? "Loading..." : "All Courses"}
      </button>

      {/* Display all courses */}
      {showCourses && (
        <div>
          <h3>Enrolled Courses</h3>
          <ol>
            {courses.length > 0 ? (
              courses.map((course) => (
                <li key={course._id}>
                  <strong>Course Name:</strong> {course.name} <br />
                  <button onClick={() => handleEdit(course)}>Edit</button>
                  <button onClick={() => handleDelete(course._id)}>Delete</button>
                </li>
              ))
            ) : (
              <p>No courses available.</p>
            )}
          </ol>
        </div>
      )}

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default CourseForm;
