// Desc: This file contains utility functions that are used in the application
import { createClient } from '@supabase/supabase-js';
import { StorageClient } from '@supabase/storage-js'
import { useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const adminId = import.meta.env.VITE_ADMIN_ID;
export const adminEmail = 'info@zillyandfriends.com';

//https://pet-ltzb.onrender.com
export function sendConfEmail(form) {
	axios.post("https://pet-ltzb.onrender.com/api/send-confirmation-email", form)
	  .catch(error => console.log(error.message))
}
export function sendNotificationEmail(form) {
	axios.post("https://pet-ltzb.onrender.com/api/send-notification-email", form)
		.catch(error => console.log(error.message))
}


export function sendBookingEmail(form) {
	axios.post("https://pet-ltzb.onrender.com/api/send-booking-email", form)
  .catch(error=>console.log(error))
}

export function sendCancelEmail(form) {
	axios.post("https://pet-ltzb.onrender.com/api/send-booking-email", form)
		.catch(error => console.log(error))
}
export const paypalClientId=import.meta.env.VITE_PAYPAL_RESTAPI_CLIENT_ID
export const paypalClientSecret = import.meta.env.VITE_PAYPAL_RESTAPI_CLIENT_SECRET

export const payPal_baseUrl='https://api-m.paypal.com/'
export const payPal_testUrl="https://api-m.sandbox.paypal.com/v1/oauth2/token"
export const baseUrl = import.meta.env.VITE_BASE_URL

export const apiKey = import.meta.env.VITE_GOOGLE_API_KEY

const options = {
  auth: {
    flowtype: true,
    persistSession: true,
    detectSessionInUrl: true
  },
}

export const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabaseUrl = 'https://fjfdhtjlejguyzhbijav.supabase.co'
export const supabase = createClient(supabaseUrl, supabaseKey, options)

export const SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_KEY

export const storageClient = new StorageClient(supabaseUrl, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
})

export function convertDate(inputDate) {
	if(!inputDate) return ""
  const dateObj = new Date(inputDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate
  }
 
export function handleKeyPress(event){
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}

export function convertTime(time){
 const parts = time.split(':')
 if (Number.parseInt(parts[0])>12){
   parts[2]="pm"
   parts[0]=(parts[0]-12)
 }else{
 parts[2]="am"
 }
  return `${parts[0]}:${parts[1]} ${parts[2]}`
 }


export function getProfile(user){
  const [profile, setProfile] = useState("");
  useEffect(()=>{
		const getProfile = async(e) => {
		try {
		  const { data, error, status } = await supabase
			.from('profiles')
			.select()
			.eq('id', user?.user?.id)
			.single()
	
		  if (error && status !== 406) {
			throw error
		  }
		  if (data) {
			setProfile([data]);
		  }
		} catch (error) {
		  console.log('Error loading user data!', error)
		}
	  }   
	  	getProfile() 
	}, [user?.user?.id]);
  return profile
} 

export function getPaidBooking(paymentId){
  const [booking, setBooking] = useState("");
  useEffect(()=>{
		const getProfile = async(e) => {
		try {
		  const { data, error, status } = await supabase
			.from('bookings')
			.select()
			.eq('id', paymentId)
			.single()
	
		  if (error && status !== 406) {
			throw error
		  }
		  if (data) {
			setBooking([data]);
		  }
		} catch (error) {
		  console.log('Error loading user data!', error)
		}
	  }   
	  	getBooking() 
	}, [paymentId]);
  return booking
} 



export function openSidebar() {
	if (typeof window !== 'undefined') {
	  document.body.style.overflow = 'hidden';
	  document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
	}
  }
  
  export function closeSidebar() {
	if (typeof window !== 'undefined') {
	  document.documentElement.style.removeProperty('--SideNavigation-slideIn');
	  document.body.style.removeProperty('overflow');
	}
  }
  
  export function toggleSidebar() {
	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	  const slideIn = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue('--SideNavigation-slideIn');
	  if (slideIn) {
		closeSidebar();
	  } else {
		openSidebar();
	  }
	}
  }




  export const FloatingLabelToggle = () => {
	const [isEditable, setIsEditable] = useState(false);
	const [inputValue, setInputValue] = useState('Sample Text');
	
	const handleEditToggle = () => {
	  setIsEditable(!isEditable);
	};
	
	const handleInputChange = (e) => {
	  setInputValue(e.target.value);
	};
  
	return (
	  <Container className="mt-5">
		<Form>
		  <Form.Group controlId="formFloatingLabel" className="mb-3">
			<Form.Label>Floating Label</Form.Label>
			{isEditable ? (
			  <Form.Control
				type="text"
				value={inputValue}
				onChange={handleInputChange}
			  />
			) : (
			  <Form.Control
				plaintext
				readOnly
				defaultValue={inputValue}
				className="form-control-plaintext"
			  />
			)}
		  </Form.Group>
		  <Button variant="primary" onClick={handleEditToggle}>
			{isEditable ? 'Save' : 'Edit'}
		  </Button>
		</Form>
	  </Container>
	);
  };
  
  export const Logout= () => {
	const navigate = useNavigate();
  
	async function signOut() {
	  const { error } = await supabase.auth.signOut({
		options: {
		  scope: 'global',
		}
	  });
	};
	  
	  signOut();
	  navigate("/");
	
  }