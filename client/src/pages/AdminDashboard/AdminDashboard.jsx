// Profile.js

import {useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../utils";
import { isPast } from "date-fns";

import Logout from "../../components/Logout/Logout";
import { Navbar, Container, Row, Col, Tab, Offcanvas, Tabs, Table, Form, Button, ListGroup, Nav, Card } from 'react-bootstrap';
import LOGO from '../../assets/LOGO.png';
import { useAuth } from '../../AuthContext';


import AdminReservations from '../../components/AdminReservations/AdminReservations';
import AdminProfiles from "../../components/AdminProfiles/AdminProfiles";
import Messaging from "../../components/Messaging/Messaging";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const userId = user?.id;
  const [bookings, setBookings] = useState([]);
  const [profiles, setProfiles] = useState("");
  const [pets, setPets]=useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

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
    const getPetData = async () => {
      try {
        const { data, error } = await supabase
          .from("pets")
          .select()
          .eq("user_id", user?.id); // Assuming 'profile_id' is the foreign key in 'pets' table

        if (error) {
          throw error;
        }
        setPets(data);
      } catch (error) {
        console.log("Error loading pet data!", error);
      }
    };

    async function getBookings() {
      try {
        const { data, error, status } = await supabase.from("bookings").select(`
      id,
      start_time,
      end_time,
      start_date,
      end_date,
      service,
      message,
      amt_paid,
      amt_remain,
      tot_amt,
      status,
      dates,
      pets_selected,
      created_at,
      profiles (
        full_name,
        email,
        phone_number
      ) 
    `);

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setBookings(data);
        }
      } catch (error) {
        console.log("Error loading bookings data!", error);
      }
    }
    getPetData();
    getBookings();
  }, [ user?.id ]);

  if (!user) {
    navigate('/login'); // Show a loading indicator while user data is being fetched
  }
  
  return (
      <Tab.Container>
      <Navbar bg="light" expand="lg" className="d-lg-none">
        <Container>
          <Navbar.Brand>Profile</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Item>
                 <Nav.Link eventKey="reservations-offcanvas" onClick={handleClose}>Reservations</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                   <Nav.Link eventKey="users-offcanvas" onClick={handleClose}>Pets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="messages-offcanvas" onClick={handleClose}>Messages</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="settings-offcanvas" onClick={handleClose}>Settings</Nav.Link>
                </Nav.Item>
              </Nav>
              
              <Card className="mt-3">
                <Card.Body onClick={() => { handleSignOut(); handleClose(); }} className="d-flex justify-content-between">
                  <div>Logout</div>
                  <div>
                    {" "}
                    <i className="bi bi-box-arrow-right"/>
                  </div>
                </Card.Body>
              </Card>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Tab.Container defaultActiveKey="reservations">
        <Row className="m-3 mx-auto" style={{ maxWidth: 1140 }}>
          <Col lg={3} className="d-none mt-3 d-lg-block">
         
            <Card >
              <Card.Img variant="top" src={LOGO} alt="Profile" />
              <Card.Body>
                <Card.Title>
                  {user?.user_metadata.name} 
                </Card.Title>
              </Card.Body>
             
            </Card>
            <Nav variant="pills" className="flex-column mt-3">
              <Nav.Item>
                <Nav.Link eventKey="reservations">Reservations</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                   <Nav.Link eventKey="users">Users</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="messages">Messages</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="settings">Settings</Nav.Link>
              </Nav.Item>
            </Nav>
            
            <Card className="mt-2">
              <Card.Body onClick={handleSignOut} className="d-flex justify-content-between">
                <div>Logout</div>
                <div>
                  {" "}
                  <i className="bi bi-box-arrow-right"/>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
          <Tab.Content>
            
              <Row className="mb-2"> 
                <Col>
                  <Nav variant="tabs" className="d-lg-none">
                    <Nav.Item>
                      <Nav.Link eventKey="reservations">Reservations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="users">Users</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="messages">Messages</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="settings">Settings</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
              <Tab.Content className="mx-xs-0 m-md-3">
                <Tab.Pane eventKey="users" >
                  <AdminProfiles profiles={profiles} />
               
                </Tab.Pane>
           

               

                <Tab.Pane eventKey="reservations" title="Reservations">
                 <AdminReservations bookings={bookings} />
                </Tab.Pane>

                <Tab.Pane eventKey="messages" title="Messages">
                    
                     </Tab.Pane>
              </Tab.Content>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Tab.Container>
  );
}