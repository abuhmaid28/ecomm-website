import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [timerStart, setTimerStart] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register", userData);
      setErrorMessage("Account created successfully");
      setTimerStart(true);
      setTimer(5);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setTimerStart(false);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    let timerId;
    if (timer > 0 && timerStart) {
      timerId = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000); // Decrease timer every second
    }
    return () => clearTimeout(timerId); // Cleanup function to clear timer
  }, [timer, timerStart]);

  // Redirect to login page when timer reaches 0
  useEffect(() => {
    if (timer === 0 && timerStart) {
      navigate("/login"); // Redirect to login page
    }
  }, [timer, navigate, timerStart]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark ">
      <Form
        className="p-5 rounded-4 border border-warning shadow-lg bg-dark text-white"
        onSubmit={handleSubmit}
        style={{ minWidth: "400px", maxWidth: "600px", width: "80%" }}
      >
        <h2 className="text-center mb-4">Register</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={userData.name}
            onChange={handleChange}
            type="text"
            placeholder="Enter your name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={userData.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            value={userData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button
          variant="warning"
          type="submit"
          className="btn-lg"
          style={{ width: "100%" }}
        >
          Submit
        </Button>
        {errorMessage && (
          <p
            className={
              errorMessage === "Account created successfully"
                ? "text-success mt-3 fs-5"
                : "text-danger mt-3 fs-5"
            }
          >
            {errorMessage}
          </p>
        )}
        {timerStart && timer > 0 && (
          <p className="text-warning mt-3 fs-5">{`you will be redirected to login page in ${timer} seconds`}</p>
        )}
      </Form>
    </div>
  );
};

export default Register;
