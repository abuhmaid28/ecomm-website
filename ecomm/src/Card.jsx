import { Button, Card as BootstrapCard } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomCard = ({ getImageUrl, item, handleDelete }) => {
  return (
    <BootstrapCard className="text-white bg-dark shadow-lg">
      {item.image ? (
        <BootstrapCard.Img
          variant="top"
          src={getImageUrl(item.image)}
          alt={item.name}
          style={{
            maxHeight: "250px",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/250";
          }}
        />
      ) : (
        <BootstrapCard.Body>No Image</BootstrapCard.Body>
      )}
      <BootstrapCard.Body>
        <BootstrapCard.Title className="fw-bold">
          {item.name}
        </BootstrapCard.Title>
        <BootstrapCard.Text>{item.description}</BootstrapCard.Text>
        <BootstrapCard.Text className="fw-bold">
          In Stock: {item.quantity} Items
        </BootstrapCard.Text>
        <BootstrapCard.Text className="fw-bold">
          Price: ${item.price}
        </BootstrapCard.Text>
      </BootstrapCard.Body>
      <BootstrapCard.Footer className="d-flex justify-content-between">
        <Button onClick={() => handleDelete(item.id)} variant="danger">
          Delete
        </Button>
        <Link to={`/update/${item.id}`} className="btn btn-warning">
          Update
        </Link>
      </BootstrapCard.Footer>
    </BootstrapCard>
  );
};

export default CustomCard;
