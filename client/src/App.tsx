import { Switch, Route } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Profile from "./pages/profile/Profile";
import Charity from "./pages/charity/Charity";
import FormList from "./pages/forms/FormList";
import Login from "./pages/auth/login/Login";
import Registration from "./pages/auth/registration/Registration";
import AnimalList from "./pages/animals/animals-list/AnimalsList";
import AnimalIssues from "./pages/animals/animal-issues/AnimalIssues";
import AnimalInfoClient from "./pages/animals/info/animal-info-client/AnimalInfoClient";
import ReservedAnimalsList from "./pages/animals/reserved-animals-list/ReservedAnimalsList";
import AdoptedAnimalsList from "./pages/animals/adopted-animals-list/AdoptedAnimalsList";
import ReservationClient from "./pages/animals/reservation-client/ReservationClient";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/adopted" component={AdoptedAnimalsList} />
        <Route exact path="/adoption/:type" component={AnimalList} />
        <Route exact path="/animals/:id" component={AnimalInfoClient} />
        <Route exact path="/reserved-animals" component={ReservedAnimalsList} />
        <Route exact path="/charity" component={Charity} />
        <Route exact path="/forms" component={FormList} />
        <Route exact path="/animal-issues" component={AnimalIssues} />
        <Route exact path="/animal-reservation/:id" component={ReservationClient} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
