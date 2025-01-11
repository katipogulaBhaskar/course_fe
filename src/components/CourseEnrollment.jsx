import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"; // Import styled-components

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
          `https://course-be-ita7.onrender.com/api/update-course/${editCourse._id}`,
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
          "https://course-be-ita7.onrender.com/api/enroll-course",
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
      const response = await axios.get("https://course-be-ita7.onrender.com/api/enrolled-courses");
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
        const response = await axios.delete(`https://course-be-ita7.onrender.com/api/delete-course/${courseId}`);
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
    navigate("/");
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <Container>
      <Card>
        <Form onSubmit={handleSubmit}>
          <Heading>{editCourse ? "Edit Course" : "Enroll in a Course"}</Heading>
          <Input
            name="name"
            placeholder="Course Name"
            value={course.name}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : editCourse ? "Update Course" : "Enroll"}
          </Button>
        </Form>

        <Button onClick={fetchAllCourses} disabled={loading}>
          {loading ? "Loading..." : "All Courses"}
        </Button>

        {showCourses && (
          <CoursesList>
            <h3>Enrolled Courses</h3>
            <ol>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <CourseItem key={course._id}>
                    <strong>Course Name:</strong> {course.name} <br />
                    <ActionButton onClick={() => handleEdit(course)}>Edit</ActionButton>
                    <ActionButton onClick={() => handleDelete(course._id)}>Delete</ActionButton>
                  </CourseItem>
                ))
              ) : (
                <p>No courses available.</p>
              )}
            </ol>
          </CoursesList>
        )}

        <Button onClick={handleLogout}>Logout</Button>
      </Card>
    </Container>
  );
};

// Styled components for inline CSS
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
  font-family: "Poppins", sans-serif;
`;

const Card = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 1.5s ease-out;
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center; /* Center the fields horizontally */
`;

const Input = styled.input`
  width: 70%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #ff7e5f;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  padding: 10px;
  width: 70%;
  border: none;
  border-radius: 8px;
  background: #ff7e5f;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 10px rgba(255, 126, 95, 0.2);
  margin-top: 10px;

  &:hover {
    background: #feb47b;
    box-shadow: 0px 6px 12px rgba(254, 180, 123, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CoursesList = styled.div`
  margin-top: 20px;
  text-align: left;
  width: 100%;
  max-width: 600px;
`;

const CourseItem = styled.li`
  margin: 10px 0;
  font-size: 1rem;
  color: #555;
`;

const ActionButton = styled.button`
  background: #ff7e5f;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: #feb47b;
  }
`;

const fadeIn = `
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default CourseForm;
