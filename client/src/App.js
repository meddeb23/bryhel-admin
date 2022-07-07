import "./styles/globals.css";
import "tailwindcss/tailwind.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import HomePage from "./pages";
import Login from "./pages/Login";
import UserContextProvider from "./components/UserContext";
import ContextProvider from "./components/ContextProvider";
import AuthRoute from "./routes/authRoute";

function App() {
  return (
    <UserContextProvider>
      <ContextProvider>
        <Router>
          <Switch>
            <AuthRoute path="/home" exact>
              <HomePage />
            </AuthRoute>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Redirect from="/*" to="/home" />
          </Switch>
        </Router>
      </ContextProvider>
    </UserContextProvider>
  );
}

export default App;
