import Link from "next/link"
import "./Drawer.css"
import { useRouter } from "next/navigation"
import { useState } from "react"

function Drawer({ isOpen, toggleDrawer }): React.JSX.Element {

  const router = useRouter()
  const [searchText, setSearchText] = useState<string>("")

  const handleSearchClick = () => {
    setSearchText("")
    toggleDrawer()
    router.push(`/tienda?text=${searchText}`)
  }

  return (
    <div
      className={`position-fixed top-0 start-0 w-50 h-100 bg-white shadow-lg d-md-none ${isOpen ? "" : "hide-drawer"} transition-transform`}
      style={{ transition: "transform 0.3s ease-in-out", zIndex: 1111 }}
    >
      <div className="d-flex justify-content-end p-3">
        <button onClick={toggleDrawer} className="btn btn-primary">
          <span className="fa fa-times"></span>
        </button>
      </div>
      <nav className="d-flex flex-column p-3">
        <Link href="/" className="navbar-brand">
          <h1 className="text-primary display-6">
            Cidepym
          </h1>
        </Link>

        <div className="input-group w-100 mx-auto d-flex">
          <input
            type="search"
            value={searchText}
            className="form-control p-2"
            placeholder={`Buscar...`}
            aria-describedby="search-icon-1"
            onChange={e => setSearchText(e.target.value)}
          />
          <button
            onClick={handleSearchClick}
          >
            <span id="search-icon-1" className="input-group-text p-2">
              <i className="fa fa-search"></i>
            </span>
          </button>
        </div>

        <Link href="/" className="nav-item nav-link active">
          Home
        </Link>
        <Link href="/tienda" className="nav-item nav-link">
          Tienda
        </Link>
        <Link href="/nosotros" className="nav-item nav-link">
          Nosotros
        </Link>
        <Link href="/contacto" className="nav-item nav-link">
          Contacto
        </Link>
        <Link href="/preguntas-frecuentes" className="nav-item nav-link">
          Preguntas frecuentes
        </Link>
      </nav>
    </div>
  )
}

export default Drawer