import "./Messaging.scss";
import { supabase, sendNotificationEmail, adminEmail} from "../../utils";
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import dog from '../../assets/dogwithbone.png';

import {format} from 'date-fns';

export default function Messaging({ userId, otherUserId, sender, senderEmail, recipientEmail}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(''); 
  const[payload,setPayload] = useState({})
  

 
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
   useEffect(() => {
    async function fetchData() {
      const fetchedMessages = await fetchMessages(userId, otherUserId);
      setMessages(fetchedMessages);
    }
    fetchData();
   
    // Listen for new messages
    const channels = supabase.channel('messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          setPayload(payload)
        }
      )
      .subscribe()

  }, [userId, otherUserId, payload]);


  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const message = await sendMessage(userId, otherUserId, newMessage);
        // biome-ignore lint/style/useConst: <explanation>
        let stamp = format(new Date(message.created_at), 'MMM d, yyyy h:mm aaa');
      
        const form = { sender: sender, message_content: message.content, time_received: stamp, to_email: recipientEmail, from_email: senderEmail };
       
        sendNotificationEmail(form);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error); // Error log
      }
    } 
  };

  return (
    <Container>
      <h3>COMING SOON!</h3>
      {/* <Card>
      <Row>
        <Col > 
            <ListGroup > 
            {messages.map(msg => (
              <div className={`d-flex ${msg.sender_id === userId ? 'align-self-end' : 'chat-left'}`} key={msg.id} >
                <div className="align-self-end">{format(new Date(msg.created_at), 'h:mm a')} </div>
              <ListGroup.Item  style={{maxWidth:"90%", width:"fit-content" }} className={`mb-3 border border-primary d-flex ${msg.sender_id === userId ? 'align-self-end' : 'chat-left'}`}>
                <Row>
                <Col >
                  <img src={dog} alt="avatar" width={50} height={50} />
                  <div className="text-primary"><strong>{msg.sender_id === userId ? `${sender}` : 'Zilly'}:</strong> </div>
                </Col>
                <Col className="chat-text">{msg.content}</Col>
                  </Row>
              
              </ListGroup.Item>
              </div>
            ))}
            <ListGroup.Item className="chat-left" as="li">
           
                  
                
                </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row>
          <Col>
         <Card.Footer className="d-flex flex-row flex-md-column border-0">   
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </Form.Group>
            <Button className="my-2" variant="primary" onClick={handleSendMessage}>Send</Button>
          </Form>
       </Card.Footer>
        </Col>
        </Row>
      </Card> */}
    </Container>
  );
}


async function fetchMessages(userId, otherUserId) {

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data;
}

export async function sendMessage(senderId, receiverId, content) {

  const { data, error } = await supabase
    .from('messages')
    .insert([{ sender_id: senderId, receiver_id: receiverId, content }])
    .select();
  if (error) {
    console.error('Error sending message:', error);
    return null;
  }

  return data[0];
}
