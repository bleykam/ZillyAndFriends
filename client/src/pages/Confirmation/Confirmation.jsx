import "../Payment/Payment.scss";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom"
import { supabase} from '../../utils';
import {format} from "date-fns";
import { Container, CardGroup,Row, Col, Card, ButtonGroup, Button} from 'react-bootstrap';
export default function Confirmation() {
  const customId=useParams();
  const id =customId.bookingId;
  const[booking, setBooking]=useState("");
  const [bookingInfo]=booking;
  const {tot_amt, service, dates, start_time, end_time, end_date, start_date, pets_selected}=bookingInfo || "";
  const startTime=start_time?.split(":");
  const endTime=end_time?.split(":");
  // biome-ignore lint/style/useConst: <explanation>
  let date;

  const formatStartTime =
			startTime?.[0] >= 12
				? `${startTime?.[0] - 12}:${startTime?.[1]} pm`
				: `${startTime?.[0]}:${startTime?.[1]} am`;
  const formatEndTime =
			endTime?.[0] >= 12
				? `${endTime?.[0] - 12}:${endTime?.[1]} pm`
				: `${endTime?.[0]}:${endTime?.[1]} am`;
  const guests=pets_selected?.toString();


  useEffect(()=>{
    async function getBookings(){
      try {
        // Fetch data from the "bookings" table
        const { data, error, status } = await supabase
          .from("bookings")
          .select()
          .eq("id", id);

        // Handle error response
        if (error && status !== 406) {
          throw error;
        }

        // Set booking data if available
        if (data) {
          setBooking(data);
        } else {
          // Handle empty data
        }
      } catch (error) {
        console.log('Error loading bookings data!', error);
      } 
    }
          getBookings();
      }, [id]);

    

    date = service === "Boarding" ? `${format(new Date(dates?.[0]), 'MMM dd, yyyy ')} - ${format(new Date(dates?.[dates.length-1]), 'MMM dd, yyyy')}` : dates;

    return (
					<Container>
						<Row className="justify-content-center">
							<Col xs={12} md={8}>
								<Card className="m-5 border-primary">
									<Card.Title className="fs-2 p-2 d-flex justify-content-center">
										🐾 {service?.toUpperCase()} REQUEST DETAILS 🐾
									</Card.Title>
									<Card.Body className="payment__details">
										<Card.Text className="payment__service">
											<span className="payment__label">Service: </span>
											<span className="payment__text">{service}</span>
										</Card.Text>
										<Card.Text className="payment__service">
											<span className="payment__label">Guests: </span>
											<span className="payment__text">{guests}</span>
										</Card.Text>
										<div className="payment__service">
											<span className="payment__label">Date: </span>
											<span className="payment__text">{date}</span>
										</div>
										<div className="payment__service">
											<span className="payment__label">Drop Off Time: </span>
											<span className="payment__text">{formatStartTime}</span>
										</div>
										<div className="payment__service">
											<span className="payment__label">Pick Up Time: </span>
											<span className="payment__text">{formatEndTime}</span>
										</div>
										<Card.Text as="div" className="payment__payment">
											<span className="payment__label">Total: </span>
											<span className="payment__total">${tot_amt}</span>
										</Card.Text>
									</Card.Body>
									<Card.Footer className="text-center">
										Your reservation is NOT yet confirmed. After you submit your
										reservation request, You will receive a confirmation
										response within two hours between 8 AM and 7 PM. If you need
										immediate assistance, please call or text 727-313-0062
									</Card.Footer>
								</Card>
							</Col>
						</Row>
					</Container>
				);
}


