
import "./Payment.scss";
import { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom"
import { supabase} from '../../utils';
import { PayButtons, PayLater} from "../../components/PayButtons/PayButtons";
import {format} from "date-fns";


export default function Payment(){
  let customId=useParams();
  const id =customId.paymentId;
  const [amount, setAmount]=useState("");
  const[booking, setBooking]=useState("");
  const [bookingInfo]=booking;
  const {tot_amt, service, dates, start_time, end_time}=bookingInfo || ""
  let date;
  let startTime = format(new Date(start_time), "h:mm a");
  let endTime = format(new Date(end_time), "h:mm a");

service === "Boarding" ? ( date=`${format(new Date(dates?.[0]), 'MMM dd, yyyy hh:mm aa')} - ${format(new Date(dates?.[dates.length-1]), 'MMM dd, yyyy hh:mm aa')}`):date=dates;


    
    useEffect(()=>{
      async function getBookings(){
        try {
          let { data, error, status } = await supabase
            .from("bookings")
            .select()
            .eq("id", id);
            if (error && status !== 406) {
              throw error
            }
            if (data) {
              setBooking(data);
            }else{
              }
            } catch (error) {
              console.log('Error loading bookings data!', error)
            } 
          }
            getBookings();
        }, []);

   
    return(
      <section className="payment">
        <div className="payment__details">
          <h2 className="payment__heading">🐾 PAYMENT DETAILS 🐾</h2>
          <div className="payment__service"><span className='payment__label'>Service: </span><span className='payment__text'>{service}</span></div>
          <div className="payment__service"><span className='payment__label'>Date: </span><span className='payment__text'>{date}</span></div>
          <div className="payment__payment"><span className='payment__label'>Total: </span><span className='payment__total'>${tot_amt}</span></div>
        </div>
       
         <PayLater tot_amt={tot_amt} service={service} id={id} />
         <PayButtons tot_amt={tot_amt} service={service} id={id} />
         <div className="payment__terms">
          "The PayPal Privacy Statement is available at PayPal.com."  
          <Link href={'https://' + "www.paypal.com/us/legalhub/privacy-full"} target='_blank' rel='noreferrer'>Terms & Conditons</Link>
        </div> 
      </section>
    )
}

