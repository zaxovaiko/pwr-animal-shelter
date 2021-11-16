import { Switch, Route } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import Home from "./pages/Home";
import Contact from "./pages/contact/Contact";
import Profile from "./pages/profile/Profile";
import Charity from "./pages/charity/Charity";
import FormList from "./pages/forms/FormList";
import Login from "./pages/auth/Login/Login";
import Registration from "./pages/auth/Registration/Registration";
import AnimalList from "./pages/animals/AnimalList/AnimalsList";
import AnimalIssues from "./pages/animals/AnimalIssues/AnimalIssues";
import AnimalInfoClient from "./pages/animals/info/AnimalInfoClient/AnimalInfoClient";
import ReservedAnimalsList from "./pages/animals/ReservedAnimalList/ReservedAnimalsList";
import ReservationClient from "./pages/animals/ReservationClient/ReservationClient";
import ModificateProfile from "./pages/profile/ModificateProfile";


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
        <Route exact path="/profile/edit/:id" component={ModificateProfile} />
        <Route exact path="/adoption/:type" component={AnimalList} />
        <Route exact path="/animals/:id" component={AnimalInfoClient} />
        <Route exact path="/reserved-animals" component={ReservedAnimalsList} />
        <Route exact path="/charity" component={Charity} />
        <Route exact path="/forms" component={FormList} />
        <Route exact path="/animal-issue/:id" component={AnimalIssues} />
        <Route exact path="/animal-reservation/:id" component={ReservationClient} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
