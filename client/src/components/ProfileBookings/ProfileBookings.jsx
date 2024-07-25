import "./ProfileBookings.scss";import {useState, useEffect} from 'react';

import{supabase} from '../../utils';
import { Container, Row, Col, Tab, Tabs, Table, Form, Button, ListGroup, Card } from 'react-bootstrap';





export default function ProfileBookings() {
  const [loading, setLoading] = useState(false);
  const [bookings,setBookings ] = useState([]);

    
      async function getBookings() {
        try {
          let { data, error } = await supabase
            .from('bookings')
            .select(`*,
          profiles (
            *
          )
        `)
    	setBookings(data);
      setLoading(false);
      
    	}catch (error) {
          console.log('Error loading user data!', error)
        }
      }
    
      useEffect(() => {
        getBookings()
      }, []);
    
  return (
    <>
        <Tab.Container className="mb-3" id="left-tabs-example" defaultActiveKey="first">
    <Row>
      <Col sm={3}>
        <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link eventKey="first">Tab 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Tab 2</Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col sm={9}>
        <Tab.Content>
          <Tab.Pane eventKey="first"><HumanInfo profiles={ profiles} pets={pets} /></Tab.Pane>
          <Tab.Pane eventKey="second"><ProfileBookings /></Tab.Pane>
          <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
    </>
    


    );
}


