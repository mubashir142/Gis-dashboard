import { useEffect } from 'react'
import { Layers, Map as MapIcon } from 'lucide-react'
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'
import type { Facility, Category } from '../types'
import { categories } from '../types'

type MapViewProps = {
  facilities: Facility[]
  selectedId: string | null
  hoveredId: string | null
  onSelect: (facility: Facility) => void
  onHover: (id: string | null) => void
  basemap: 'light' | 'dark'
  onBasemapChange: (basemap: 'light' | 'dark') => void
}

function MapFocus({ facility }: { facility?: Facility }) {
  const map = useMap()
  useEffect(() => {
    if (facility) {
      const [longitude, latitude] = facility.geometry.coordinates
      map.flyTo([latitude, longitude], Math.max(map.getZoom(), 14), { duration: 0.65 })
    }
  }, [facility, map])
  return null
}

function displayName(facility: Facility) {
  return facility.properties.name || 'Unnamed facility'
}

export default function MapView({
  facilities,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  basemap,
  onBasemapChange,
}: MapViewProps) {
  const selected = facilities.find((facility) => facility.properties.id === selectedId)

  return (
    <section className="map-panel" aria-label="Facility map">
      <div className="map-header">
        <div>
          <p className="eyebrow">GEOSPATIAL VIEW</p>
          <h2>Islamabad service network</h2>
        </div>
        <div className="map-switcher" aria-label="Basemap style">
          <button type="button" className={basemap === 'light' ? 'active' : ''} onClick={() => onBasemapChange('light')}><MapIcon size={14} /> Streets</button>
          <button type="button" className={basemap === 'dark' ? 'active' : ''} onClick={() => onBasemapChange('dark')}><Layers size={14} /> Dark</button>
        </div>
      </div>
      <div className="map-canvas">
        <MapContainer center={[33.6844, 73.0479]} zoom={11} minZoom={9} maxZoom={18} scrollWheelZoom className="leaflet-map">
          <TileLayer
            key={basemap}
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            url={basemap === 'dark'
              ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
          />
          <MapFocus facility={selected} />
          {facilities.map((facility) => {
            const [longitude, latitude] = facility.geometry.coordinates
            const id = facility.properties.id
            const category = facility.properties.category as Category
            const isEmphasized = id === selectedId || id === hoveredId
            return (
              <CircleMarker
                key={id}
                center={[latitude, longitude]}
                radius={isEmphasized ? 10 : 6}
                pathOptions={{
                  color: isEmphasized ? '#ffffff' : categories[category].color,
                  weight: isEmphasized ? 3 : 1.5,
                  fillColor: categories[category].color,
                  fillOpacity: 0.88,
                }}
                eventHandlers={{
                  click: () => onSelect(facility),
                  mouseover: () => onHover(id),
                  mouseout: () => onHover(null),
                }}
              >
                <Popup>
                  <div className="map-popup">
                    <strong>{displayName(facility)}</strong>
                    <span>{categories[category].label} · {facility.properties.status}</span>
                    <button type="button" onClick={() => onSelect(facility)}>View facility details</button>
                  </div>
                </Popup>
              </CircleMarker>
            )
          })}
        </MapContainer>
        <div className="map-legend">
          <strong>Facility type</strong>
          {(Object.keys(categories) as Category[]).map((category) => (
            <span key={category}><i style={{ backgroundColor: categories[category].color }} />{categories[category].label}</span>
          ))}
        </div>
      </div>
      <div className="map-footer">
        <span><i className="live-dot" /> OpenStreetMap locations · simulated operational data</span>
        <span>Pan to move · Scroll to zoom</span>
      </div>
    </section>
  )
}
