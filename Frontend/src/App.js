import "./App.css";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import { Route } from "react-router-dom";
import { LoginPage } from "./Components/LoginPage/LoginPage";
import { SignupPage } from "./Components/SignupPage/SignupPage";
import CreateExperience from "./Components/CreateExperience/CreateExperience";
import { SearchPlaces } from "./Components/SeachPlaces/SearchPlaces";
import { AboutUs } from "./Components/AboutUs/AboutUs";
import Review from "./Components/UserPlaceReview/Review";
import { Otheruserprofile } from "./Components/Otheruserprofile/Otheruserprofile";
import { Userprofile } from "./Components/Userprofile/Userprofile";

const App = () => {
  return (
    <div className="home">
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/LogIn">
        <LoginPage />
      </Route>
      <Route exact path="/SignUp">
        <SignupPage />
      </Route>
      <Route exact path="/AboutUs">
        <AboutUs />
      </Route>
      <Route exact path="/SearchPlaces">
        <SearchPlaces />
      </Route>

      <Route exact path="/CreateExperience">
        <CreateExperience />
      </Route>
      <Route exact path="/Userprofile">
        <Userprofile />
      </Route>
      <Route exact path="/Otheruserprofile">
        <Otheruserprofile />
      </Route>
      <Route exact path="/Review">
        <Review />
      </Route>
    </div>
  );
};

export default App;
