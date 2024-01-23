import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/profile' element={<SignIn />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/Singin' element={<SignIn />} />
          <Route path='/Singup' element={<SignUp />} />
        </Routes>
        <NavBar />
      </Router>
    </>
  );
}

export default App;
