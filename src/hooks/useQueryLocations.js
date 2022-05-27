import axios from "axios";
import { useEffect, useState } from "react";

const LOCATIONS_URL =
  "https://fastapi-template.ajroberts0417.repl.co/spacetimes";

const fetchLocations = () =>
  axios
    .get(LOCATIONS_URL)
    .then(({ data }) => ({ locations: data, error: undefined }))
    .catch((err) => {
      console.error(err);
      return { locations: undefined, error: "Failed to fetch locations" };
    });

const getMapBoxURL = (place) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?types=place&access_token=pk.eyJ1IjoiamFrZXplZ2lsIiwiYSI6ImNsM250cGlscjBod2YzY205M2FxeHNmMHYifQ.LhnI5Z-072x8_HzntE6WQA`;

const fetchCoordinates = (place) =>
  axios
    .get(getMapBoxURL(place))
    .then(({ data }) => ({
      coordinates: data?.features?.[0]?.geometry?.coordinates,
      error: undefined,
    }))
    .catch((err) => {
      console.error(err);
      return { coordinates: undefined, error: "Failed to fetch locations" };
    });

const useQueryLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations().then(async ({ locations, error }) => {
      if (error) return; // TODO: properly handle this

      const newLocations = await Promise.all(
        locations.map(async (location) => {
          const { coordinates, error } = await fetchCoordinates(
            location.fields?.City
          );
          if (error) return; // TODO: properly handle this

          return {
            ...location,
            fields: {
              ...location.fields,
              coordinates,
            },
          };
        })
      );

      setLocations(newLocations);
    });
  }, []);

  return [locations];
};

export default useQueryLocations;
