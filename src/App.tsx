import {Routes,Route} from "react-router-dom";
import { Container} from "react-bootstrap";
import LoginFormMain from "./components/pages/LoginFormMain";
import AboutUs from "./components/pages/AboutUs";
import Reviews from "./components/pages/Reviews";
import Delivery from "./components/pages/Delivery";
import Navbar from "./components/Navbar";
import Store from "./components/pages/Store";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import SmsMarketing from "./components/pages/SmsMarketing";
import SignupPage from "./components/pages/signup/SignupPage";
import LoginPage from "./components/pages/login/Login"; 
import Passwordforget from "./components/pages/ForgetPassword";
import ResetPassword from "./components/pages/ResetPassword";
function App() {
  

  return (
    <>
    <ShoppingCartProvider>
    <Navbar/>
    <Container>
  <Routes>
  <Route path="/signin" element={<LoginFormMain/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/fogetpassword" element={<Passwordforget/>}/>
      <Route path="/home" element={<Store/>}/>
      <Route path="/AboutUs" element={<AboutUs/>}/>
      <Route path="/reviews" element={<Reviews/>}/>
      <Route path="/Delivery" element={<Delivery/>}/>
      <Route path="/Store" element={<Store/>}/>
      <Route path="/marketing" element={<SmsMarketing/>}/>
      <Route path="/verifyemail" element={<ResetPassword/>}/>
  </Routes>
    </Container>
    </ShoppingCartProvider>
    </>
  )
}

export default App
