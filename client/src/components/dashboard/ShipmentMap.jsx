import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const warehouseIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function ShipmentMap({ shipments }) {
  const locations = {
    "Shanghai": [31.2304, 121.4737],
    "Los Angeles": [34.0522, -118.2437],
    "Berlin": [52.5200, 13.4050],
    "London": [51.5074, -0.1278],
    "Mumbai": [19.0760, 72.8777],
    "New York": [40.7128, -74.0060],
    "Shenzhen": [22.5431, 114.0579],
    "Rotterdam": [51.9225, 4.4791],
    "Tokyo": [35.6762, 139.6503],
    "Seattle": [47.6062, -122.3321]
  };

  const warehouses = [
    { name: "Whse B (LA)", pos: locations["Los Angeles"] },
    { name: "Whse A (NY)", pos: locations["New York"] },
    { name: "Whse EU (Berlin)", pos: locations["Berlin"] }
  ];

  const riskZones = [
    { name: "Monsoon Flooding", pos: locations["Mumbai"], radius: 500000, color: "#ef4444" },
    { name: "Port Strike", pos: locations["Los Angeles"], radius: 300000, color: "#f59e0b" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full h-full relative z-0">
      <MapContainer center={[30, 0]} zoom={2} style={{ height: "100%", width: "100%", borderRadius: "inherit" }} className="z-0">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {/* Render Risk Zones */}
        {riskZones.map((zone, i) => (
          <Circle key={`zone-${i}`} center={zone.pos} radius={zone.radius} pathOptions={{ color: zone.color, fillColor: zone.color, fillOpacity: 0.2, weight: 1 }}>
            <Popup><span className="font-semibold text-destructive">{zone.name} Zone</span></Popup>
          </Circle>
        ))}

        {/* Render Warehouses */}
        {warehouses.map((wh, i) => (
          <Marker key={`wh-${i}`} position={wh.pos} icon={warehouseIcon}>
            <Popup><span className="font-semibold">{wh.name}</span><br/>Distribution Center</Popup>
          </Marker>
        ))}

        {/* Render Shipments */}
        {shipments.map(ship => {
          const src = locations[ship.source];
          const dest = locations[ship.destination];
          
          if(!src || !dest) return null;

          const isAtRisk = ship.risk === "Critical" || ship.status === "Delayed";
          const color = isAtRisk ? "#ef4444" : "#10b981";

          return (
            <div key={ship.id}>
              <Marker position={src}>
                <Popup>{ship.source} (Source)<br/>Shipment: {ship.id}</Popup>
              </Marker>
              <Marker position={dest}>
                <Popup>{ship.destination} (Dest)<br/>Shipment: {ship.id}</Popup>
              </Marker>
              <Polyline 
                positions={[src, dest]} 
                pathOptions={{ color, weight: isAtRisk ? 3 : 2, dashArray: isAtRisk ? "5, 10" : "", opacity: 0.8 }} 
              />
            </div>
          );
        })}
      </MapContainer>
    </motion.div>
  );
}
