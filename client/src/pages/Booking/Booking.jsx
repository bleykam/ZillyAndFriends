import "./Booking.scss";
import '../../pages/CreateProfile/CreateProfile.scss';
import { useState, useEffect } from "react";
import { supabase, getProfile, } from "../../utils";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col, Container,  Card, Tab, Tabs, Form, FormCheck, FormControl} from 'react-bootstrap';
import Daycare from "../../components/DaycareBooking/DaycareBooking";
import Boarding from "../../components/BoardingBooking/BoardingBooking";

export default function BookingForm() {
  const userObj = localStorage.getItem("sb-fjfdhtjlejguyzhbijav-auth-token");
  const user = JSON.parse(userObj);
  const profile = getProfile(user);
  const [profileInfo] = profile || [];
  const [pets, setPets] = useState([]);

  const [key, setKey] = useState('Boarding');

  useEffect(() => {
    const getPets = async () => {
    
      try {
        // biome-ignore lint/style/useConst: <explanation>
        let { data, error } = await supabase
          .from('pets')
          .select()
          .eq('user_id', profileInfo?.id);
        if (error) {
          throw error;
        }

        setPets(data);
      }

      catch (error) {
        console.log('Error loading pet data!', error);
      }
    };
    getPets();
  }, [profileInfo]);


 

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
  <Container className="mt-5">
    
    <Tabs
    id="controlled-tab-example"
    activeKey={key}
    onSelect={(k) => setKey(k)}
   
  >

    <Tab className="m-5" eventKey="Daycare" title="Daycare">
    <Daycare profile={profileInfo} pets={pets} />
    </Tab>
    <Tab eventKey="Boarding" title="Boarding">
    <Boarding profile={profileInfo} pets={pets} />
    </Tab>

  </Tabs>
  </Container>
 
  );
}








