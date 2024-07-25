import './Contact.scss';
import { apiKey } from "../../utils";
import { Link } from "react-router-dom";
import insta from "../../assets/instagram-1-svgrepo-com.svg"
import { CardGroup, Card, Navbar, Nav, Form, FormControl,ListGroup, Image, Button, Ratio, Container, Row, Col, Carousel, CardImgOverlay } from 'react-bootstrap';


const Contact = () => {

  return (
    <Container className="mt-4" >
      <Card className="p-2">
      <Card.Header className="fs-4">Contact and Location</Card.Header>
        <Row xs={1} md={2}>
          <Col className="mt-2">
          {/* biome-ignore lint/a11y/useIframeTitle: <explanation> */}
          <iframe 
           width='100%'
            height="350"
            loading="lazy"
            aria-label="Zilly and Friends location on map"
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=Zilly+Friends,NewYork+NY`}
          />
          </Col>
          <Col className=" col-md d-flex flex-column justify-content-center align-items-center pt-2">
            <Card.Text >650 West 42nd Street</Card.Text>
            <Card.Text >New York, NY 10036</Card.Text>
            <Card.Text><a href="tel:727-313-0062">727-313-0062</a></Card.Text>
            <Link to="mailto:info@zillyandfriends.com" ><div>info@zillyandfriends.com</div></Link>
            <div><a  href="https://www.instagram.com/godzillaspetsitting/" target="_blank" rel="noopener noreferrer"><img className="contact__image" src={insta} alt="instagram icon" ></img></a></div>
          </Col>
          </Row>
     </Card>
      </Container>
  );
}

export default Contact;

