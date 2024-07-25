import "./AboutUs.scss";
import collage from "../../assets/collage2.png";

import { Card, Container, Row, Col, } from 'react-bootstrap';

export default function AboutUs() {


  return (

    <Container  style={{ marginTop: "10vh"  }}>
      <Card xs={12} md={6} className="m-3 bg-secondary mx-auto" style={{maxWidth: 800}}>
      <Row className="g-0 d-flex flex-column">
        <Card.Img src={collage}height="400" alt="Card image" />
        <Col>
        <Card.Body className="bg-light text-center text-dark">
            <Card.Text >
            Hello there! I'm Brittany, a dog lover who owns a friendly
              Chihuahua mix named Godzilla. If you're in need of a trustworthy
              dog sitter, you better paws and check us out!
            </Card.Text>
            <Card.Text >
            Leaving your pet in the care of someone else can be a
              stressful experience. At Zilly and Friends, we know how you feel
              and that's why we prioritize the safety and comfort of your pet
              above all else. We offer personalized services that cater to your
              pet's unique needs, ensuring that they receive the attention they
              deserve. While providing them with a home away from home experience.
            </Card.Text>
            <Card.Text >
           
              At Zilly and Friends, know how much you miss your furry friend and
              understand how important it is to keep you informed about your
              pet's well-being. which is why I provide daily updates and
              precious pics to keep you in the know.
            </Card.Text>

            <Card.Text >
              Whether you need doggy daycare or overnight boarding, we would be
              happy to provide your pet with a safe and comfortable haven.
              Contact us today to learn more about our services and book your
              pet's stay!
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>

    </Container>
  

  );
}
