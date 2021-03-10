import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./screens/Home";
import { signIn$ } from "./services/auth";
import { take } from "rxjs/operators";
import { setPersistentLogin } from "./store/effect";
import { getUser } from "./store/selectors";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <ResolveRoute>
            <Home />
          </ResolveRoute>
        </Route>
      </Switch>
    </Router>
  );
}

/** Route for resolve persistent login */
const ResolveRoute = ({ children, ...rest }) => {
  const [pendingPersistentLogin, setPendingPersistentLogin] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPersistentLogin());
    signIn$.pipe(take(1)).subscribe(() => setPendingPersistentLogin(false));
  }, [dispatch]);

  if (pendingPersistentLogin) return <>Loding...</>;
  return <Route {...rest}>{children}</Route>;
};

export const PrivateRoute = ({ children, ...rest }) => {
  const logged = !!useSelector(getUser);

  return <Route {...rest}>{logged ? children : <Redirect to="/" />}</Route>;
};
