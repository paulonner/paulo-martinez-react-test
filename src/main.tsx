import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Layout from './components/Layout.tsx'
import Products from './pages/Products.tsx'
import ProductDetail from './pages/ProductDetail.tsx'
import ProductNew from './pages/ProductNew.tsx'
import { Provider } from 'react-redux'
import { store } from './store'
import { getSession } from './utils/index.ts'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const productLoader = () => {
  const session = getSession()
    
  if (!session) return redirect('/login')
  return null
}

const loginLoader = () => {
  const session = getSession()
    
  if (session) return redirect('/products')
  return null
}

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/login')
  },
  {
    path: '/login',
    element: <Login />,
    loader: loginLoader
  },
  {
    path: '/products',
    element: <Layout />,
    loader: productLoader,
    children: [
      {
        path: '',
        element: <Products />
      },
      {
        path: ':id',
        element: <ProductDetail />
      },
      {
        path: 'create',
        element: <ProductNew />
      },
      {
        path: 'edit/:id',
        element: <ProductNew />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
