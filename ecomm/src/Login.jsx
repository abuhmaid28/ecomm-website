import { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      const { token } = response.data;
      login(token);
      navigate("/products");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <Form
        className="p-5 rounded shadow-lg bg-dark text-white border-warning border d-flex flex-column gap-3"
        onSubmit={handleLogin}
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {error && <p className="text-danger mb-3">{error}</p>}

        <div className="d-grid">
          <Button variant="warning" type="submit" className="btn-lg">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
