
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import dog from '../../assets/dogwithbone.png';
import { Stack, Container, CardGroup,Row, Col, Card, ButtonGroup, Button} from 'react-bootstrap';
import { supabase } from "../../utils";

export default function AdminProfiles() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const[profileId, setprofileId] = useState("")

  const handleClick = (id) => {
    setprofileId(id);
  }

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select("*");
        if (error) {
          throw error;
        }

        setProfiles(data);
      } catch (error) {
        console.log("Error loading profile data!", error);
      }
    };
    getProfiles();
  }, []);
  
  return (
  
     <Row className="d-flex flex-column" >
      {profiles?.map((profile, index)=>(
        <Col key={profile.id} >
          <Card className="d-flex my-2 flex-sm-row align-items-center justify-content-md-between">
            <Card.Img src={dog} className="rounded-circle mx-auto mt-2" style={{ width: '100px', height: '100px' }} />
            <Card.Body className=''>
              <Card.Title>Name: {profile.full_name}</Card.Title>
              <Card.Text className="mb-2 text-secondary">Breed: {profile.breed}</Card.Text>
              <Card.Text>Phone:  {profile.phone_number} </Card.Text>
              <Card.Text>Email:  {profile.email} </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex flex-row flex-md-column border-0">

              <Button href={`/${profileId}/profiles`} size="sm" onClick={() => handleClick(profile.id)} variant="outline-secondary">Info</Button>
              <Button size="sm" variant="outline-secondary">Edit</Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
