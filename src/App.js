// Import modules
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Import Comps
import NavbarComps from "./components/Navbar";

// Import bootstrap
import { Container } from "react-bootstrap";

// Import auth COntext
import useAuthContext from "./hooks/useAuthContext"

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <NavbarComps />
      <BrowserRouter>
        <Container>
          <div className="pages">
            <Routes>
              <Route path="/" element={user ? <Home update='false' /> : <Navigate to="/login" />} />
              <Route path="/update/:workId" element={user ? <Home update='true' /> : <Navigate to="/login" />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
