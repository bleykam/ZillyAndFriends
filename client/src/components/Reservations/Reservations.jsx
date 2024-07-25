
import "./Reservations.scss";
import { Container, Button, Row, Col, Tab, Tabs} from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import { ReservationCard } from "../ReservationCard/ReservationCard";

export default function Reservations({bookings, profiles, handleTabChange}) {
  const { user, setUser } = useAuth();

    return (
      <Container>
        <Row>
          <div className="d-flex justify-content-end mb-3">
    
        <Button size='sm' className= 'align-items-center text-center justify-content-center' href={`/${user?.id}/booking`} variant="primary">New Reservation</Button>
          </div>
        </Row>
          <Tabs defaultActiveKey="pending" id="profile-tabs">
            <Tab eventKey="pending" title="Pending">
            <Row>
                <Col>
                  <ReservationCard bookings={bookings}  profiles={profiles}  handleTabChange={handleTabChange} timeFrame={"pending"} />
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="current" title="Current">
              <Row>
                <Col>
                  <ReservationCard bookings={bookings} timeFrame={"current"} profiles={profiles} handleTabChange={handleTabChange}/>
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="upcoming" title="Upcoming">
            <Row>
                <Col>
                <ReservationCard bookings={bookings} profiles={profiles} handleTabChange={handleTabChange} timeFrame={"upcoming"} />
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="past" title="Past">
            <Row>
                <Col>
                <ReservationCard bookings={bookings} timeFrame={"past"} profiles={profiles} handleTabChange={handleTabChange} />
                </Col>
              </Row>
             
            </Tab>
          </Tabs>
        
      </Container>
    );
}

