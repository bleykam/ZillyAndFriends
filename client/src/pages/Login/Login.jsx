
import "./Login.scss";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState} from 'react'
import GOOG from "../../assets/Web (mobile + desktop)/svg/light/web_light_rd_SI.svg";
import { supabase } from '../../utils';
import Logout from "../../components/Logout/Logout";
import { Card,Container, Row, Col, Form, Button, Image, ButtonGroup } from 'react-bootstrap';
import Logo from "../../assets/LOGO.png";
import Profile from "../Profile/Profile";


export default function Login(){
  const userObj = localStorage.getItem('sb-fjfdhtjlejguyzhbijav-auth-token');
  const user = JSON.parse(userObj)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

 
 // Google sign-in handler
// async function GoogleSignIn() {
//   try {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         queryParams:{
//           access_type: "offline",
//           prompt: "consent",
//         }, 
//       }
//     })
//   } catch (error) {
//     setError(error.message);
//     console.log(error)
//   }
// }
  // Email sign-in handler
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password){
      return alert("missing email or password");
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if(error.message === "Invalid login credentials"){
        setError(error.message)
      }
    } else {
      	navigate("/profile");
    }
  }
  // Sign out handler
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }


  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="pt-5 px-3 border border-2">
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
            style={{ width: "8rem", height: "8rem", border: "5px solid white" }}
          />
        </div>
        <Card.Body style={{ marginTop: "70px" }}>
          <Form className="d-flex flex-column" onSubmit={handleEmailSignIn}>
            <Form.Group className="mb-3 " controlId="formGroupEmail">
              <Form.Label className="align-self-start">
                Email address
              </Form.Label>
              <Form.Control
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <ButtonGroup className="pt-2">
              <Button
                variant="primary text-light"
                className="m-t-25"
                onClick={handleEmailSignIn}
              >
                Sign In
              </Button>
              <Button href="/sign-up"  variant="secondary text-dark"  className="m-t-25">
              Sign Up</Button>
            </ButtonGroup>
            <Form.Text className="text-danger pt-2">{error}</Form.Text>
          </Form>

          <Button variant="none" className="pt-5 text-primary bg-transparent text-decoration-underline border-0 " href="/passwordreset">Forgot Password?</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
