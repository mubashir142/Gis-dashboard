# SpatialView

SpatialView is a responsive React + Vite geospatial dashboard for exploring
service locations in Islamabad. It uses Tailwind CSS with dashboard styling,
React-Leaflet for mapping, Recharts for analytics, and Lucide for interface
icons.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run
`npm run build`.

## GitHub Pages

Pushing to `main` runs the Pages deployment workflow. After the first successful
deployment, the dashboard is available at
<https://mubashir142.github.io/Gis-dashboard/>. In the repository settings, set
**Pages > Build and deployment > Source** to **GitHub Actions** if it is not
already selected.

## Facility data endpoint

By default, the app requests the bundled GeoJSON fixture at
`/data/islamabad-services.geojson`. To connect a REST endpoint, copy
`.env.example` to `.env.local` and set `VITE_FACILITIES_API_URL` to an endpoint
that returns a valid GeoJSON `FeatureCollection` of point features using the
same `category`, `name`, and optional OpenStreetMap source properties as the
fixture. Vite environment variables are read at startup, so restart the dev
server after changing this setting.

## Validate changes

```sh
npm test
npx tsc --noEmit
npm run build
```

## Dashboard features

- Filter facilities by name, type, status, risk, capacity, and region.
- Explore the filtered subset in the map, analytics charts, and sortable,
  paginated facility table.
- Select a map marker or table row to open the facility profile and synchronize
  the map and table selection.
- Switch between street and dark basemaps, toggle the dashboard theme, and
  export the filtered facility list to CSV.
- Retry the GeoJSON request if data loading fails.

## Data and limitations

The bundled GeoJSON snapshot is
[`public/data/islamabad-services.geojson`](public/data/islamabad-services.geojson).
Its mapped locations and source tags come from OpenStreetMap. The dashboard
generates deterministic **demo-only** status, capacity, risk, region, year, and
inspection values from each feature ID; these attributes are not verified
operational records and should not be used for real-world decisions.

OpenStreetMap data is community-maintained and may be incomplete or outdated.
The source snapshot includes hospitals, universities, parks, and public
offices, including locations near the Islamabad/Rawalpindi boundary. Attribute
OpenStreetMap contributors when reusing the map data:
[© OpenStreetMap contributors](https://www.openstreetmap.org/copyright).
