
import { useState, useEffect } from 'react';
import { Container, Button,Badge, Row, Col, Card, Image, ButtonGroup, Stack } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import { supabase, sendCancelEmail,convertTime, convertDate, adminEmail } from "../../utils";
import { isPast, format, isFuture, isSameDay, parseISO } from "date-fns";
import { useNavigate } from 'react-router-dom';
import dogWithBone from '../../assets/dogwithbone.png';


export function ReservationCard({ bookings, timeFrame, profiles }) {
    const { user, setUser } = useAuth();
    const userId = user?.id;
    const navigate = useNavigate(); // Add useNavigate hook
    const [cardBookings, setCardBookings] = useState([]);

    useEffect(() => {
        let filterBookings;
        if (timeFrame === "upcoming") {
            filterBookings = bookings?.filter(booking => isFuture(new Date(booking.start_date)))
            setCardBookings(filterBookings);
        } else if (timeFrame === "past") {
            filterBookings = bookings?.filter(booking => isPast(new Date(booking.start_date)))
            setCardBookings(filterBookings);
        } else if (timeFrame === "current") {
            const today = new Date();
            filterBookings = bookings?.filter(booking => {
                return (booking.service === "Daycare" && isSameDay(parseISO(booking.start_date), today)) ||
                    (booking.service === "Boarding" && booking.dates.some(date => isSameDay(parseISO(date), today)));
            });
            setCardBookings(filterBookings);
        } else {
            filterBookings = bookings?.filter(booking => booking.status === "pending");
            setCardBookings(filterBookings);
        }
    }, [bookings, timeFrame]);

    const handleStatusClick = async (booking, status) => {
        // biome-ignore lint/style/useConst: <explanation>
        let form = {
            admin_email: adminEmail,
            first_name: profiles.first_name,
            pet_name: booking.pets_selected,
            service: booking.service,
            start_date: booking.start_date,
            start_time: booking.start_time,
            end_time: booking.end_time,
            end_date: booking.end_date,
            ...(booking.service === "boarding" ? { end_date: booking.end_date } : {}),
            status: status,
            user_email: user?.email,
            total: booking.tot_amt,
        };

        const { data, error } = await supabase
            .from('bookings')
            .update({ status: status })
            .eq('id', booking.id)
            .select();
        sendCancelEmail(form);
        alert("Booking request changed");
    }

    const getStatusVariant = (status) => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'approved':
                return 'success';
            case 'rejected':
                return 'danger';
            case 'canceled':
                return 'info';
            default:
                return 'primary';
        }
    };

    const getServiceVariant = (service) => {
        switch (service) {
            case 'Boarding':
                return 'primary';
            case 'Daycare':
                return 'secondary';
            default:
                return 'primary';
        }
    }

    return (
        <Container fluid className="mt-3">
            {bookings && cardBookings.map((booking) => (
                <Card key={booking.id} className="m-1" >
                    <Card.Body >
                        <Row>
                            <ButtonGroup size="sm" className="d-flex d-sm-none mb-3">
                                <Button size="sm" onClick={() => handleSendMessage(booking.id)}>Send Message</Button>
                                {(booking.status === "pending" || booking.status === "accepted") && <Button onClick={() => handleStatusClick(booking, "canceled")}>Cancel</Button>}
                            </ButtonGroup>
                        </Row>
                        <Row className="d-flex flex-column flex-md-row">
                            <Col lg={3} className="d-flex flex-column align-items-center justify-content-center">
                                <Image className="img-fluid rounded" width={100} src={dogWithBone} alt="" />
                                <div className="p-2">{booking.pets_selected}</div>
                            </Col>

                            <Col>
                                <Row className="d-flex">
                                    <Stack direction="horizontal" gap={1} className="my-3">
                                        <div className="fs-5"><Badge variant="primary" bg={getServiceVariant(booking.service)}>{booking.service}</Badge></div>
                                        <div className="fs-5"> <Badge bg={getStatusVariant(booking.status)}>{booking.status}</Badge></div>
                                        <ButtonGroup size="sm" className="d-none d-sm-flex d-flex ms-auto me-0">
                                            <Button size="sm" onClick={() => handleSendMessage(booking.id)}>Send Message</Button>
                                            {(booking.status === "pending" || booking.status === "accepted") && <Button onClick={() => handleStatusClick(booking, "canceled")}>Cancel</Button>}
                                        </ButtonGroup>
                                    </Stack>
                                </Row>

                                <Row className="d-flex flex-column">
                                    <Col>
                                        <Stack direction="horizontal" gap={3} className="my-3">
                                            <div className="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0">Dates:</div>
                                            <div className="bg-light-blue">{booking.start_date}</div>
                                            {booking.service === "Boarding" ? (<div>-</div>) : (<div className="bg-light-subtle" />)}
                                            {booking.service === "Boarding" ? (
                                                <div className="bg-light-blue">{booking.end_date}</div>
                                            ) : (
                                                <div className="bg-light-subtle" />
                                            )}
                                        </Stack>
                                        <Stack className="mb-3" direction="horizontal" gap={3}>
                                            <div className="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0">Time:</div>
                                            <div className="bg-light-blue">{convertTime(booking.start_time)}</div>
                                            <div>-</div>
                                            <div className="bg-light-blue">{convertTime(booking.end_time)}</div>
                                        </Stack>
                                    </Col>

                                    <Col className="d-flex align-items-end justify-content-end mb-3">
                                        <div className="fw-bold me-3">Total:</div>
                                        <div className="">${booking.tot_amt}</div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}
