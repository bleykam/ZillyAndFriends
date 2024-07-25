import "./Services.scss";
import { Link } from "react-router-dom";
import arlo from '../../assets/ella.png';
import brownie from '../../assets/leah.png';
import neshama from '../../assets/neshama.png';
import lulu from "../../assets/lulu3.png";
import headerBg from "../../assets/header-bg.svg";
import wave from "../../assets/wave-bg.svg";
import footerBg from "../../assets/footer-bg.svg";
import BannerBg from "../../assets/banner-bg.svg";
import vid from "../../assets/daycare.mp4";
import Jiggly from "../../assets/jiggly.gif"
import {Stack, CardGroup, Tabs, Table, Tab, Card, Navbar, Nav, Form, FormControl,ListGroup, Image, Button, Container, Row, Col, Carousel, CardImgOverlay, ListGroupItem } from 'react-bootstrap';
import Theo from "../../assets/TheoAndElla-resized.jpg"
import dog from '../../assets/ChloeZilly-resized.jpg';



const Daycare = () => {


  return (
    <Container className="pb-5" >

  <Image width={"100%"} height={400} src={Theo} className="mt-5 object-fit-cover" alt="two pups"/>

     <Row className="mt-5 mb-3 ">
        <Col className="p-0 mb-3">
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
            <Card.Footer className=" border-top border-2 bg-light border-dark text-center fw-semibold">
              <Card.Text>These amenities ensure a comfortable and enjoyable stay for your pet, mimicking a homely atmosphere.</Card.Text>
            </Card.Footer>
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

   
      <Row>
        <Card className="mt-3">
          <Card.Header className="fs-4 fw-bold text-center">Rates</Card.Header>

          <Row className="d-flex flex-md-row flex-column">
            <Col>
              <ListGroup  >
                <ListGroup.Item className="border-0 fw-semibold border-bottom text-center">Daily Rates</ListGroup.Item>
                <ListGroup.Item className="border-0 text-center"> $30 up to 4 hours</ListGroup.Item>
                <ListGroup.Item className="border-0  text-center">$45 for up to 12 hours</ListGroup.Item>
                <ListGroup.Item className="border-0 text-center"> Multiple dog families: $25 for each additional dog</ListGroup.Item>

              </ListGroup>
            </Col>
            <Col>
              <ListGroup>
                <ListGroup.Item className="border-0 border-bottom text-center fw-semibold">Holiday Rates</ListGroup.Item>
                <ListGroup.Item className="border-0 text-center">$40 up to 4 hours</ListGroup.Item>
                <ListGroup.Item className="border-0 text-center">$55 for up to 12 hours</ListGroup.Item>
                <ListGroup.Item className="border-0 text-center">Multiple dog families: $30 for each additional dog</ListGroup.Item>
              </ListGroup>

            </Col>
          </Row>
          <Card.Text className=" border-top border-2 bg-light border-dark text-center fw-semibold p-2 m-0">After 12 hours boarding rates will apply.</Card.Text>
          <Card.Footer className="d-flex justify-content-center align-items-center bg-light fw-semibold">
            <div className="border-0 fw-semibold me-2">Holidays:</div>
            <div>New Year's Day, Memorial Day, 4th of July, Labor Day, Thanksgiving, Christmas</div>
          </Card.Footer>
        </Card>
        
      </Row>
    </Container>
    )
    };

    export default Daycare;

