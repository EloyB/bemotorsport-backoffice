import "./App.css";
import Navigation from "./Components/Navigation";
import Circuits from "./Pages/Circuits";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";
import { db } from "./firebase";
import Trackdays from "./Pages/Trackdays";

function App() {
  const [{ circuits }, dispatch] = useStateValue();

  useEffect(() => {
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
        <Navigation />
        <div className="m-4 lg:max-w-4xl lg:m-auto xl:max-w-5xl 2xl:max-w-screen-xl">
          <Switch>
            <Route path="/circuits">
              <Circuits />
            </Route>
            <Route path="/">
              <Trackdays />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
