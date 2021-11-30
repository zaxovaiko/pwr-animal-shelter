import { Switch, Route } from "react-router-dom";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Profile from "./pages/profile/Profile";
import Charity from "./pages/charity/Charity";
import FormList from "./pages/forms/FormList";
import Login from "./pages/auth/Login/Login";
import Registration from "./pages/auth/Registration/Registration";
import AnimalList from "./pages/animals/animals-list/AnimalsList";
import AnimalIssues from "./pages/animals/animal-issues/AnimalIssues";
import AnimalInfoClient from "./pages/animals/info/animal-info-client/AnimalInfoClient";
import ReservedAnimalsList from "./pages/animals/reserved-animals-list/ReservedAnimalsList";
import AdoptedAnimalsList from "./pages/animals/adopted-animals-list/AdoptedAnimalsList";
import ReservationClient from "./pages/animals/reservation-client/ReservationClient";
import ModificateProfile from "./pages/profile/ModificateProfile";
import ErrorPage from "./pages/errors/ErrorPage";
import LoadingPage from "./pages/errors/LoadingPage";
import ReservationList from "./pages/animals/reservation-list/ReservationList";
import AnimalInfoWorker from "./pages/animals/info/animal-info-worker/AnimalInfoWorker";
import AboutUs from "./pages/about-us/AboutUs";
import PasswordReset from "./pages/auth/password-reset/PasswordReset";
import PasswordResetConfirm from "./pages/auth/password-reset/PasswordResetConfirm";
import ModificateAnimal from "./pages/animals/animals-edit/ModificateAnimal";

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
        <Route
          exact
          path="/password-reset/confirm"
          component={PasswordResetConfirm}
        />
        <Route exact path="/password-reset" component={PasswordReset} />
        <Route exact path="/profile/edit/:id" component={ModificateProfile} />
        <Route exact path="/adoption/:type" component={AnimalList} />
        <Route exact path="/adopted-animals" component={AdoptedAnimalsList} />
        <Route exact path="/animals/:id" component={AnimalInfoClient} />
        <Route exact path="/animal/:id" component={AnimalInfoWorker} />
        <Route exact path="/animal/edit/:id" component={ModificateAnimal} />
        <Route exact path="/reserved-animals" component={ReservedAnimalsList} />
        <Route exact path="/charity" component={Charity} />
        <Route exact path="/forms" component={FormList} />
        <Route exact path="/animal-issue/:id" component={AnimalIssues} />
        <Route
          exact
          path="/animal-reservation/:id"
          component={ReservationClient}
        />
        <Route exact path="/error" component={ErrorPage} />
        <Route exact path="/loading" component={LoadingPage} />
        <Route exact path="/reservations" component={ReservationList} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route component={ErrorPage}></Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
