
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, adminId, adminEmail } from "../../utils";
import { Navbar, Container, Row, Col, Tab, Form, Button, ListGroup, Nav, Card, Offcanvas, ButtonGroup } from 'react-bootstrap';
import dog from '../../assets/dogwithbone.png';
import { useAuth } from '../../AuthContext';


export default function ProfileSettings({user,profiles}) {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [values, setValues] = useState({ password: "", confirmPassword: "" });

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
    <Container className="profile-settings">
        <h3>COMING SOON!</h3>
            {/* <Form className="form mt-3" action="##" method="post" id="registrationForm">
                <Row className="mb-3">
                    <Col xs={6}>
                        <Form.Group controlId="first_name">
                            <Form.Label>
                                <h4>First name</h4>
                            </Form.Label>
                            <Form.Control type="text" placeholder="first name" title="enter your first name." />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group controlId="last_name">
                            <Form.Label>
                                <h4>Last name</h4>
                            </Form.Label>
                            <Form.Control type="text" placeholder="last name" title="enter your last name." />
                        </Form.Group>
                    </Col>
                </Row>
          
            <Row className="mb-3">
                <Col xs={6}>
                    <Form.Group controlId="first_name">
                        <Form.Label>
                            <h4>Phone Number</h4>
                        </Form.Label>
                        <Form.Control type="tel" placeholder="phone number" title="enter your phone number." />
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <Form.Group controlId="last_name">
                        <Form.Label>
                            <h4>Email</h4>
                        </Form.Label>
                        <Form.Control type="email" placeholder="last name" title="enter your email." />
                    </Form.Group>
                </Col>
            </Row>
            </Form>
            <ButtonGroup aria-label="Basic example" className="mt-3">
                <Button variant="primary" type="submit" className="m-t-25">
                    Save    </Button>
                <Button variant="danger" type="submit" className="m-t-25">
                    Cancel    </Button>
            </ButtonGroup>            
        
                    <Form className="d-flex flex-column border border-2 mt-5 p-3" onSubmit={handlePassword} >
                            <h4 className=" align-self-center fw-semibold fs-5">Update Password</h4>
                <Row className="my-3">
                    <Col xs={6}>
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
                        </Col>
                        <Col xs={6}>
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
                    </Col>
                </Row>
                        <Button size='sm' variant="primary text-light" type="submit" className="mw-50 m-t-25">
                            Update Password
                        </Button>

                        <Form.Text className="text-danger pt-2">{error}</Form.Text>
                    </Form>
             */}
        
    </Container>
    )
};