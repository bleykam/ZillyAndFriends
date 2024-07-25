import './CreateProfile.scss';
import { useState } from 'react';
import { supabase } from "../../utils";
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/LOGO.png";
import { Container, Image, Form, Button, ButtonGroup} from 'react-bootstrap';
import { useAuth } from '../../AuthContext';

export default function Create() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
 
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: user?.email || "",
    phone_number: "",
  });

  const fullName = `${values.first_name} ${values.last_name}`;

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number: values.phone_number,
      full_name: fullName,
      role: "client",
    };
  
    const { data, error } = await supabase
      .from("profiles")
      .update([formData])
      .eq("id", user?.id)
      .select();
    navigate(`/${user?.id}/AddPet`);
  };

  if (!user) {
    return <p>Loading ...</p>;
  }

  return (
    <Container className="mt-5 create-form d-flex flex-column justify-content-center align-items-center ">
      <Image
        src={Logo} // replace with your image path
        roundedCircle
        className="border-2 "
        style={{ width: "8rem", height: "8rem", border: "5px solid white" }}
      />

      <h2 className="text-center">Create Account</h2>

      <Form  onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            id="first_name"
            onChange={handleChange}
            value={values.first_name}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            id="last_name"
            onChange={handleChange}
            value={values.last_name}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone_number"
            id="phone_number"
            onChange={handleChange}
            value={values.phone_number}
            required
          />
        </Form.Group>

        <ButtonGroup className="d-flex text-center">
          <Button type="submit">Continue</Button>
          <Button variant="danger" onClick={handleSignOut} >Cancel</Button>
        </ButtonGroup>

      </Form>
     
    </Container>
  );
}