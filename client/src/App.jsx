import './App.scss';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './AuthContext';
import Home from './pages/Home/Home'
import Reviews from "./pages/Reviews/Reviews";
import Services from "./pages/Services/Services";
import AboutUs from "./pages/AboutUs/AboutUs";
import PublicProfile from "./pages/PublicProfile/PublicProfile";
import Payment from "./pages/Payment/Payment";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Confirmation from "./pages/Confirmation/Confirmation";
import AddPet from "./pages/AddPet/AddPet";
import Pets from "./pages/Pets/Pets";
import EditProfile from "./pages/EditProfile/EditProfile";
import Kristin from "./pages/Kristin/Kristin";
import Profile from "./pages/Profile/Profile";
import CreateProfile from "./pages/CreateProfile/CreateProfile";
import BookingForm from "./pages/Booking/Booking";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import PasswordReset from "./components/PasswordReset/PasswordReset"
import UpdatePass from "./components/UpdatePass/UpdatePass";
import PrivacyPolicy from "./pages/Policies/PrivacyPolicy";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import SiteIndex from "./components/SiteIndex/SiteIndex";
import Marketing from './pages/Home/Front';
import Logout from './components/Logout/Logout';
// import AdminProfiles from './components/AdminProfiles/AdminProfiles';
import ProfileBookings from './components/ProfileBookings/ProfileBookings';
import Messaging  from './components/Messaging/Messaging';
import DayCare from './pages/Services/DayCare';
import Boarding from './pages/Services/Boarding';








export default function App() {
 

  return (
  
    <div className="App">
     
      <Analytics />
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true }}>
      <Header /> 
        <div className="App__body">
          <div className="page-container">
            <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services/>} />
            <Route path="/contact" element={<Contact  />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:tab?/:bookingId?" element={<Profile />} />
            <Route path="/profile/:userId" element={<PublicProfile />} />
            <Route path="/70bfc5a0cec64ce09f212c81d2b671f9.txt" element={<SiteIndex  />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/:userId/booking" element={<BookingForm  />} />
            <Route path="/:profileId/AddPet" element={<AddPet  />} />
            <Route path="/:petId/pet" element={<Pets  />} />
            <Route path="/createprofile" element={<CreateProfile />} />
            <Route path="/admin" element={<AdminDashboard  />} />
            <Route path="/passwordreset" element={<PasswordReset />} />
            <Route path="/update-password" element={<UpdatePass />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy  />} />
            <Route path="/booking/:bookingId" element={<Confirmation  />} />
            <Route path="/payment/:paymentId" element={<Payment  />} />
            <Route path="/EditProfile" element={<EditProfile  />} />
            <Route path="/kristin" element={<Kristin />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/daycare" element={<DayCare />} />
            <Route path="/boarding" element={<Boarding />} />
                <Route path="/profile/:tab?/:bookingId?" element={<Profile />} />
          </Routes>
          </div>
        </div>
      </BrowserRouter>  
      </AuthProvider>
    </div>
  );
}

