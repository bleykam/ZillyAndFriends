import "./Services.scss";
import { Link } from "react-router-dom";
import arlo from '../../assets/ella.png';
import brownie from '../../assets/leah.png';
import neshama from '../../assets/neshama.png';
import lulu from "../../assets/lulu3.png";
import Toast from "../../assets/toastieandZIll.jpg";
import { Stack, CardGroup, Card, Navbar, Nav, Form, FormControl, ListGroup, Image, Button, Container, Row, Col, Carousel, CardImgOverlay } from 'react-bootstrap';


const Boarding = () => {

  return (
    <Container className="text-center" >
      <Image width={"100%"} height={400} src={Toast} className="mt-5 object-fit-cover" style={{ objectPosition: "50% 70%" }} alt="two pups" />

      <Row className="mt-5 mb-3 d-flex flex-column flex-md-row justify-content-md-between">
        <Col xs={12} md={5} className="p-0 mb-3">
          <Card>
            <Card.Header className="fs-4 bg-primary text-light"> Amenities for Pup Include:</Card.Header>
            <ListGroup className="border-0">
              <ListGroup.Item >Spacious Apartment: Plenty of room for your pet to play and relax.</ListGroup.Item>
              <ListGroup.Item >Comfortable Furniture: Pets are welcome to lounge on the furniture..</ListGroup.Item>
              <ListGroup.Item >Dog Parks: Access to two dog parks, one adjacent to the building and another just across the street.</ListGroup.Item>
              <ListGroup.Item >Flexible Sleeping Arrangements: Pets can sleep wherever they feel most comfortable.</ListGroup.Item>
              <ListGroup.Item >Free Roaming: Pets are free to roam around the apartment  </ListGroup.Item>
              <ListGroup.Item >Optional Crating: Crates can be done at the owner's request, owners must supply the crate.</ListGroup.Item>
              <ListGroup.Item >Pictures and updates via text or email (if requested)</ListGroup.Item>

            </ListGroup>
            <Card.Footer>
              <Card.Text>These amenities ensure a comfortable and enjoyable stay for your pet, mimicking a homely atmosphere.</Card.Text>
            </Card.Footer>
          </Card>
        </Col>
     
              <Col xs={12} md={5} className="p-0 m-0">
          <Card>
            <Card.Header className="fs-4 bg-primary text-light"> Typical Schedule:</Card.Header>
            <ListGroup className="border-0">
              <ListGroup.Item >Morning Potty Break between and morning feeding 7am-8am.</ListGroup.Item>
              <ListGroup.Item >Mid-day Break between Noon-1pm.</ListGroup.Item>
              <ListGroup.Item >Evening Break between and dinner 5:00 pm-6:00 pm.</ListGroup.Item>
              <ListGroup.Item >Bedtime Break between 9:30 pm-11:00 pm.</ListGroup.Item>
              <ListGroup.Item >Break times can be customized to fit your dogs schedule.</ListGroup.Item>
              <ListGroup.Item > Morning and Bedtime breaks are usually a quick reListGroup.Itemef walk so everyone has time to eat and go potty. </ListGroup.Item>
              <ListGroup.Item >The afternoon/evening breaks typically involve a long walk, trip to the park or just some outside time to
                sniff things or sunbathe depending on your dogs preferences. </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col className="p-0 m-0">
          <Card>
          <Card.Header className="fs-4 bg-primary text-light">Feeding and Medication</Card.Header>
          <ListGroup className="border-0">
            <ListGroup.Item >Feeding and Medication</ListGroup.Item>
              <ListGroup.Item >Pets are fed as directed.</ListGroup.Item>
              <ListGroup.Item >Oral Medication Administration if required.</ListGroup.Item>
              <ListGroup.Item >All Food and medications needed for
                boarding and daycare must be provided by the owner.</ListGroup.Item>
              <ListGroup.Item > Owner must provide written feeding and medication instructions.</ListGroup.Item>
            </ListGroup>
          </Card>
          </Col>
      </Row>

      <Row className="mb-5">
        <Col className="p-0 m-0">
        <Card  className="">
          <Card.Header className="fs-4 bg-primary text-light text-center">Rates</Card.Header>

          <Row className="d-flex flex-md-row flex-column">
            <Col >
              <ListGroup >
                <ListGroup.Item className="border-0 fw-semibold border-bottom text-center">Daily Rates</ListGroup.Item>
                <ListGroup.Item className="border-0 border-bottom text-center"> $65 for 24 hours</ListGroup.Item>
                <ListGroup.Item className="border-0 text-center">Multiple dog families: $50 for each additional dog</ListGroup.Item>

              </ListGroup>
            </Col>
            <Col >
              <ListGroup className="border-0">
                <ListGroup.Item className="border-0 border-bottom text-center fw-semibold">Holiday Rates</ListGroup.Item>
                <ListGroup.Item className="border-0 text-center border-bottom">$85 up to 4 hours</ListGroup.Item>
                <ListGroup.Item className="border-0 text-center">Multiple dog families: $60 for each additional dog</ListGroup.Item>
              </ListGroup>

            </Col>
          </Row>
          
            <Card.Text className=" border-top border-2 bg-light border-dark text-center fw-semibold p-2 m-0"> After 24 hours daycare rates will apply.  After 36 hours boarding rates will apply.</Card.Text>
          <Card.Footer className="d-flex justify-content-center align-items-center bg-light fw-semibold">
            
              <div className="border-0 fw-semibold me-2">Holidays:</div>
              <div>New Year's Day, Memorial Day, 4th of July, Labor Day, Thanksgiving, Christmas</div>
          </Card.Footer>
        </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default Boarding;