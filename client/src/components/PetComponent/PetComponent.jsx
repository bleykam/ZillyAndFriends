import './PetComponent.scss';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import dog from '../../assets/dogwithbone.png';
import { useAuth } from '../../AuthContext';
import { Stack, Container, CardGroup,Row, Col, Card, ButtonGroup, Button} from 'react-bootstrap';






export default function PetComponent({pets}) {
  const navigate = useNavigate();
  const[petId, setPetId] = useState("")
  const { user, setUser } = useAuth();
  const userId = user?.id;

  const handleClick = (id) => {
    setPetId(id);
  }
  
  return (
  
     <Row className="d-flex flex-column" >
      {pets?.map((pet, index)=>(
        <Col key={pet.id} >
          <Card className="d-flex mb-2 flex-sm-row align-items-center justify-content-md-between">
   

            <Card.Img src={dog} className="rounded-circle m-2" style={{ width: '100px', height: '100px' }} />

            <Card.Body className=''>
              <Card.Title  >{pet.pet_name}</Card.Title>
              <Card.Text className="mb-2 text-secondary">Breed: {pet.breed}</Card.Text>
              <Card.Text>Age:  {pet.pet_age} </Card.Text>
              <Card.Text>Weight:  {pet.pet_weight} </Card.Text>
            </Card.Body>
 
              <Card.Footer className="d-flex flex-row flex-md-column border-0 bg-transparent">

            <ButtonGroup size="sm" className="d-none d-sm-flex d-flex ms-auto me-0">
              <Button href={`/${userId}/booking`} size="sm" variant="primary">Book</Button>
              <Button  variant="primary" href={`/${petId}/pet`} size="sm" onClick={() => handleClick(pet.id)}>Info</Button>  
            </ButtonGroup>  

              </Card.Footer>
          
          </Card>
  </Col>
      ))}

     
    </Row>
  );
}
