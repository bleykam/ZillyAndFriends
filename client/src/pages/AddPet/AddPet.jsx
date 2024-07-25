import './AddPet.scss';
import { useNavigate, useParams } from "react-router-dom";
import { useState, } from "react";
import { supabase } from "../../utils";
import { Container, Row, Col, Button, Form, } from 'react-bootstrap';


export default function AddPet() {
  let customId = useParams();
  const id = customId.userId;
  const userObj = localStorage.getItem('sb-fjfdhtjlejguyzhbijav-auth-token');
  const user = JSON.parse(userObj)
  const navigate = useNavigate();
  const [values, setValues] = useState({
    pet_name: "", pet_age: "", pet_weight: "", breed: "", gender: "", energy_info: "", food_info: "", emergency: { name: "", phone: "", emergency_email: "" },
    additional_info: "", med_info: "", potty_info: "", anxiety: "", micro: "", spayed_neutered: "", house_trianed: "", friendly: "", alone: "",
    vet_info: { vet_name: "", vet_phone: "", vet_address: "", vet_address2: "", vet_city: "", vet_state: "", vet_zip: "" }
  });

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { name, value } = event.target;
    setValues({ ...values, [name]: value, emergency: { ...values.emergency, [name]: value } });

  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = {
      pet_name: values.pet_name,
      gender: values.gender,
      pet_weight: values.pet_weight,
      pet_age: values.pet_age,
      breed: values.breed,
      friendly: values.friendly,
      house_trained: values.house_trianed,
      spayed_neutered: values.spayed_neutered,
      micro: values.micro,
      anxiety: values.anxiety,
      energy_info: values.energy_info,
      potty_info: values.potty_info,
      alone: values.alone,
      food_info: values.food_info,
      med_info: values.med_info,
      additional_info: values.additional_info,
      vet_info: values.vet_info,
      emergency: [{
        name: values.emergency.name,
        phone: values.emergency.phone,
        email: ''
      }],
    }
    const { data, error } = await supabase
      .from('pets')
      .insert([
        formData
      ])
      .select()
    if (error) {
      if (error) {
        console.log(error.message)
      }
    } else {
      navigate(`/profile`);
    }

  }
  console.log()
  if (!user) {
    return <p>Loading ...</p>
  }

  return (
    <Container className="mt-5 d-flex flex-column align-items-center">

      <h1 className="text-center">Add Pet</h1>

      <Form className="add-pet d-flex flex-column " onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Pet Name</Form.Label>
          <Form.Control
            id="pet_name"
            type="text"
            name="pet_name"
            placeholder="Name"
            value={values.pet_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Gender</Form.Label>
          <Form.Select
            id="gender"
            aria-label="Default select example"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>

          </Form.Select>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Weight</Form.Label>
          <Form.Control
            id="pet_weight"
            type="text"
            name="pet_weight"
            placeholder="Weight"
            value={values.pet_weight}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Age</Form.Label>
          <Form.Control
            id="pet_age"
            type="text"
            name="pet_age"
            placeholder="Age"
            value={values.pet_age}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Breed</Form.Label>
          <Form.Control
            id="breed"
            type="text"
            name="breed"
            placeholder="breed"
            value={values.breed}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Friendly with other dogs?</Form.Label>
          <Form.Select
            id="friendly"
            aria-label="Default select example"
            name="friendly"
            value={values.friendly}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Unsure</option>
            <option value="depends">Depends</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>House Trained</Form.Label>
          <Form.Select
            id="house_trianed"
            aria-label="Default select example"
            name="house_trianed"
            value={values.house_trianed}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="unsure">Unsure</option>
            <option value="depends">Depends</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Potty Breaks Frequency</Form.Label>
          <Form.Select
            id="potty_info"
            aria-label="alone"
            name="potty_info"
            value={values.potty_info}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="1 hour">1hr</option>
            <option value="2 hours">2hrs</option>
            <option value="4 hours">4hrs</option>
            <option value="8 hours">8hrs</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Spayed/Neutered</Form.Label>
          <Form.Select
            id="spayed_neutered"
            aria-label="Default select example"
            name="spayed_neutered"
            value={values.spayed_neutered}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>

          </Form.Select>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Microchipped</Form.Label>
          <Form.Select
            id="micro"
            aria-label="Default select example"
            name="micro"
            value={values.micro}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>

          </Form.Select>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Separation Anxiety</Form.Label>
          <Form.Select
            id="anxiety"
            aria-label="Default select example"
            name="anxiety"
            value={values.anxiety}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Energy Level</Form.Label>
          <Form.Select
            id="energy_info"
            aria-label="energy_info"
            name="energy_info"
            value={values.energy_info}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="depends">Depends</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Can Be Left Alone</Form.Label>
          <Form.Select
            id="alone"
            aria-label="alone"
            name="alone"
            value={values.alone}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="not at all">Can't be left alone</option>
            <option value="1 hour">1hr</option>
            <option value="2 hours">2hrs</option>
            <option value="4 hours">4hrs</option>
            <option value="8 hours">8hrs</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Feeding Instructions</Form.Label>
          <Form.Control
            id="food_info"
            as="textarea"
            placeholder="Feeding instructions"
            name="food_info"
            value={values.food_info}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Medical Info</Form.Label>
          <Form.Control
            id="med_info"
            as="textarea"
            name="med_info"
            placeholder="Describe any medical issues/ medications taken"
            value={values.med_info}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Additional Info</Form.Label>
          <Form.Control
            id="additional_info"
            as="textarea"
            placeholder="Add any additional info"
            name="additional_info"
            value={values.additional_info}
            onChange={handleChange}
            row={5}
          />
        </Form.Group>

        <Form.Group className='mt-3'>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Vet Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="vet_name"
                values={values.vet_info.vet_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Vet Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                name="vet_phone"
                value={values.vet_info.vet_phone}
                onChange={handleChange}
              />
            </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Vet Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="vet_address"
              value={values.vet_info.vet_name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Vet Address 2</Form.Label>
            <Form.Control
              name='vet_address2'
              value={values.vet_info.vet_address2}
              onChange={handleChange}
              placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Vet City</Form.Label>
              <Form.Control
                type="text"
                name='vet_city'
                value={values.vet_info.vet_city}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Vet State</Form.Label>
              <Form.Control
                type="text"
                name='vet_state'
                value={values.vet_info.vet_state}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label> Vet Zip</Form.Label>
              <Form.Control
                type='text'
                name='vet_zip'
                value={values.vet_info.vet_zip}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
        </Form.Group>

        <Form.Group className='mt-3'>
          <Form.Label>Emergency Contact Info</Form.Label>
          <Form.Control
            id="name"
            type="text"
            placeholder="First and Last Name"
            name="name"
            label="Name"
            value={values.emergency.name}
            onChange={handleChange}
          />
          <br />
          <Form.Control
            id="phone"
            type="tel"
            label="Phone Number"
            placeholder="Emergency contact phone number"
            name="phone"
            value={values.emergency.phone}
            onChange={handleChange}
          />
          <br />
          <Form.Control
            id="emergency_email"
            type="email"
            placeholder="Emergency contact email"
            name="emergency_name"
            value={values.emergency.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" className="my-3 mx-auto w-50">Add!</Button>

      </Form>
    </Container>
  );
}



