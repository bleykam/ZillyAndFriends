import "./Reviews.scss";
import { useState, useEffect} from "react";
import StarRating, { StarIcon } from "../../components/StarRating/StarRating";
import pawprint from "../../assets/paw-print.svg";
import StarsAmt, { Stars } from "../../components/StarRating/Stars";
import { supabase, convertDate } from "../../utils";
import { useNavigate} from "react-router-dom";
import { InputField, SelectField, TextAreaField } from "../../components/formFields/formFields";
import { Container, Row, Col, Button, Modal, Form, Card, Image, Stack, InputGroup, FormControl, Pagination} from 'react-bootstrap';


export default function Reviews() {
  const [error, setError]=useState("");
  const [reviews, setReviews] = useState("");
  const navigate = useNavigate()
  const [selectedRating, setSelectedRating] = useState(0);
  const [show, setShow] = React.useState(false);
  const [values, setValues] = useState({
    fullName: "",
    repeatCustomer: "",
    body: "",
  })
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  const handleRatingChange = (newRating) => {
    setSelectedRating(newRating);
  };




  useEffect(() => {
    getReviews();
  }, []);

  async function getReviews() {
    const { data } = await supabase.from("Reviews").select();
    setReviews(data);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

 
console.log("values",values, "selectedRating",selectedRating)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log()
    if (!selectedRating || !values.fullName || !values.body || values.repeatCustomer === "") {
      alert(`Missing required fields. Please fill in all the fields ${values.repeatCustomer}, ${values.repeatCustomer}, ${values.body}  ${values.selectedRating}, ${values.fullName}.`);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("Reviews")
        .insert([
          {
            stars: selectedRating,
            name: values.fullName,
            body: values.body,
            repeat: values.repeatCustomer,
            via: "zilllyandfriends.com"
          }
        ]);

      if (error) {
        console.error("Error inserting review:", error.message);
        return;
      }

      alert("Review submitted successfully");
      setShow(false);
      setValues({
        fullName: "",
        repeatCustomer: "",
        body: "",
        selectedRating: 0
      });
      getReviews();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };


  if (!reviews) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <div className="p-2 p-sm-3 forum-content show">
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-sm-start justify-content-center align-items-center m-1">
            <h1>Reviews</h1>
          </Col>
          <Col className="d-flex align-items-center  justify-content-end m-2">
            <Button className="btn text-white" onClick={handleShow}>
              Leave A Review
            </Button>
          </Col>
        </Row>

        {reviews.map((review, index) => (
          <Card className="mb-2" key={index}>
            <Card.Body>
              <Row className="justify-content-between ">
                <Col className="d-flex align-items-center">
                  <Image
                    src={pawprint}
                    className="mr-3 rounded-circle align-self-center"
                    width={50}
                    alt="User"
                  />
                  <div className="p-2 mr-3">
                    <div className="pb-2">{review.name}</div>
                    <div>{convertDate(review.created_at)}</div>
                  </div>
                </Col>

                <Col className="d-flex align-items-center">
                  <Stack className="d-flex align-items-end" gap={1}>
                    <div>
                      <StarsAmt totalStars={5} />
                    </div>
                    <div className="text-badge  ">
                      {review.repeat ? "Repeat Client" : ""}
                    </div>
                  </Stack>
                </Col>
              </Row>
              <Row>
                <Col className="p-2">
                  <div>
                    <p>{review.body}</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
        <Pagination className="pagination-sm pagination-circle justify-content-center mb-0">
          <Pagination.Prev disabled>
            <i className="material-icons">chevron_left</i>
          </Pagination.Prev>
          <Pagination.Item>1</Pagination.Item>
          <Pagination.Item active>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>
          <Pagination.Next>
            <i className="material-icons">chevron_right</i>
          </Pagination.Next>
        </Pagination>
      </div>

      {/* New Thread Modal */}
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Write A Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="star-rating d-flex justify-content-center align-items-center">
              <StarRating onRatingChange={handleRatingChange} />
            </div>

            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Name"
                value={values.fullName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Review</Form.Label>
              <Form.Control
                id="body"
                as="textarea"
                placeholder="Leave a review"
                name="body"
                value={values.body}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Repeat Customer</Form.Label>
              <Form.Select
               id="repeatCustomer"
                aria-label="Default select example"
                name="repeatCustomer"
                value={values.repeatCustomer}
                onChange={handleChange}
                required
              >
                <option value="">repeat customer</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Form.Select> 
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

