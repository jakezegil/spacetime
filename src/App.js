import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map";
import LocationsProvider, {
  withLocations,
} from "./providers/LocationsProvider";
import MapFromLocations from "./components/MapFromLocations";

function App() {
  return (
    <div className="App">
      <MapFromLocations />
    </div>
  );
}

export default App;
