import { withLocations } from "../providers/LocationsProvider";
import Map from "./Map";

const MapFromLocations = ({ locations = [] }) => {
  const markers = locations.map((location) => ({
    city: location.fields.City,
    name: location.fields.Handle,
    coordinates: location.fields.coordinates,
    imageSrc: location.fields.profile_image_url,
  }));

  return <Map markers={markers} />;
};

export default withLocations(MapFromLocations);
