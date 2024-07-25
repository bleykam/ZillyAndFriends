import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import cors from "cors";
const port = 8888;
import nodemailer from "nodemailer";
import {format} from "date-fns";






const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;
// const base = "https://api-m.paypal.com";
//sandbox base
const base= "https://api-m.sandbox.paypal.com"

const app = express();

// host static files
app.use(express.static("client"));

// parse post params sent in body in json format
app.use(express.json());
app.use(cors("*"));
/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */

const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
 
    const auth = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */

const createOrder = async (cart) => {
  const {id, tot_amt, service}=cart
 
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    cart
    
  );

  const accessToken = await generateAccessToken();

  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: 10,
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

/**
 * Capture payment for the created order to compconste the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */

const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });
  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

app.post("/api/orders", async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});


//CONFIRMATION EMAILS */

app.post('/api/send-confirmation-email', async (req, res) => {

  const { 
    user_email, 
    admin_email,
    first_name, 
    service, 
    start_date, 
    start_time, 
    end_date, 
    end_time, 
    total, 
    status, 
    pet_name, 
  } = req.body;

const transporter = nodemailer.createTransport({
  host: "smtp.ionos.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


  // Define the Admin Acceptance email content
  const message = {
    from: admin_email,
    to: user_email,
    subject: "Booking Confirmation",
    text: `🐾 Your booking for ${service} from has been ${status}! 🐾`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #5C667E;
                margin: 1rem;
                padding: 1rem;
                font-size: 1rem;
                line-height: 1.5;
            }
            .container {
                max-width: 600px;
                margin: auto;
                padding: 1rem;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #FAFAFA;
            }
            .heading {
                font-size: 1.25rem;
                font-weight: bold;
                text-align: center;
                margin-bottom: 1rem;
            }
            .content {
                margin-bottom: 1rem;
                margin-right: 1rem;
                margin-left: 1rem;
            }
            .payment {
                margin-bottom: 1rem;
                padding: 1rem;
          
            }
                 .section {
                margin-bottom: 1rem;
                padding: 1rem;
                border: 1px solid #3AA8C1;
                border-radius: 8px;
                background-color: #FFFFFF;
            }
            .section h2 {
                font-size: 1.1rem;
                font-weight: bold;
                color: #3AA8C1;
                margin-bottom: 0.5rem;
            }
            .section p {
                margin: 0;
                padding: 0;
            }
            .details {
                margin: 0.5rem 0;
            }
            .details .label {
                font-weight: bold;
            }
            .footer {
                text-align: start;
                font-size: 1rem;
                margin: 1rem;
                font-style: italic;
            }
                .booking{
                font-size: 1.1rem;
                font-weight: bold;
                color: #3AA8C1;
                margin-bottom: 0.5rem;
                }
        </style>
    </head>
    <body>
        <div class="container">

            <div class="content">
                <p> Hi ${first_name},</p>
            </div>
            <div class="content">
            <p>We are thrilled to have the opportunity to host Jade and Bear!
                <p>If you would like to schedule a meet and greet before their stay or if you have any questions, feel free to call or text me at 727-313-0062, or simply reply to this email.</p>
                <p>Please note that payment is required prior to the beginning of the stay. You can make the payment through PayPal, Venmo, or Zelle:</p>
                <div class="payment">
                    <ul style="font-weight: bold">Payment Methods:</ul>
                    <li>Zelle: Look up by phone number 727-313-0062</li>
                    <li>PayPal: PayPal.me/BrittanyLeykam1</li>
                    <li>Venmo: Venmo.com/Brittany-Godzilla</li>
                </div>
                <div class="section">
                    <ul class="booking">Booking Details</ul>
                    <li class=details class="details"><span class="label">Pet's Name:</span> ${pet_name}</li>
                    <li class=details class="details"><span class="label">Service:</span> ${service}</li>
                    <li class=details class="details"><span class="label">From:</span> ${start_date} at ${start_time}</li>
                    <li class=details class="details"><span class="label">To:</span> ${end_date} at ${end_time}</li>
                    <li class=details class="details"><span class="label">Total:</span> ${total}</li>
                </div>
            </div>
            <div class="footer">
                🐾 Paw-sitively Yours 🐾 <br>
                Zilly & Friends
            </div>
        </div>
    </body>
    </html>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
    // biome-ignore lint/style/noCommaOperator: <explanation>
    res.status(500).json({ error: (error,'Failed to send email- last step') });
  }
});

// BOOKING Erequest EMAIL
app.post('/api/send-booking-email', async (req, res) => {
 
  const {
    service,
    start_date,
    start_time,
    end_date,
    end_time,
    pets_selected,
    full_name,
    from_name,
    last_name,
    info,
    id,
    total,
    created_at,
  } = req.body;
      const startTime = format(new Date(start_date), "hh:mm aaa");
      const endTime = format(new Date(end_date), "hh:mm aaa");
      const startDate = format(new Date(start_date), "M-dd-yyyy");
      const endDate = format(new Date(end_date || start_date), "M-dd-yyyy");


const transporter = nodemailer.createTransport({
  
  host: "smtp.ionos.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  // Define the Booking requestEmail content
  const message = {
    from: "Zilly & Friends <info@zillyandfriends.com>",
    to: "godzillaspetsitting@gmail.com",
    subject: `${service} Inquiry`,
    text: "Thank you for your Inquiry with Zilly & Friends",
    html: `
  <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'MODERN_SANS', sans-serif;
      background-color: #F5F5F5;
    }
    .container {
      background-color: #FFFFFF;
      border: 4px solid #3AA8C1;
      border-radius: 4px;
      color: #5C667E;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 20px;
      font-size: 24px;
    }
    .content {
      padding: 16px;
    }
    .footer {
      padding: 16px;
      text-align: start;
    }
      .message{
        padding: 16px;
        text-align: start;
        font-size: 20px;
      }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      🐾 ${first_name} is requesting ${service} for ${pets_selected} 🐾
    </div>
    <div class="content">
      <div class="content">Pet Name: ${pets_selected}</div>
      <div class="content">Service: ${service}</div>
      <div class="content">From: ${startDate} at ${startTime}</div>
      <div class="content">To: ${endDate} at ${endTime}</div>
      <div class="content">Received: ${created_at}</div>
      <divclass="content">Message: ${info}</div>
    </div>
    <div class="footer">
      🐾 Paw-sitively Yours! <br />
      Zilly & Friends
    </div>
  </div>
</body>
</html>
  `,
  };
  

  try {
    // Send the Booking request email
    await transporter.sendMail(message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    // biome-ignore lint/style/noCommaOperator: <explanation>
    res.status(500).json({ error: (error,'Failed to send email- last step') });
  }
});


// Message Notification Email


app.post("/api/send-notification-email", async (req, res) => {
  console.log("req recieved", req.body);
  const { sender, message_content, time_received, from_email, to_email } =
    req.body;
console.log(from_email, to_email)
const transporter = nodemailer.createTransport({
  host: "smtp.ionos.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  // Define the Message Notification Cntent
  const message = {
    from: from_email,
    to: to_email,
    subject: "Notification",
    text: `🐾 You Recieved a Message From ${sender}! 🐾`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .container {
      background-color: #FFFFFF;
      border: 1px solid #3AA8C1;
      border-radius: 4px;
      padding: 16px;
      color: #5C667E;
    }
    .header {
      text-align: center;
      font-size: 24px;
    }
    .content {
      margin: 16px 0;
    }
    .footer {
      text-align: center;
      margin-top: 32px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">🐾 You Received a Message 🐾</div>
    <div class="content">
      <div>From: ${sender}</div>
      <div>Received: ${time_received}</div>
      <div>${message_content}</div>
    </div>
    <div class="footer">
      🐾 Paw-sitively Yours! <br />
      Zilly & Friends
    </div>
  </div>
</body>
</html>
  `,
  };

  try {
    // Send the message notification email
    await transporter.sendMail(message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    // biome-ignore lint/style/noCommaOperator: <explanation>
    res.status(500).json({ error: (error, "Failed to send email- last step") });
  }
});




// User Cacellation Email


app.post("/api/send-cancel-email", async (req, res) => {

   const {
     user_email,
     admin_email,
     first_name,
     service,
     start_date,
     start_time,
     end_date,
     end_time,
     total,
     status,
     pet_name,
   } = req.body;
    req.body;

    const startT= format(new Date(start_date), "hh:mm aaa");
    const endT = format(new Date(end_date), "hh:mm aaa");
    const startD = format(new Date(start_date), "M-dd-yyyy");
    const endD = format(new Date(end_date), "M-dd-yyyy");

const transporter = nodemailer.createTransport({
  host: "smtp.ionos.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  // Define the User Cacellation email content
  const message = {
    from: admin_email,
    to: user_email,
    bcc: admin_email,
    subject: "Reservation Cancelled",
    text: "🐾 You Reservation Has Been Canceled! 🐾",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { background-color: #FFFFFF; border: 1px solid #3AA8C1; border-radius: 4px; padding: 16px; color: #5C667E; }
          .header { text-align: center; font-size: 24px; }
          .content { margin: 16px 0; }
          .footer { text-align: center; margin-top: 32px; }
        </style>
      </head>
      <body style="margin-top: 2rem; font-family: Arial, sans-serif; font-size: 24px; width: 75%; margin: auto; text-align: start;">
        <section style="margin: 2rem; background-color: #FFFFFF;padding: 16px; color: #5C667E;">
          <div class="heading" style="padding-bottom: 1rem;">Hi ${first_name},</div>
          <div class="top" style="padding-bottom: 1rem;">
            Thank you for contacting us regarding your reservation. We would like to confirm that your reservation for
            ${
              service === "boarding"
                ? `${service} for ${pet_name} from ${startD} to ${endD} has been canceled.`
                : `${service} for ${pet_name} from ${startD} at ${startT} to ${endT}  has been canceled.`
            }
          </div>
          <div class="top" style="padding-bottom: 1rem;  color: #5C667E;"">
            If you have paid for your reservation, a refund will be processed within 48 hours through the same payment method you used for the transaction.
          </div>
        </section>
        <div class="salutation" style="margin: 3rem; color: #5C667E;">
          <div class="sal-info">🐾 Paw-sitively Yours!</div>
          <div class="sal-info">Zilly & Friends</div>
        </div>
      </body>
      </html>
  `,
  };

  try {
    // Send the User Cacellation Email

    await transporter.sendMail(message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    // biome-ignore lint/style/noCommaOperator: <explanation>
    res.status(500).json({ error: (error, "Failed to send email- last step") });
  }
});



app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
});