import { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Ensure this path is correct

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="border-bottom border-warning"
    >
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/products">
                  Products
                </Nav.Link>
                <Nav.Link as={Link} to="/add">
                  Add Product
                </Nav.Link>
                <Nav.Link as={Link} to="/" onClick={logout}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>

          {isLoggedIn && (
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-warning" type="submit">
                Search
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
