import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "./Card";

const ProductsList = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/250";
    const baseUrl = "http://localhost:8000/";
    return `${baseUrl}${imagePath}`;
  };

  return (
    <div className="bg-dark py-5">
      <Container>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {data.length > 0 ? (
            data.map((item) => (
              <Col className="d-flex" key={item.id}>
                <Card
                  getImageUrl={getImageUrl}
                  item={item}
                  handleDelete={handleDelete}
                />
              </Col>
            ))
          ) : (
            <p style={{ color: "red" }} className="text-center">
              No products available
            </p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ProductsList;
