import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Tenants/Login";
import SignUp from "./pages/Tenants/Sign up/SignUp";
import Home from "./pages/Tenants/Home";
import AboutUs from "./pages/Tenants/AboutUs";
import Listings from "./pages/Tenants/Listings";
import ErrorPage from "./pages/Tenants/ErrorPage";
import RoomDetails from "./pages/Tenants/roomDetails";
import Booking from "./pages/Tenants/Booking/Booking";
import ContactInfo from "./pages/Tenants/Booking/ContactInfo";
import Payment from "./pages/Tenants/Booking/Payment";
import Cancellation from "./pages/Tenants/Booking/Cancellation";
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./pages/Tenants/Account";
import Favorites from "./pages/Tenants/Favorites";
import RoomApplication from "./pages/Tenants/RoomApplication";
import MainLayout from "./layout/MainLayout";
import LandlordLogin from "./pages/Landlord/Login";
import LandlordSIgnUp from "./pages/Landlord/SignUp";
import Dashboard from "./pages/Landlord/Dashboard";
import Management from "./pages/Landlord/Management";
import Availability from "./pages/Landlord/Availability";
import Request from "./pages/Landlord/Request";
import LandlordLayout from "./layout/LandlordLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<ErrorPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/listings" element={<Listings />} />
              <Route path="/listing/:id" element={<RoomDetails />} />
              <Route path="/booking/:id" element={<Booking />}>
                <Route index element={<ContactInfo />} />
                <Route path="payment" element={<Payment />} />
                <Route path="cancellation" element={<Cancellation />} />
              </Route>

              <Route path="/account" element={<Account />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/roomApplication" element={<RoomApplication />} />
            </Route>
          </Route>

          {/* LANDLORD ROUTES */}
          <Route path="/landlords">
            <Route path="login" element={<LandlordLogin />} />
            <Route path="signup" element={<LandlordSIgnUp />} />
            <Route element={<LandlordLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="management" element={<Management />} />
              <Route path="availability" element={<Availability />} />
              <Route path="request" element={<Request />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
