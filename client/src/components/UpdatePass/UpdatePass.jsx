import './UpdatePass.scss';
import {useState, useEffect, useRef} from "react";
import { supabase} from "../../utils";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button,  Form,} from 'react-bootstrap';
import Logo from "../../assets/LOGO.png";
import { useAuth } from '../../AuthContext';

export default function UpdatePass(){
  const { user } = useAuth();
  const [error, setError] = useState("");
  const navigate=useNavigate();
  const [values, setValues] = useState({ password: "", confirmPassword: "" });

  if(!user){
    navigate("/login");
  };

  const handleChange = (event) => {
    if (!event) {
        return;
    }
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    };

  const handlePassword = async(e) => {
    e.preventDefault();
    // biome-ignore lint/style/useConst: <explanation>
    let password1 = values.password;
    // biome-ignore lint/style/useConst: <explanation>
    let password2 = values.confirmPassword;

    // If password not entered 
    if (password1 === '') 
        alert ("Please enter Password"); 
          
    // If confirm password not entered 
    else if (password2 === '') 
        alert ("Please enter confirm password"); 
          
    // If Not same return False.     
    else if (password1 !== password2) { 
        alert ("\nPassword did not match: Please try again...") 
        return false; 
    } 

    // If same return True. 
    else{ 
      const { data, error } = await supabase.auth
        .updateUser({ password: values.password})
        navigate("/login");
          if (error) {
            setError(error)
            console.log(error)
            alert("There was an error updating your password.")
          }
  }
 
}


 
    return (
     
        <Container className="d-flex justify-content-center align-items-center vh-100">
           
        <Card className="p-5 border border-2 bg-custom" >
          
          <div className="d-flex justify-content-center" style={{ position: 'absolute', top: '-74px', left:0, right:"74px",width: '100%' }}>
            <Image
              src={Logo} // replace with your image path
              roundedCircle
              className="border-2 "
              style={{ width: '8rem', height: '8rem', border: '5px solid white' }}
            />
          </div>
          <Card.Title className="text-center mt-4">Update Password</Card.Title>
          <Card.Body style={{marginTop: '70px'}}>
          
            <Form className="d-flex flex-column" onSubmit={handlePassword}>
              <Form.Group className="mb-3 " controlId="formGroupEmail">
                <Form.Label className="align-self-start">New Password</Form.Label>
                <Form.Control 
                 name="password"
                 placeholder="Enter New Password"
                 value={values.password}
                 onChange={handleChange}
                 type="password" 
                  />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                name="confirmPassword" 
                type="password" 
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                />
              </Form.Group>
          
              <Button variant="primary text-light"  type="submit" className="m-t-25">
              Set Password
              </Button>
            
              <Form.Text className="text-danger pt-2">{error}</Form.Text>
            </Form>
            </Card.Body>
        </Card>
      </Container>

  )
}




