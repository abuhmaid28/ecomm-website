import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Spinner, Col, Row } from "react-bootstrap";
import Card from "./Card";
const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/250";
    const baseUrl = "http://localhost:8000/";
    return `${baseUrl}${imagePath}`;
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
    const fetchSearchResults = async (query) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/search`,
          {
            params: { query },
          }
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Error fetching search results. Please try again later.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults(query);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="bg-dark">
      <Container className="py-4">
        <h1 className="text-center text-white mb-4">
          {`
          Search Results for "${query}"
          
          `}
        </h1>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : (
          <Container>
            <Row className="row row-cols-1 row-cols-md-3 g-4">
              {results.length > 0 ? (
                results.map((item) => (
                  <Col className="d-flex" key={item.id}>
                    <Card
                      handleDelete={handleDelete}
                      getImageUrl={getImageUrl}
                      item={item}
                    />
                  </Col>
                ))
              ) : (
                <p className="text-center text-danger">No products available</p>
              )}
            </Row>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default SearchPage;
