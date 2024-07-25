
import {
    Container,
    Row,
    Col,
    Tab,
    Tabs,

} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminReservationCard from "../AdminReservationCard/AdminReservationCard";


export default function AdminReservations({ bookings }) {
    return (
        <Container className="px-xs-0 gx-0 gx-md-2px-md-2">
            <Tabs defaultActiveKey="pending" id="profile-tabs">
                <Tab eventKey="pending" title="Pending">
                    <Row>
                        <Col className="px-xs-0 gx-0 gx-md-2px-md-2">
                            <AdminReservationCard  bookings={bookings} timeFrame={"pending"} />
                        </Col>
                    </Row>
                </Tab>

                <Tab eventKey="current" title="Current">
                    <Row>
                        <Col>
                            <h4 className="card-title">Booking Requests</h4>
                            <AdminReservationCard bookings={bookings} timeFrame={"current"} />
                        </Col>
                    </Row>
                </Tab>

                <Tab eventKey="upcoming" title="Upcoming">
                    <Row>
                        <Col>
                            <AdminReservationCard
                                bookings={bookings}
                                timeFrame={"upcoming"}
                            />
                        </Col>
                    </Row>
                </Tab>

                <Tab eventKey="past" title="Past">
                    <Row>
                        <Col>
                            <AdminReservationCard bookings={bookings} timeFrame={"past"} />
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
}

