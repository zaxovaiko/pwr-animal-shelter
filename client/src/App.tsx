import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Contact from "./pages/contact/Contact";
import Charity from "./pages/charity/Charity";

function App() {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/charity" component={Charity} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
