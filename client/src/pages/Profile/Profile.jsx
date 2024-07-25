import "./Profile.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, adminId, adminEmail } from "../../utils";
import { Navbar, Container, Row, Col, Tab, Form, Button, ListGroup, Nav, Card, Offcanvas } from 'react-bootstrap';
import dog from '../../assets/dogwithbone.png';
import { useAuth } from '../../AuthContext';
import Reservations from '../../components/Reservations/Reservations';
import Messaging from "../../components/Messaging/Messaging";
import PetComponent from "../../components/PetComponent/PetComponent";
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { tab, bookingId } = useParams(); // Get the tab and bookingId parameters from URL
  const userId = user?.id;
  const [bookings, setBookings] = useState([]);
  const [profiles, setProfiles] = useState("");
  const [pets, setPets] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
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
        if (!data.email) {
          navigate('/createprofile');
        }
        setProfiles(data);
      } catch (error) {
        console.log('Error loading profile data!', error);
      }
    };

    const getPetData = async () => {
      try {
        const { data, error } = await supabase
          .from('pets')
          .select()
          .eq('user_id', user?.id);

        if (error) {
          throw error;
        }
        setPets(data);
      } catch (error) {
        console.log('Error loading pet data!', error);
      }
    };

    const getBookings = async () => {
      try {
        const { data: bookingsData, error: bookingsError, status: bookingsStatus } = await supabase
          .from("bookings")
          .select()
          .eq("user_id", userId);

        if (bookingsError && bookingsStatus !== 406) {
          throw bookingsError;
        }

        if (bookingsData) {
          setBookings(bookingsData);
        }
      } catch (bookingsError) {
        console.log('Error loading bookings data!', bookingsError);
      }
    };

    getProfile();
    getPetData();
    getBookings();
  }, [user, userId, navigate]);

  if (!user) {
    navigate('/login'); // Show a loading indicator while user data is being fetched
  }

  return (
    <Tab.Container defaultActiveKey={tab || "pets"}>
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
                  <Nav.Link eventKey="pets-offcanvas" onClick={handleClose}>Pets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="reservations-offcanvas" onClick={handleClose}>Reservations</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="messages-offcanvas" onClick={handleClose}>Messages</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="settings-offcanvas" onClick={handleClose}>Settings</Nav.Link>
                </Nav.Item>
              </Nav>
              <Card className="mt-3">
                <a href={`/${userId}/AddPet`} onClick={handleClose}>
                  <Card.Body className="d-flex justify-content-between">
                    <div> Add Pet</div>
                    <div>
                      {" "}
                      <i className="bi bi-plus-square" />
                    </div>
                  </Card.Body>
                </a>
              </Card>
              <Card className="mt-3">
                <Card.Body onClick={() => { handleSignOut(); handleClose(); }} className="d-flex justify-content-between">
                  <div>Logout</div>
                  <div>
                    {" "}
                    <i className="bi bi-box-arrow-right" />
                  </div>
                </Card.Body>
              </Card>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Tab.Container defaultActiveKey="pets">
        <Row className="m-3 mx-auto" style={{maxWidth:1140}}>
          <Col lg={3} className="d-none mt-3 d-lg-block">
            <Card>
              <Card.Img variant="top" src={dog} alt="Profile" />
              <Card.Body>
                <Card.Title>
                  {profiles.first_name} {profiles.last_name}
                </Card.Title>
              </Card.Body>
              <ListGroup>
                <ListGroup.Item className="text-right">
                  <span className="pull-left">
                    <strong>Email:</strong>
                  </span>{" "}
                  {profiles.email}
                </ListGroup.Item>
                <ListGroup.Item className="text-right">
                  <span className="pull-left">
                    <strong>Cell Phone</strong>
                  </span>{" "}
                  {profiles.phone_number}
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Nav variant="pills" className="flex-column mt-3">
              <Nav.Item>
                <Nav.Link eventKey="pets">Pets</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="reservations">Reservations</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="messages">Messages</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="settings">Settings</Nav.Link>
              </Nav.Item>
            </Nav>
            <Card className="mt-2">
              <a href={`/${userId}/AddPet`}>
                <Card.Body className="d-flex justify-content-between">
                  <div> Add Pet</div>
                  <div>
                    {" "}
                    <i className="bi bi-plus-square" />
                  </div>
                </Card.Body>
              </a>
            </Card>
            <Card className="mt-2">
              <Card.Body onClick={handleSignOut} className="d-flex justify-content-between">
                <div>Logout</div>
                <div>
                  {" "}
                  <i className="bi bi-box-arrow-right" />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            <Tab.Content>
              <Row>
                <Col>
                  <Nav variant="tabs" className="d-lg-none">
                    <Nav.Item>
                      <Nav.Link eventKey="pets">Pets</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="reservations">Reservations</Nav.Link>
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
              <Tab.Content className="m-3">
                <Tab.Pane eventKey="pets">
                  <PetComponent userId={userId} pets={pets} />
                </Tab.Pane>
                <Tab.Pane eventKey="reservations">
                  <Reservations profiles={profiles} pets={pets} bookings={bookings} />
                </Tab.Pane>
                <Tab.Pane eventKey="messages">
                  <Messaging senderEmail={profiles.email} sender={profiles.full_name} userId={user?.id} otherUserId={adminId} recipientEmail={adminEmail} bookingId={bookingId} />
                </Tab.Pane>
                <Tab.Pane eventKey="settings">
                <ProfileSettings userId={userId} profiles={profiles} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Tab.Container>
  );
}
