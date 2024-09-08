import { useState } from "react";
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
    image: null,
    description: "",
    price: "",
    quantity: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = ({ target: { name, value, files } }) => {
    if (name === "image") {
      const selectedImage = files[0];
      setFormData((prevData) => ({ ...prevData, [name]: selectedImage }));

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    Object.keys(formData).forEach((key) => {
      productData.append(key, formData[key]);
    });

    try {
      await axios.put(`http://localhost:8000/api/products/${id}`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setErrorMessage("Product added successfully.");
      setFormData({
        name: "",
        image: null,
        description: "",
        price: "",
        quantity: "",
      });
      setImagePreview(null);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="bg-dark">
      <Container className="bg-dark py-5">
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <Card bg="dark" text="white" className="shadow-lg">
              <Card.Body>
                <h2 className="text-center mb-4">Add New Product</h2>
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
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Image</FormLabel>
                    <FormControl
                      name="image"
                      onChange={handleChange}
                      type="file"
                      className="bg-dark text-white shadow-lg"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-fluid mt-2"
                        style={{
                          maxHeight: "200px",
                          objectFit: "cover",
                        }}
                      />
                    )}
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
                    />
                  </FormGroup>

                  <Button
                    variant="warning"
                    type="submit"
                    className="w-100 mt-3"
                  >
                    Add Product
                  </Button>
                  {errorMessage && (
                    <p
                      className={`${
                        errorMessage == "Product added successfully."
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
