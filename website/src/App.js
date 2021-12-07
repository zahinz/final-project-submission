import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignupForm from "./pages/SignupForm";
import Dashboard from "./pages/Dashboard";
import Queue from "./pages/Queue";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/queue" exact component={Queue} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/register" exact component={Register} />
        <Route path="/signup" exact component={SignupForm} />
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
