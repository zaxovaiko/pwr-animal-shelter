import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Contact from "./pages/contact/Contact";
import Profile from "./pages/profile/Profile";
import Charity from "./pages/charity/Charity";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import AnimalList from "./pages/animals/list/AnimalsList";

function App() {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/adoption/:type" component={AnimalList} />
        <Route exact path="/charity" component={Charity} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
