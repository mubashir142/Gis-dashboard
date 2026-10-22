import { Download, Layers3, Moon, Sun } from 'lucide-react'

type HeaderProps = {
  total: number
  active: number
  nightMode: boolean
  onToggleTheme: () => void
  onExport: () => void
}

export default function Header({
  total,
  active,
  nightMode,
  onToggleTheme,
  onExport,
}: HeaderProps) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="SpatialView home">
        <span className="brand-mark"><Layers3 size={19} strokeWidth={2.2} /></span>
        <span className="brand-copy">
          <strong>Spatial<span>View</span></strong>
          <small>GEOSPATIAL INTELLIGENCE</small>
        </span>
      </a>
      <div className="header-context">
        <span className="header-context-label">WORKSPACE</span>
        <strong>Islamabad · Asset overview</strong>
      </div>
      <div className="topbar-actions">
        <span className="live-indicator"><i /> Live dataset</span>
        <span className="header-count">{active.toLocaleString()} active / {total.toLocaleString()}</span>
        <button className="icon-button" type="button" onClick={onToggleTheme} aria-label={nightMode ? 'Switch to light mode' : 'Switch to dark mode'}>
          {nightMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button
          className="export-button"
          type="button"
          aria-label="Export filtered facilities as CSV"
          onClick={onExport}
        >
          <Download size={15} /> <span>Export</span>
        </button>
      </div>
    </header>
  )
}
