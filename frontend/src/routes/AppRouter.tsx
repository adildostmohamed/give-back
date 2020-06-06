import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomeRoute from "./HomeRoute";
import LoginRoute from "./LoginRoute";
import SignupRoute from "./SignupRoute";
import ProfileRoute from "./ProfileRoute";
import OrgOnboardingRoute from "./Org/OrgOnboardingRoute";
import OrgListingsRoute from "./Org/OrgListingsRoute";
import NewListingFormRoute from "./Org/NewListingFormRoute";
import VolunteerOnboardingRoute from "./Volunteer/VolunteerOnboardingRoute";
import VolunteerListingsRoute from "./Volunteer/VolunteerListingsRoute";
import VolunteerListingDetailsRoute from "./Volunteer/VolunteerListingDetailsRoute";
import VolunteerViewedListingsRoute from "./Volunteer/VolunteerViewedListingsRoute";
import VolunteerShortlistedListingsRoute from "./Volunteer/VolunteerShortlistedListingsRoute";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeRoute} />
        <Route path="/login" exact component={LoginRoute} />
        <Route path="/signup" exact component={SignupRoute} />
        <ProtectedRoute path="/profile" exact component={ProfileRoute} />
        <ProtectedRoute
          path="/profile/onboarding"
          exact
          component={VolunteerOnboardingRoute}
        />
        <ProtectedRoute
          path="/profile/listings"
          exact
          component={VolunteerListingsRoute}
        />
        <ProtectedRoute
          path="/profile/listings/:listingId"
          exact
          component={VolunteerListingDetailsRoute}
        />
        <ProtectedRoute
          path="/profile/viewed"
          exact
          component={VolunteerViewedListingsRoute}
        />
        <ProtectedRoute
          path="/profile/shortlisted"
          exact
          component={VolunteerShortlistedListingsRoute}
        />
        <ProtectedRoute
          path="/org/onboarding"
          exact
          component={OrgOnboardingRoute}
        />
        <ProtectedRoute
          path="/org/listings"
          exact
          component={OrgListingsRoute}
        />
        <ProtectedRoute
          path="/org/listings/new"
          exact
          component={NewListingFormRoute}
        />
        <ProtectedRoute
          path="/org/listings/edit/:listingId"
          exact
          component={NewListingFormRoute}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
