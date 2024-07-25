import { Container, Row, Col, Card, Button, ListGroup, Form, ButtonGroup } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../utils";
import dogWithBone from '../../assets/dogwithbone.png';


const UserPets = () => {
  const pet = useParams();
  const petId = pet.petId;


  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const userId = user?.id;
  const [profiles, setProfiles] = useState("");
  const [pets, setPets] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentPet, setCurrentPet] = useState({
    pet_name: "",
    breed: "",
    pet_age: "",
    pet_weight: "",
    gender: "",
    house_trained: "",
    spayed_neutered: "",
    micro: "",
    anxiety: "",
    energy_info: "",
    potty_info: "",
    friendly: "",
    alone: "",
    food_info: "",
    med_info: "",
    additional_info: "",
    vet_info: [{ vet_name: "", vet_address: "", vet_address2: "", city: "", state: "", zip: "", vet_phone: "" }],
    emergency: [{ name: "", phone: "", email: "" }] || ""
  });

  const handleCancel = () => {
    setEditing(null);
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', user?.id)
          .single();

        if (error) {
          throw error;
        }

        setProfiles(data);
      } catch (error) {
        console.log('Error loading profile data!', error);
      }
    };

    const getPetData = async () => {
      try {
        // biome-ignore lint/style/useConst: <explanation>
        let { data, error } = await supabase
          .from('pets')
          .select()
          .eq('user_id', user?.id);

        if (error) {
          throw error;
        }
        setPets(data);
        const petData = data.find(pet => pet.id === petId);
        setCurrentPet(petData);
      } catch (error) {
        console.log('Error loading pet data!', error);
      }
    };

    getProfile();
    getPetData();

  }, [user, petId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPet({ ...currentPet, [name]: value });
  };

  const handleNestedInputChange = (e, field, index) => {
    const { name, value } = e.target;
    const updatedField = [...currentPet[field]];
    updatedField[index] = { ...updatedField[index], [name]: value };
    setCurrentPet({ ...currentPet, [field]: updatedField });
  };

  const handleSave = async () => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .update(currentPet)
        .eq('id', petId);

      if (error) {
        throw error;
      }
      setEditing(false);
      setPets(pets.map(pet => (pet.id === petId ? data[0] : pet)));
    } catch (error) {
      console.log('Error updating pet data!', error);
    }
  };

  if (!user) {
    navigate('/login');
  }

  return (
    <Container className='mt-5'>
      <Row className="mt-3">
        <Col className="text-end align-items-end">
          {editing ? ( 
            <ButtonGroup className="mb-3 ">
              <Button variant="success" onClick={handleSave}>Save</Button>
              <Button variant="danger" onClick={handleCancel}>Cancel</Button>
            </ButtonGroup>
          ) : (
            <Button className="mb-3" variant="primary" onClick={() => setEditing(true)}>Edit</Button>
          )}
        </Col>
      </Row>
      <Row className="gutters-sm">
        <Col md={4} className="mb-3">
          <Card>
            <Card.Body className="text-center">
              <img src={dogWithBone} alt="Admin" className="rounded-circle" width="150" />
              <div className="mt-3">
                {editing ? (
                  <Form.Control
                    type="text"
                    name="pet_name"
                    value={currentPet.pet_name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <h4>{currentPet.pet_name}</h4>
                )}
                {editing ? (
                  <>
                    <Form.Control
                      type="text"
                      name="breed"
                      value={currentPet.breed}
                      onChange={handleInputChange}
                    />
                    <Form.Control
                      type="text"
                      name="gender"
                      value={currentPet.gender}
                      onChange={handleInputChange}
                    />
                    <Form.Control
                      type="text"
                      name="pet_age"
                      value={currentPet.pet_age}
                      onChange={handleInputChange}
                    />
                    <Form.Control
                      type="text"
                      name="pet_weight"
                      value={currentPet.pet_weight}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  <>
                    <p className="text-secondary mb-1">Breed: {currentPet.breed}</p>
                    <p className="text-secondary mb-1">Gender: {currentPet.gender}</p>
                    <p className="text-muted font-size-sm">Age: {currentPet.pet_age}</p>
                    <p className="text-muted font-size-sm">Weight: {currentPet.pet_weight}</p>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Header className="fs-5 text-center">Additional Info</Card.Header>
            <Card.Body>
              {editing ? (
                <Form.Control
                  as="textarea"
                  name="additional_info"
                  value={currentPet.additional_info}
                  onChange={handleInputChange}
                />
              ) : (
                <Card.Text>{currentPet.additional_info}</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Row className="gutters-sm">
            <Col sm={6} className="mb-3">
              <Card className="h-100">
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Microchipped</h6>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="micro"
                        value={currentPet.micro}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet.micro}</span>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Spayed/Neutered</h6>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="spayed_neutered"
                        value={currentPet.spayed_neutered}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet.spayed_neutered}</span>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">House Trained</h6>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="house_trained"
                        value={currentPet.house_trained}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet.house_trained}</span>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Potty Break Frequency</h6>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="potty_info"
                        value={currentPet.potty_info}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet.potty_info}</span>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col sm={6} className="mb-3">
              <Card className="h-100">
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Separation Anxiety</h6>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="anxiety"
                        value={currentPet.anxiety}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet.anxiety}</span>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Energy Level</h6>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="energy_info"
                        value={currentPet.energy_info}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet.energy_info}</span>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Friendly With Other Dogs?</h6>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="friendly"
                        value={currentPet.friendly}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet.friendly}</span>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Can Be Left Alone</h6>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="alone"
                        value={currentPet.alone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet.alone}</span>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="gutters-sm">
            <Col sm={6} className="mb-3">
              <Card className="mt-3">
                <Card.Header className="text-center fs-5">Feeding Instructions</Card.Header>
                <Card.Body>
                  {editing ? (
                    <Form.Control
                      as="textarea"
                      name="food_info"
                      value={currentPet.food_info}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Card.Text>{currentPet.food_info}</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} className="mb-3">
              <Card className="mt-3">
                <Card.Header className="text-center fs-5">Medication Instructions</Card.Header>
                <Card.Body>
                  {editing ? (
                    <Form.Control
                      as="textarea"
                      name="med_info"
                      value={currentPet.med_info}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Card.Text>{currentPet.med_info}</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="gutters-sm">
            <Col sm={6} className="mb-3">
              <Card className="h-100">
                <h5 className="text-center p-1">Emergency Contact</h5>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Name</h6>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="name"
                        value={currentPet?.emergency[0].name}
                        onChange={(e) => handleNestedInputChange(e, 'emergency', 0)}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet?.emergency[0]?.name}</span>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Phone Number:</h6>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="phone"
                        value={currentPet?.emergency[0]?.phone}
                        onChange={(e) => handleNestedInputChange(e, 'emergency', 0)}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet?.emergency[0]?.phone}</span>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Email:</h6>
                    {editing ? (
                      <Form.Control
                        type="email"
                        name="email"
                        value={currentPet?.emergency[0].email}
                        onChange={(e) => handleNestedInputChange(e, 'emergency', 0)}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet?.emergency[0]?.email}</span>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col sm={6} className="mb-3">
              <Card className="h-100">
                <h5 className="text-center p-1">Vet Info</h5>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Name</h6>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="vet_name"
                        value={currentPet.vet_info[0].vet_name}
                        onChange={(e) => handleNestedInputChange(e, 'vet_info', 0)}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet.vet_info[0]?.vet_name}</span>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Address:</h6>
                    {editing ? (
                      <>
                        <Form.Control
                          type="text"
                          name="vet_address"
                          value={currentPet.vet_info[0].vet_address}
                          onChange={(e) => handleNestedInputChange(e, 'vet_info', 0)}
                        />
                        <Form.Control
                          type="text"
                          name="vet_address2"
                          value={currentPet.vet_info[0].vet_address2}
                          onChange={(e) => handleNestedInputChange(e, 'vet_info', 0)}
                        />
                        <Form.Control
                          type="text"
                          name="city"
                          value={currentPet.vet_info[0].city}
                          onChange={(e) => handleNestedInputChange(e, 'vet_info', 0)}
                        />
                        <Form.Control
                          type="text"
                          name="state"
                          value={currentPet.vet_info[0].state}
                          onChange={(e) => handleNestedInputChange(e, 'vet_info', 0)}
                        />
                        <Form.Control
                          type="text"
                          name="zip"
                          value={currentPet.vet_info[0].zip}
                          onChange={(e) => handleNestedInputChange(e, 'vet_info', 0)}
                        />
                      </>
                    ) : (
                      <>
                        <span className="text-secondary">{currentPet.vet_info[0]?.vet_address}</span>
                        <span className="text-secondary">{currentPet.vet_info[0]?.vet_address2}</span>
                        <span className="text-secondary">{currentPet.vet_info[0]?.city}</span>
                        <span className="text-secondary">{currentPet.vet_info[0]?.state}</span>
                        <span className="text-secondary">{currentPet.vet_info[0]?.zip}</span>
                      </>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Phone:</h6>
                    {editing ? (
                      <Form.Control
                        type="text"
                        name="vet_phone"
                        value={currentPet.vet_info[0].vet_phone}
                        onChange={(e) => handleNestedInputChange(e, 'vet_info', 0)}
                      />
                    ) : (
                      <span className="text-secondary">{currentPet.vet_info[0]?.vet_phone}</span>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
     
    </Container>
  );
};

export default UserPets;
