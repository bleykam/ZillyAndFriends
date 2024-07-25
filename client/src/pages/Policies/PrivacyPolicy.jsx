import './PrivacyPolicy.scss';
import { Link } from 'react-router-dom';

export const PrivacyPolicy = () => {
  
    return (
      <div className="privacy-policy">
        <h1 className="privacy-policy__header">Privacy Policy for Zilly & Friends Dog Boarding and Daycare</h1>
        <p className="privacy-policy__body">Effective Date: 12/23/2023</p>
        
        <h2 className="privacy-policy__title">1. Introduction </h2>
        <p className="privacy-policy__body">This Privacy Policy describes how Zilly & Friends Dog Boarding and Daycare("we," "us," or "our") collects, uses, and shares 
            personal information when you use our web application.</p>
           
        <h2 className="privacy-policy__title">2. Information We Collect</h2>
        <div className="privacy-policy__body"> <p className="privacy-policy__sub-title"> a. Personal Information</p></div>
        <p className="privacy-policy__body">User Provided Information: We may collect information that you provide when you use the Web App, such as your name, email address, 
            and other information you choose to provide.

            Automatically Collected Information: We may automatically collect certain information when you use the Web App, including but not 
            limited to device information, IP address, browser type, and usage information.</p> 

            <p className="privacy-policy__sub-title">b. Non-Personal Information</p>

            <p className="privacy-policy__body">We may also collect non-personal information, such as aggregated data or anonymized information, which cannot be used to identify you personally.</p>

        <h2 className="privacy-policy__title">3. How We Use Your Information</h2>
        <p className="privacy-policy__body">
            We may use the collected information for the following purposes:</p>
            <ul className="privacy-policy__list">
                <li className="privacy-policy__item">To provide and maintain the Web App.</li>
                <li className="privacy-policy__item">To improve and personalize user experience.</li>
                <li className="privacy-policy__item">To send periodic emails or notifications.</li>
                <li className="privacy-policy__item">To respond to your inquiries, comments, or feedback.</li>
                <li className="privacy-policy__item">For analytics and research purposes.</li>
            </ul>
        

        <h2 className="privacy-policy__title">4. Data Security</h2>
        <p className="privacy-policy__body">We take reasonable measures to protect the information we collect from unauthorized access, disclosure, alteration, and destruction. 
            However, no data transmission or storage system can be guaranteed to be 100% secure.</p>

        <h2 className="privacy-policy__title">5. Third-Party Services</h2>
        <p className="privacy-policy__body">The Web App may integrate with third-party services. We are not responsible for the privacy practices or the content of such third-party services.</p>
       
        <h2 className="privacy-policy__title">6. Children's Privacy</h2>
        <p className="privacy-policy__body">The Web App is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. 
            If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will 
            take steps to delete such information.</p>
        
        <h2 className="privacy-policy__title">7. Changes to This Privacy Policy</h2>
        <p className="privacy-policy__body">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. 
            Changes are effective immediately upon posting.</p>
       
        <h2 className="privacy-policy__title">8. Contact Us</h2>
        <p className="privacy-policy__body">If you have any questions or concerns about our Privacy Policy, please contact us at info@zillyandfriends.com.</p>

      </div>
    );
  };
  
  export default PrivacyPolicy;



export const TransactionalEmailConsent =() =>{
    return (

   <section> 

    <p>By clicking Continue, you acknowledge you have read and agreed to our Terms of Use and <Link to='/PrivacyPolicy'>Privacy Policy</Link>Privacy. Message and data rates may apply. View our Mobile Alerts Terms.</p>
    <p>By providing your email address and clicking the "Confirm" button below, you consent to receive transactional emails from [Your Company Name]. 
    These emails are necessary for the completion of transactions you initiate, such as order confirmations, shipping updates, account notifications, 
    and other essential communications related to your interactions with our platform.
    You understand that these transactional emails are an integral part of the service we provide, 
    and you cannot opt out of receiving them while using our platform. 
    However, you may choose to unsubscribe from non-essential marketing communications separately.

    Thank you for your consent.</p>

    <button>Confirm</button>
    </section>
    )
}