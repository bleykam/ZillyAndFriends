
import {useParams } from "react-router-dom";
import { useEffect, useState,} from "react";
import { supabase} from "../../utils";

import PetComponent from "../../components/PetComponent/PetComponent";

export default function PublicProfile() {
  const { userId } = useParams();
  const [profiles, setProfiles] = useState("");
  const [profile]=profiles
  const{first_name, pet_name}=profile || []
  const [pets, setPets] = useState([]);
  // biome-ignore lint/style/useConst: <explanation>
  let dogName = pets.length === 0 ? pets[0]?.pet_name : "Pack Members";

  useEffect(()=>{
    const getProfile = async(e) => {
    try {
      // biome-ignore lint/style/useConst: <explanation>
      let { data, error, status } = await supabase
      .from('profiles')
      .select()
      .eq('id', userId)
      .single()

      if (error && status !== 406) {
        throw error
      }
      if (data) {
        setProfiles([data]);
      }
      // biome-ignore lint/style/useConst: <explanation>
      let { data: petData, error: petError } = await supabase
        .from('pets')
        .select()
        .eq('user_id', userId); // Assuming 'profile_id' is the foreign key in 'pets' table

      if (petError) {
        throw petError;
      }

          setPets(petData);
    } catch (error) {
      console.log('Error loading user data!', error)
    }
    }   
    getProfile();
  }, [userId]);

  return (
    <Container>
      <h1 className="profile__heading">
        {first_name}'s Pets!
      </h1>
      <Row className="m-3">
        <Col lg={3} className="d-none d-lg-block">
          <Card>
            <Card.Img variant="top" src={dog} alt="Profile" height={250} />
            <Card.Body>
              <Card.Title>
                {profiles.first_name} {profiles.last_name}
              </Card.Title>
            </Card.Body>
            <ListGroup>
              {pets?.map((pet) => (
              <ListGroup.Item key={pet.id} className="text-right">
                {pet_name}
                </ListGroup.Item>
              ))}
            </ListGroup>  
          </Card>
          </Col>
          </Row>
    </Container>
  );
}

