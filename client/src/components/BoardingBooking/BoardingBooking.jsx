import '../../pages/Booking/Booking.scss';
import '../../pages/CreateProfile/CreateProfile.scss';
import { useState, useEffect } from "react";
import { supabase, sendBookingEmail } from "../../utils";
import { calculateTotalPrice } from "../../functions";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setMinutes, startOfDay, eachDayOfInterval, format, getTime, setHours, endOfDay, addDays, addHours, isFuture, set } from "date-fns";

import { isHoliday } from "date-fns-holiday-us"

import { Container, InputGroup, CardGroup, Row, Col, Card, ButtonGroup, Button, Tab, Tabs, Form, FormCheck, FormControl } from 'react-bootstrap';

export default function Boarding({ profile, pets }) {
  const { email, first_name, last_name, pet_name, phone_number, id } = profile || [];
  const [dates, setDates] = useState([]);
  const [initialDates, setInitialDates] = useState(null);
  const [holidays, setHolidays] = useState(false)
  const [values, setValues] = useState({
    start_date: null,
    start_time: null,
    end_date: null,
    end_time: null,
    message: "",
    dates: [],
  });
  const [selectedPetNames, setSelectedPetNames] = useState([]);
  const numDogs = selectedPetNames.length;
  const navigate = useNavigate();
  const startDate = format(new Date(values.start_date), "yyyy-MM-dd");
  const startTime = format(new Date(values.start_time), "h:mm a");
  const endDate = format(new Date(values.end_date), "yyyy-MM-dd");
  const endTime = format(new Date(values.end_time), "h:mm a");
  const createdAt = format(new Date(), "MMM d, yyyy h:mm aaa");
  const dogNames = selectedPetNames?.toString();
  
  useEffect(() => {
    // biome-ignore lint/complexity/noForEach: <explanation>
    dates.forEach((date) => {
      const formattedDate = set(new Date(date), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
      isHoliday(new Date(formattedDate)) ? setHolidays(true) : "";
    });
  }, [dates]);


  const fee = calculateTotalPrice(values.start_time, values.end_time, 'boarding', holidays, numDogs) || 0;

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSelectChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPetNames(prevState =>
      checked
        ? [...prevState, name]
        : prevState.filter(petName => petName !== name)
    );
  };

  useEffect(() => {
    if (initialDates) {
      setDates(() =>
        initialDates.map((date) => format(new Date(date), "yyyy-MM-dd"))
      );
    }
  }, [initialDates]);

  useEffect(() => {
    if (values.end_date && values.start_date && values.end_date < values.start_date) {
      alert("start date must be before end date");
      return;
    }

    if (values.start_date && values.end_date) {
      setInitialDates(
        eachDayOfInterval({
          start: new Date(values.start_date),
          end: new Date(values.end_date),
        })
      );
    }
  }, [values.start_date, values.end_date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation

    if (!values.start_date || !values.end_date) {
      return alert("missing required field");
    }

    // If all validations pass, prepare form data for submission
    const formData = {
      pets_selected: selectedPetNames,
      service: "Boarding",
      start_date: startDate,
      start_time: startTime,
      end_date: endDate,
      end_time: endTime,
      message: values.message,
      status: "pending",
      dates: dates,
      tot_amt: fee
    };
    //info for email
    const userEmail = {
      id: id,
      service: "Boarding",
      info: values.message,
      from_name: first_name,
      from_email: email,
      pets_selected: dogNames,
      from_number: phone_number,
      start_date: startDate,
      start_time: startTime,
      end_time: endTime,
      end_date: endDate,
      first_name: profile?.first_name,
      last_name: profile?.last_name,
      full_name: profile.full_name,
      total: fee,
      created_at: createdAt
    };

    // Insert form data into the database
    supabase
      .from("bookings")
      .insert([formData])
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error inserting data:", error.message);
          return alert(
            "An error occurred while submitting the form. Please try again later."
          );
        }
        // Send confirmation email
        sendBookingEmail(userEmail);
        navigate(`/booking/${data[0].id}`);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Select Pets</Form.Label>
          {pets?.map((pet) => (
            <div key={pet.id} className="mb-3">
              <Form.Check
                type="checkbox"
                name={pet.pet_name}
                onChange={handleSelectChange}
                label={pet.pet_name}
              />
            </div>
          ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Drop Off Date</Form.Label>
          <DatePicker className="create__input picker" defaultValue="" selected={values.start_date} onChange={(date) => setValues({ ...values, start_date: date, start_time: null, end_time: null, end_date: null })} isClearable
            minDate={startOfDay(new Date())}
            toggleCalendarOnIconClick is dateFormat="MMMM d, yyyy" autoCompconste="off" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Drop Off Time</Form.Label>
          <DatePicker className="create__input picker" defaultValue="" selected={values.start_time} onChange={(time) => setValues({ ...values, start_time: time })} showTimeSelect showTimeSelectOnly
            timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa" autoCompconste="off"
            openToDate={new Date(values.start_date)}
            minTime={isFuture(values.start_date) ? setHours(setMinutes(new Date(values.start_date), 0), 6) : getTime(new Date())}
            maxTime={setHours(setMinutes(new Date(values.start_date), 45), 23)}
            // biome-ignore lint/complexity/noUselessTernary: <explanation>
            disabled={!values.start_date ? true : false} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Pick Up Date</Form.Label>
          <DatePicker className="create__input picker" defaultValue="" selected={values.end_date} onChange={(date) => setValues({ ...values, end_date: date })} isClearable
            minDate={addDays(new Date(values.start_date), 1)}
            // disabled ={!values.start_date?true:false}
            is dateFormat="MMMM d, yyyy" autoCompconste="off" required />
        </Form.Group>


        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Pick Up Time</Form.Label>
          <DatePicker className="create__input picker" defaultValue="" selected={values.end_time} onChange={(time) => setValues({ ...values, end_time: time })} showTimeSelect showTimeSelectOnly
            timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa" autoCompconste="off"
            openToDate={new Date(values.end_date)}
            minTime={setHours(setMinutes(new Date(values.end_date), 0), 6)}
            maxTime={setHours(setMinutes(new Date(values.end_date), 45), 23)}
            // biome-ignore lint/complexity/noUselessTernary: <explanation>
            disabled={!values.end_date ? true : false} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={5} name="message" onChange={handleChange} value={values.message}
            placeholder="Enter any additonal information about pets or request" />
        </Form.Group>



        <div className="loginbooking__fee">Total: ${fee}</div>
        <div className="loginbooking__field">
          <Button type="submit">
            Book!
          </Button>
        </div>

      </Form>
    </Container>
  )
}

