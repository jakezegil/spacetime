import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Map = ({ markers }) => {
  return (
    <ComposableMap projection="geoEqualEarth">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            return <Geography key={geo.rsmKey} geography={geo} fill={"#BBB"} />;
          })
        }
      </Geographies>
      {markers.map(({ name, city, imageSrc, coordinates }) => (
        <Marker
          key={JSON.stringify(coordinates)}
          coordinates={coordinates}
          fill="#777"
        >
          {imageSrc ? (
            <foreignObject x="0" y="0" width={20} height={20}>
              <img
                alt={name}
                width={20}
                height={20}
                src={imageSrc}
                style={{ borderRadius: "50%" }}
              />
            </foreignObject>
          ) : (
            <circle r={8} fill="#F53" />
          )}
          <text textAnchor="middle" y="-20" fill="#F53">
            {`${name} in ${city}!`}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default Map;
