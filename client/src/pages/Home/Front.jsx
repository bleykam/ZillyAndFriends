import "./Home.scss";
import { useState } from "react";
import Ella from "../../assets/ella.png";
import Friends from "../../assets/chlozill.jpg";
import Blanket from "../../assets/blanket.jpg";
import Cutie from "../../assets/cutie.jpg";
import collage from "../../assets/collage2.png";
import {Card, Image,Button, Container, Row, Col} from 'react-bootstrap';

import Louie from "../../assets/louie-resized.jpg";
import Fritz from "../../assets/FritzDIckens.jpg";
function Front() {
  const [index, setIndex] = useState(0);


  return (
    <Container className="mx-auto">
      <Container className="my-4">
        <Row className="d-none d-md-flex">
          <Col md={4} lg={3} className="image-container">
            <Image src={Friends} width={"100%"} height={"100%"} className="responsive-image object-fit-fill" />
          </Col>
          <Col md={4} lg={3} className="image-container">
            <Image src={Ella} width={"100%"} height={"100%"} className="responsive-image object-fit-cover" />
          </Col>
          <Col md={4} lg={3} className="image-container">
            <Image src={Fritz} style={{ objectPosition: "10% 50%" }} width={"100%"} height={"100%"} className="responsive-image object-fit-fill" />
          </Col>
          <Col md={0} lg={3} className="image-container d-none d-lg-block">
            <Image src={Cutie} width={"100%"} height={"100%"} className="responsive-image object-fit-cover" />
          </Col>
        </Row>
        <Row className="d-flex d-md-none">
          <Col>
            <Image src={collage} className="responsive-image" />
          </Col>
        </Row>
      </Container>


      <hr className="mb-5"/>
      <Row className="mx-2 mx-md-0" >
        <Col xs={12} md={6} className="m-0 p-0">
          <Card className="p-2 text-center w-100 h-100 border bg-primary text-white border-primary m-0 justify-content-center align-items-center rounded-0">
            <Card.Header className="bg-transparent fs-3 fw-semibold border-0 mb-3">Daycare</Card.Header>
            <Card.Text className="w-75">
              Personalized doggy daycare to make your pup feel at home!
            </Card.Text>
            <Card.Footer className="d-flex justify-content-center border-0 bg-transparent align-items-center">
              <Button href="/daycare" variant="none" className="mt-3 fw-semibold  btn btn-custom" >Learn More!</Button></Card.Footer>
          </Card>
        </Col>
        <Col md={6} className="d-none d-md-flex m-0 p-0 ">
        <Image className="object-fit-cover" height={400} width={"150%"}  src={Louie}/>
        </Col>
        
        <div height={25} className="w-100" style={{padding:" 0.15rem", backgroundColor: "rgba(0, 0, 0, 0.5)"}} />
      </Row>
     
      <Row className="mx-2 mx-md-0" >
        <Col md={6} className="  d-none d-md-flex m-0 p-0 ">
          <Image height={400} className="object-fit-cover" style={{ objectPosition: "50% 30%" }} width={"100%"} src={Blanket} />
        </Col>
        <Col xs={12} md={6} className="m-0 p-0">
          <Card className="p-2 text-center w-100 h-100 border bg-primary text-white border-primary m-0 justify-content-center align-items-center rounded-0">
            <Card.Header className="bg-transparent fw-semibold fs-3 border-0 mb-3">Boarding</Card.Header>
            <Card.Text className="w-75">
               A crate-free dog boarding experience with all the cozy comforts of home.
            </Card.Text>
            <Card.Footer className="d-flex justify-content-center border-0 bg-transparent align-items-center">
              <Button href="/boarding" variant="none" className="mt-3 fw-semibold  btn btn-custom" >Learn More!</Button></Card.Footer>
          </Card>
        </Col>

      </Row>
    <hr className="my-5"/>

  

      <Container className="mt-5">
        <div
          className="elfsight-app-39b02857-814e-45c4-b648-a381ce91f9b9  "
          data-elfsight-app-lazy
        />
      </Container>
     

     
    </Container>
  );
}

export default Front;
