import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { removeSession } from '../utils'

const Layout = () => {
  const navigate = useNavigate()

  const signOut = () => {
    removeSession()
    navigate('/login')
  }

  return (
    <div>
      <header className="d-flex justify-content-between p-3 mb-4 border-bottom">
        <ul className="nav nav-pills">
          <li className="nav-item"><NavLink to="/products" className="nav-link">Productos</NavLink></li>
        </ul>
        <div className="d-flex gap-3">
          <button className="btn btn-primary" onClick={() => navigate('/products/create')}>Crear Producto</button>
          <button className="btn btn-primary" onClick={signOut}>Cerrar sesión</button>
        </div>
      </header>
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout