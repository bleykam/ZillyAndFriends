import { supabase, sendNotificationEmail, adminEmail } from "../../utils";
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';


export default function Messaging({ userId, otherUserId, sender,recipient}) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [payload, setPayload] = useState({})
    const[toEmail,setToEmail] = useState('')
    const [fromEmail,setFromEmail] = useState('')

    sender === "Admin" ? setToEmail(recipient) : setToEmail(adminEmail);
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
                    console.log('Change received!', payload)
                    setPayload(payload)
                }
            )
            .subscribe()

    }, [userId, otherUserId, payload]);


    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                const message = await sendMessage(userId, otherUserId, newMessage);
                const form = { sender: sender, message_content: message.content, time_received: message.created_at };
                console.log(form)
                sendNotificationEmail(form);
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message:', error); // Error log
            }
        }
    };

    return (
        <Container>
            <Card>
                <Row>
                    <Col>

                        <h2>Messages</h2>
                        <ListGroup>
                            {messages.map(msg => (
                                <ListGroup.Item key={msg.id} className={`mb-3 border border-primary  ${msg.sender_id === userId ? 'align-self-end text-end col-12 col-md-6' : 'col-12 col-md-6'}`}>
                                    <strong>{msg.sender_id === userId ? 'You' : 'Zilly'}:</strong> {msg.content}
                                </ListGroup.Item>
                            ))}
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
                                <Button variant="primary" onClick={handleSendMessage}>Send</Button>
                            </Form>
                        </Card.Footer>
                    </Col>
                </Row>
            </Card>
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
    console.log("dataX", data[0])

    if (error) {
        console.error('Error sending message:', error);
        return null;
    }

    return data[0];
}
