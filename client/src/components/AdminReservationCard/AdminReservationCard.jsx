import { Container, Button, Badge, Row, Col, Card, Image, ButtonGroup, Stack, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { supabase, sendConfEmail, convertDate, convertTime, adminEmail} from"../../utils";
import { isPast, format, isFuture, isSameDay, parseISO, eachDayOfInterval} from "date-fns";
import { useAuth } from "../../AuthContext";
import dogWithBone from "../../assets/dogwithbone.png"; // Add the correct path to your image
import "bootstrap/dist/css/bootstrap.min.css";


export default function AdminReservationCard({ bookings, timeFrame }) {
    const { user } = useAuth();
    const [cardBookings, setCardBookings] = useState([]);
    const [editingBookingId, setEditingBookingId] = useState(null);
    const [editedBooking, setEditedBooking] = useState({});
    const [conflict, setConflict] = useState(null);



    useEffect(() => {
        let filterBookings;
        if (timeFrame === "upcoming") {
            filterBookings = bookings?.filter((booking) =>
                isFuture(new Date(booking.start_date))
            );
        } else if (timeFrame === "past") {
            filterBookings = bookings?.filter((booking) =>
                isPast(new Date(booking.start_date))
            );
        } else if (timeFrame === "current") {
            const today = new Date();
            filterBookings = bookings?.filter((booking) => {
                return (
                    (booking.service === "Daycare" &&
                        isSameDay(parseISO(booking.start_date), today)) ||
                    (booking.service === "Boarding" &&
                        booking.dates.some((date) => isSameDay(parseISO(date), today)))
                );
            });
        } else {
            filterBookings = bookings?.filter(
                (booking) => booking.status === "pending"
            );
        }
        setCardBookings(filterBookings);
    }, [bookings, timeFrame]);

 


    const handleStatusClick = async (booking, status) => {
        const startTime = format(new Date(booking.start_date), "hh:mm aaa");
        const endTime = format(new Date(booking.end_date), "hh:mm aaa");
        const startDate = format(new Date(booking.start_date), "MMM-dd-yyyy");
        const endDate = format(
            new Date(booking.end_date || booking.start_date),
            "MMM-dd-yyyy"
        );

        const form = {
            first_name: booking.profiles.first_name,
            pet_name: booking.pets_selected,
            service: booking.service,
            start_date: startDate,
            start_time: startTime,
            end_time: endTime,
            end_date: endDate || startDate,
            ...(booking.service === "boarding" ? { end_date: booking.end_date } : {}),
            status: status,
            total: booking.tot_amt,
            user_email: user?.email,
            admin_email: adminEmail,

        };

        const { data, error } = await supabase
            .from("bookings")
            .update({ status: status })
            .eq("id", booking.id)
            .select();
        sendConfEmail(form);
        console.log("Form2", form);
        alert("Booking request changed");
    };

    const handleEditClick = (booking) => {
        setEditingBookingId(booking.id);
        setEditedBooking(booking);
    };

    const handleSaveClick = async () => {


        const { data, error } = await supabase
            .from("bookings")
            .update(editedBooking)
            .eq("id", editedBooking.id)
            .select();

        if (error) {
            console.error("Error saving booking:", error);
        } else {
            setCardBookings((prev) =>
                prev.map((b) => (b.id === editedBooking.id ? editedBooking : b))
            );
            setEditingBookingId(null);
        }
    };

    const handleCancelClick = () => {
        setEditingBookingId(null);
        setEditedBooking({});
    };

    const handleMessageClick = (user, booking) => {
        // Handle sending a message
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBooking((prev) => ({ ...prev, [name]: value }));
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case "pending":
                return "warning";
            case "approved":
                return "success";
            case "rejected":
                return "danger";
            case "canceled":
                return "info";
            default:
                return "primary";
        }
    };

    const getServiceVariant = (service) => {
        switch (service) {
            case "Boarding":
                return "primary";
            case "Daycare":
                return "secondary";
            default:
                return "primary";
        }
    };

   function bookingRange(booking){
        if (booking.service === "Boarding") {
            let start_date = new Date(booking.start_date);
            let end_date = new Date(booking.end_date);

      

            // Check if dates are valid
            if (Number.isNaN(start_date) || Number.isNaN(end_date)) {
                console.error("Invalid date(s) found:", { start_date, end_date });
                return null; // Skip this booking
            }

            // Check date order
            if (end_date < start_date) {
                console.error("Invalid date range:", { start_date, end_date });
                return null; // Skip this booking
            }

            // Get each day of the interval
            const days = eachDayOfInterval({
                start: start_date,
                end: end_date,
            });

            return days;
        }

        return booking.start_date;
    };

    
    return (
        <Container className="px-xs-0 gx-0 gx-md-2px-md-2 mt-3" fluid>

            {cardBookings?.map((booking) => (
                <Card key={booking.id} className="mb-5 position-relative booking">
                    <Card.Body>
                        <Row>
                            <Col className="d-flex justify-content-between mb-3">
                                <Image
                                    className="img-fluid rounded"
                                    width={100}
                                    src={dogWithBone}
                                    alt=""
                                />
                                <div className="d-flex flex-column">
                                    <ButtonGroup size="sm" className="d-flex align-self-start">
                                        <Button onClick={() => handleStatusClick(booking, "rejected")}>
                                            Reject
                                        </Button>
                                        <Button onClick={() => handleStatusClick(booking, "accepted")}>
                                            Accept
                                        </Button>
                                        <Button onClick={() => handleStatusClick(booking, "canceled")}>
                                            Cancel
                                        </Button>
                                    </ButtonGroup>
                                    <ButtonGroup size="sm" className="d-flex align-self-start">
                                        <Button onClick={() => handleMessageClick(user?.id, booking.id)}>
                                            Send Message
                                        </Button>
                                        {editingBookingId === booking.id ? (
                                            <>
                                                <Button onClick={handleSaveClick}>Save</Button>
                                                <Button onClick={handleCancelClick}>Cancel</Button>
                                            </>
                                        ) : (
                                            <Button onClick={() => handleEditClick(booking)}>
                                                Edit
                                            </Button>
                                        )}
                                    </ButtonGroup>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Stack direction="vertical" gap={1} className="my-3">
                                    <div className="mb-3">
                                        {editingBookingId === booking.id ? (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Start Date</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="start_date"
                                                    value={editedBooking.start_date}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        ) : (
                                            <Card.Title>Start Date{convertDate(booking.start_date)}</Card.Title>
                                        )}
                                    </div>
                                    <br />
                                    <div className="mb-3">
                                        {booking.service === "boarding" && editingBookingId === booking.id ? (
                                            <Form.Group className="mb-3">
                                                <Form.Label>End Date</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="start_date"
                                                    value={editedBooking.end_date}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        ) : (
                                            <Card.Title>End Date:{booking.end_date}</Card.Title>
                                        )}
                                    </div>
                                    <hr />
                                    <div className="mb-3">
                                        {editingBookingId === booking.id ? (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Start Time</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="start_date"
                                                    value={editedBooking.start_time}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        ) : (
                                            <Card.Title>Start Time: {convertTime(booking.start_time)}</Card.Title>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        {editingBookingId === booking.id ? (
                                            <Form.Group className="mb-3">
                                                <Form.Label> End Time</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="start_date"
                                                    value={editedBooking.end_time}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        ) : (
                                            <Card.Title>End Time: {convertTime(booking.end_time)}</Card.Title>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        {editingBookingId === booking.id ? (
                                            <Form.Group className="mb-3">
                                                <Form.Label>Dates</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="dates"
                                                    value={editedBooking.dates}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        ) : (
                                            <Card.Title>Dates:</Card.Title>
                                        )}
                                    </div>

                                </Stack>
                            </Col>
                            <Col className="b">
                                <Stack gap={3}>
                                    <Badge bg={getServiceVariant(booking.service)} className="text-center">
                                        {booking.service}
                                    </Badge>
                                    <Badge bg={getStatusVariant(booking.status)} className="text-center">
                                        {booking.status}
                                    </Badge>
                                </Stack>
                            </Col>
                            <Col>
                                <Card.Text as="div">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className=" my-3">
                                            <div className="fw-bold">Pet Name</div>
                                            <div>
                                                {editingBookingId === booking.id ? (
                                                    <Form.Control
                                                        type="text"
                                                        name="pets_selected"
                                                        value={editedBooking.pets_selected}
                                                        onChange={handleChange}
                                                    />
                                                ) : (
                                                    booking.pets_selected
                                                )}
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="my-3">
                                            <div className="fw-bold">Client</div>
                                            <div>
                                                {editingBookingId === booking.id ? (
                                                    <Form.Control
                                                        type="text"
                                                        name="profiles.full_name"
                                                        value={editedBooking.profiles.full_name}
                                                        onChange={handleChange}
                                                    />
                                                ) : (
                                                    booking.profiles.full_name
                                                )}
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="my-3">
                                            <div className="fw-bold">Email</div>
                                            <div>
                                                {editingBookingId === booking.id ? (
                                                    <Form.Control
                                                        type="email"
                                                        name="profiles.email"
                                                        value={editedBooking.profiles.email}
                                                        onChange={handleChange}
                                                    />
                                                ) : (
                                                    booking.profiles.email
                                                )}
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="my-3">
                                            <div className="fw-bold">Phone</div>
                                            <div>
                                                {editingBookingId === booking.id ? (
                                                    <Form.Control
                                                        type="text"
                                                        name="profiles.phone_number"
                                                        value={editedBooking.profiles.phone_number}
                                                        onChange={handleChange}
                                                    />
                                                ) : (
                                                    booking.profiles.phone_number
                                                )}
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
}
