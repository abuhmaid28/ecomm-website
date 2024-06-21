import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const baseUrl = "http://localhost:8000/";

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        const { name, description, price, quantity } = response.data;
        setFormData({
          name,
          description,
          price,
          quantity,
        });
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProductData();
  }, [id, baseUrl]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/products/${id}`, formData);
      setErrorMessage("Product updated successfully.");
    } catch (error) {
      console.error("Failed to update product:", error);
      setErrorMessage("Failed to update product.");
    }
  };

  return (
    <div className="bg-dark">
      <Container className="bg-dark py-5">
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <Card bg="dark" text="white" className="shadow-lg">
              <Card.Body>
                <h2 className="text-center mb-4">Update Product</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter name"
                      className="bg-dark text-white shadow-lg"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Description</FormLabel>
                    <FormControl
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter description"
                      className="bg-dark text-white shadow-lg"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Price</FormLabel>
                    <FormControl
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      type="number"
                      placeholder="Enter price"
                      className="bg-dark text-white shadow-lg"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      type="number"
                      placeholder="Enter quantity"
                      className="bg-dark text-white shadow-lg"
                      required
                    />
                  </FormGroup>

                  <Button
                    variant="warning"
                    type="submit"
                    className="w-100 mt-3"
                  >
                    Update Product
                  </Button>
                  {errorMessage && (
                    <p
                      className={`${
                        errorMessage === "Product updated successfully."
                          ? "text-success"
                          : "text-danger"
                      } mt-3 fw-bold`}
                    >
                      {errorMessage}
                    </p>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateProduct;
