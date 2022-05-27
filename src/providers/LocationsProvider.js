import { Component } from "react";
import useQueryLocations from "../hooks/useQueryLocations";

const LocationsProvider = ({ renderComponent }) => {
  const [locations] = useQueryLocations();
  console.log("render again");

  return renderComponent({ locations });
};

export const withLocations = (Component) => (props) =>
  (
    <LocationsProvider
      renderComponent={({ locations }) => (
        <Component {...props} locations={locations} />
      )}
    />
  );

export default LocationsProvider;
