// src/components/TrackingMap.jsx
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Correction des icônes par défaut de Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Icône personnalisée pour le colis
const packageIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Icône de destination
const destinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const TrackingMap = ({ shipment }) => {
  if (!shipment) return null

  const currentLat = parseFloat(shipment.currentLatitude)
  const currentLng = parseFloat(shipment.currentLongitude)
  console.log('DEBUG coords:', currentLat, currentLng, shipment.currentLatitude, shipment.currentLongitude)
  const hasValidCoords = !isNaN(currentLat) && !isNaN(currentLng) && currentLat !== 0 && currentLng !== 0

  // Coordonnées par défaut (centré sur Paris si pas de coords)
  const defaultCenter = [48.8566, 2.3522]
  const center = hasValidCoords ? [currentLat, currentLng] : defaultCenter

  // Récupérer toutes les positions de l'historique
  const historyPositions = shipment.statusHistory
    ?.filter(entry => entry.latitude && entry.longitude)
    .map(entry => [parseFloat(entry.latitude), parseFloat(entry.longitude)]) || []

  // Ajouter la position actuelle si elle existe
  if (hasValidCoords) {
    historyPositions.push([currentLat, currentLng])
  }

  // Coordonnées de destination (adresse du destinataire)
  const destCoords = shipment.recipientCity === 'New York' ? [40.7128, -74.0060] :
                     shipment.recipientCity === 'Los Angeles' ? [34.0522, -118.2437] :
                     shipment.recipientCity === 'Paris' ? [48.8566, 2.3522] :
                     shipment.recipientCity === 'London' ? [51.5074, -0.1278] :
                     shipment.recipientCity === 'Tokyo' ? [35.6762, 139.6503] :
                     shipment.recipientCity === 'Berlin' ? [52.5200, 13.4050] :
                     shipment.recipientCity === 'Dubai' ? [25.2048, 55.2708] :
                     shipment.recipientCity === 'Sydney' ? [-33.8688, 151.2093] :
                     null

  return (
    <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-inner">
      {/* ✅ Conteneur avec z-index contrôlé */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          {/* ✅ Réactiver les contrôles de zoom avec un z-index inférieur */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Position actuelle du colis */}
          {hasValidCoords && (
            <Marker position={[currentLat, currentLng]} icon={packageIcon}>
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-orange-600">📍 Current Location</p>
                  <p>{shipment.currentLocation || 'Unknown'}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Lat: {currentLat.toFixed(6)}<br />
                    Lng: {currentLng.toFixed(6)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Status: <span className="font-medium">{shipment.status}</span>
                  </p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Destination finale */}
          {destCoords && (
            <Marker position={destCoords} icon={destinationIcon}>
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold text-green-600">📦 Destination</p>
                  <p>{shipment.recipientName}</p>
                  <p className="text-xs text-gray-500">{shipment.recipientAddress}</p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Trajectoire (ligne entre les points) */}
          {historyPositions.length >= 2 && (
            <Polyline
              positions={historyPositions}
              color="#ea580c"
              weight={3}
              opacity={0.7}
              dashArray="5, 10"
            />
          )}

          {/* Affichage des points d'historique */}
          {historyPositions.map((pos, index) => (
            <Marker
              key={index}
              position={pos}
              icon={L.divIcon({
                className: 'bg-orange-500 rounded-full border-2 border-white shadow-md',
                html: `<div class="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md"></div>`,
                iconSize: [12, 12],
                iconAnchor: [6, 6],
              })}
            >
              <Popup>
                <div className="text-xs">
                  <p className="font-medium">Step {index + 1}</p>
                  <p className="text-gray-500">Lat: {pos[0].toFixed(6)}</p>
                  <p className="text-gray-500">Lng: {pos[1].toFixed(6)}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* ✅ Overlay pour le contrôle du z-index */}
      <style jsx>{`
        /* Réduire le z-index de la carte */
        .leaflet-control-container {
          z-index: 2 !important;
          position: relative;
        }
        
        .leaflet-top,
        .leaflet-bottom {
          z-index: 2 !important;
        }
        
        /* Réduire le z-index des popups */
        .leaflet-popup {
          z-index: 3 !important;
        }
        
        /* Réduire le z-index des tooltips */
        .leaflet-tooltip {
          z-index: 2 !important;
        }
        
        /* Réduire le z-index des marqueurs */
        .leaflet-marker-icon {
          z-index: 2 !important;
        }
        
        /* Le conteneur de la carte ne doit pas dépasser */
        .leaflet-container {
          z-index: 1 !important;
        }
      `}</style>
    </div>
  )
}

export default TrackingMap