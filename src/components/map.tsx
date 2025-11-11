import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";

// ✅ Fix default marker icons (otherwise they won't show in Vite builds)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Map({location}:any) {
  const [center, setCenter] = useState<[number, number]>([9.082, 8.6753]);
  

  const getCoordinates = async (stateName: string) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${stateName}`
    );
    const data = await response.json();
    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)] as [
        number,
        number
      ];
    }
    return null;
  };

  useEffect(() => {
    const fetchCoords = async () => {
      const coords = await getCoordinates(location);
      //console.log(coords);
      if (coords) setCenter(coords);
    };
    fetchCoords();
  }, [location]);

  return (
    <div className="w-full h-[400px] box-shadow rounded-md">
      <MapContainer
        center={center as [number, number]} // Lagos as example [6.5244, 3.3792] center as [number, number]
        zoom={6}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center}>
          <Popup>{location}  📍 Room available here </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
