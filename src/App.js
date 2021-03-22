import "./App.css";
import Navigation from "./Components/Navigation";
import Circuits from "./Pages/Circuits";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import Trackdays from "./Pages/Trackdays";
import Login from "./Pages/Login";
import Requests from "./Pages/Requests";

function App() {
  const [{}, dispatch] = useStateValue();
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    const getCircuits = () => {
      db.collection("circuits")
        .get()
        .then((snapshot) => {
          let circuitsList = [];
          snapshot.forEach((doc) => {
            circuitsList.push({ id: doc.id, ...doc.data() });
          });
          dispatch({
            type: "SET_CIRCUITS",
            list: circuitsList,
          });
        });
    };
    getCircuits();
  }, []);

  return (
    <Router>
      <div className="App">
        {user === null ? (
          <Switch>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        ) : (
          <div className="lg:max-w-4xl lg:m-auto xl:max-w-5xl 2xl:max-w-screen-xl">
            <Navigation />
            <Switch>
              <Route path="/requests">
                <Requests />
              </Route>
              <Route path="/circuits">
                <Circuits />
              </Route>
              <Route path="/">
                <Trackdays />
              </Route>
            </Switch>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
