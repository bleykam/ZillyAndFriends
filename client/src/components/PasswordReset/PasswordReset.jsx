import './PasswordReset.scss';
import {useState, useRef} from "react";
import { supabase, baseUrl} from "../../utils";
import { Container, Row, Col, Image, Card, Button,  Form,} from 'react-bootstrap';
import Logo from "../../assets/LOGO.png";

export default function PasswordReset(){
  const [email, setEmail] = useState('');
  const [error, setError] = useState("");

 

  const handleSubmit = async(e) => {
    e.preventDefault();
    // biome-ignore lint/style/useConst: <explanation>
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://www.zillyandfriends.com/update-password'
    })
    alert("check your email for a link to reset your password")
    setEmail("")
    if (error) {
      setError(error.message);
      console.log('Error :', error)
    } 
    }

 
    return (
      <Container className=" d-flex justify-content-center align-items-center vh-100">
        <Card className="p-5 border border-2 bg-custom" >
          <div className="d-flex justify-content-center" style={{ position: 'absolute', top: '-74px', left:0, right:"74px",width: '100%' }}>
            <Image
              src={Logo} // replace with your image path
              roundedCircle
              className="border-2 "
              alt="logo"
              style={{ width: '8rem', height: '8rem', border: '5px solid white' }}
            />
          </div>
          <Card.Body style={{marginTop: '70px'}}>
            <Form className="d-flex flex-column" onSubmit={handleSubmit}>
              <h2 className="reset-password__title">Forgot Your Password?</h2>
            <Form.Text className="text-center">
            <p> To reset your password, type the full email address you used to sign up and we'll send you an e-mail to walk you through resetting your password. </p>
          
             </Form.Text>
              <Form.Group className="mb-3 " controlId="formGroupEmail">
                <Form.Label className="align-self-start">Email address</Form.Label>
                <Form.Control 
                 name="email"
                 placeholder="Enter email"
                 value={email}
                 onChange={e=>setEmail(e.target.value)}
                 type="email" 
                  />
              </Form.Group>
             
            
              <Button variant="primary text-light"  type="submit"  className="m-t-25">
                Reset
              </Button>
            
              <Form.Text className="text-danger">{error}</Form.Text>
            </Form>
           
            </Card.Body>
       

        </Card>

        

      </Container>
  )
}

     

