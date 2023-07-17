import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { CiCamera } from "react-icons/ci";
import { RxCube } from "react-icons/rx";
import { Link } from "react-router-dom";
import CONSTANTS from "../Utils/Contants";
import env from "react-dotenv";

mapboxgl.accessToken = env.MAPBOX_API_TOKEN;

const MapCapture: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 2,
    });

    map.on("load", () => {
      setMap(map);
    });

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  const captureImage = async () => {
    if (map) {
      const longitude = map?.getCenter().lng.toFixed(4);
      const latitude = map?.getCenter().lat.toFixed(4);
      const zoom = map?.getZoom().toFixed(2);
      const response = await fetch(
        `${CONSTANTS.STATIC_MAP_BASE_URL}/${longitude},${latitude},${zoom}/1000x800?access_token=${mapboxgl.accessToken}`
      );
      setImageUrl(response.url);
    }
  };

  const bottomForButtons = imageUrl ? 120 : 60;

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: "1000px", height: "800px" }} />
      {map ? (
        <div
          style={{ position: "relative", right: 20, bottom: bottomForButtons }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <button
              className="Icon-Box"
              title="Capture the visible region"
              onClick={captureImage}
            >
              <CiCamera size={50} />
            </button>
            {imageUrl ? (
              <Link
                title="Render the Captured Image into 3D Cuboid Shape"
                to="/render-3D-image"
                state={{ imageUrl }}
                className="Icon-Box"
              >
                <RxCube size={20} />
              </Link>
            ) : null}
          </div>
        </div>
      ) : (
        <p>Loading Mapbox...</p>
      )}
    </div>
  );
};

export default MapCapture;
