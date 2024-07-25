import "../../pages/Login/Login.scss";
import { useState } from "react";
import { supabase } from "../../utils";
import { useNavigate} from "react-router-dom";

import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  ButtonGroup,
} from "react-bootstrap";
import Logo from "../../assets/LOGO.png";

export default function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    checked: false,
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  console.log(values.checked, "checked");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If password not entered
    if (values.password == "") alert("Please enter Password");
    // If confirm password not entered
    else if (values.passwordCheck == "") alert("Please enter confirm password");
    // If Not same return False.
    else if (values.password != values.passwordCheck) {
      alert("\nPassword did not match: Please try again...");
      return false;
    } else if (values.password.length < 8) {
      alert("\nPassword must be at least 8 characters: Please try again...");
    }

    // If same return True.
    if (values.password === values.passwordCheck) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) {
          console.log("ERROR", error.messsage);
          throw error;
        }
        const formData = {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone_number: values.phone_number,
        };

        if (data) {
          let userId = data.user.id;
          const { profData, error } = await supabase
            .from("profiles")
            .update({ recieve_emails: values.checked })
            .eq("id", userId)
            .select();
          alert("Account created successfully!");
          navigate("/createprofile");
        }
      } catch (error) {
        // Handle error appropriately
        setError(error.message);

        console.error("Sign up error:", error.message);
        alert("Error occurred while signing up. Please try again.");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12} md={6}>
          <Card className="py-5 px-3 border border-2">
            <div
              className="d-flex justify-content-center"
              style={{
                position: "absolute",
                top: "-74px",
                left: 0,
                right: "74px",
                width: "100%",
              }}
            >
              <Image
                src={Logo} // replace with your image path
                roundedCircle
                className="border-2 "
                style={{
                  width: "8rem",
                  height: "8rem",
                  border: "5px solid white",
                }}
              />
            </div>
            <Card.Body style={{ marginTop: "70px" }}>
              <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                <Form.Group className="mb-3 " controlId="formGroupEmail">
                  <Form.Label className="align-self-start">
                    Email address
                  </Form.Label>
                  <Form.Control
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupCheckPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="passwordCheck"
                    type="password"
                    placeholder="Password"
                    value={values.passwordCheck}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check // prettier-ignore
                    type={"checkbox"}
                    id="recieve_emails"
                    name="checked"
                    label="Send me emails about new bookings, payments and reminders."
                  />
                </Form.Group>

                <Card.Text>
                  By clicking Continue, you acknowledge you have read and agreed
                  to our
                  <Button
                    className="ms-0 border-0 text-decoration-underline bg-transparent text-reset"
                    href="/PrivacyPolicy"
                  >
                    Privacy Policy.
                  </Button>
                </Card.Text>

                <Button className="" type="submit">
                  Continue
                </Button>

                {/* Displays error message */}
                <Form.Text>{error}</Form.Text>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
