import { useState, useContext, useEffect} from "react";
import { Link, useParams, useNavigate} from "react-router-dom"
import { supabase, paypalClientId } from '../../utils';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";


function Message({ content }) {
  return <p>{content}</p>;
}

/**
 * Renders PayPal payment buttons and handles payment processing.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.tot_amt - The total amount to be paid.
 * @param {string} props.service - The description of the service being paid for.
 * @param {string} props.id - The ID of the payment.
 * @returns {JSX.Element} The rendered component.
 */
export function PayButtons({tot_amt, service, id}){
  const [message, setMessage] = useState("");
  const [orderId, setorderId]=useState("");
  const[paymentComplete, setPaymentComplete] = useState(false)
  const navigate=useNavigate()
  const initialOptions = {
    clientId: "test",
    enableFunding: "venmo",
    disableFunding: "card,credit",
    currency: "USD",
    intent: "capture",

  };
  const createOrder = async () => {
    try {
      const response = await fetch("http://localhost:8888/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
          cart: [
            {
              id:id,
              description: service,
    
            },
          ],
        }),
      });
   
      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      }
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
    } catch (error) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...${error}`);
    }
  }
  

 const onApprove=async (data, actions) => {
    try {
      const response = await fetch(
        `http://localhost:8888/api/orders/${data.orderID}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const orderData = await response.json();
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      }if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(
          `${errorDetail.description} (${orderData.debug_id})`,
        );

      // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction =
          orderData.purchase_units[0].payments.captures[0];
        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
        );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2),
        );
      }

    } catch (error) {
      console.error(error);
      setMessage(
        `Sorry, your transaction could not be processed...${error}`,
      );
    }
  }

  const onCreateOrder = (data,actions) => {
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: tot_amt,
                },
            },
        ],
    });
}

const onApproveOrder = (data,actions) => {
  return actions.order.capture().then((details) => {
  const name = details.payer.name.given_name;
        setPaymentComplete(true)
        setorderId(data.orderID)
    alert(`Transaction completed by ${name}`);
  });

}
useEffect(()=>{
  const updatePayment= async(e) => {
  try {
    const { data, error } = await supabase
    .from('bookings')
    .update({ 'amt_paid': tot_amt })
    .eq('id', id)
    .select()
  }catch (error) {
    console.log('Error updating booking!', error)
    }
  }   
  if(paymentComplete){
    updatePayment();
    navigate('/profile')
  }
}, [paymentComplete, navigate, id, tot_amt]);

const ButtonWrapper = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
      <>
          { (showSpinner && isPending) && <div className="spinner" /> }
          <PayPalButtons
              className="payment__buttons"
              createOrder={(data, actions) => onCreateOrder(data, actions)}
              onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
      </>
  );
}



  return (
      <PayPalScriptProvider options={initialOptions}>
          <ButtonWrapper showSpinner={false} />
      </PayPalScriptProvider>
  );
}




export function PayLater({tot_amt, service, id}){
    const navigate=useNavigate()
    const updatePayment= async(e) => {
    try {
      const { data, error } = await supabase
      .from('bookings')
      .update({ 'amt_remain': tot_amt })
      .eq('id', id)
      .select()
    }catch (error) {
      console.log('Error updating booking!', error)
      }
      navigate('/profile')
    };   
     
  return (
    <button className="paylater-button" onClick={updatePayment} type="submit">
      Pay Later
    </button>
  )
}