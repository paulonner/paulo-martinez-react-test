import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { useGetProductQuery } from '../store/apis/productApi'
import { deleteProduct, getProduct } from '../db'
import { IProducts } from '../types'

const ProductDetail = () => {
  const { id } = useParams()
  const { data } = useGetProductQuery(id)
  const [ product, setProduct ] = useState<IProducts>()
  const navigate = useNavigate()

  useEffect(() => {
    getProduct(Number(id)).then((product) => setProduct(product))
  }, [id])

  const productDetail = data || product

  if (!productDetail) return null

  const handleRemove = async (id: number) => {
    await deleteProduct(Number(id))
    navigate('/products')
  }

  return (
    <main>
      <h2>Detalle de Producto</h2>
      <div className="row row-cols-1 text-center justify-content-center">
        <div className="col-6">
          <div className="card rounded-3 shadow-sm">
            <div className="card-header py-3">
              {productDetail.title}
            </div>
            <div className="card-body">
              <img src={productDetail.image} alt="" className="img-fluid" width={300} height={300} />
              <h1>${productDetail.price}</h1>
              <p className="card-text">{productDetail.description}</p>
              {product && (
                <div className="d-flex gap-2 justify-content-center">
                  <Button type="button" className="bg-danger" onClick={() => handleRemove(productDetail.id)}>Eliminar</Button>
                  <Button type="button" onClick={() => navigate(`/products/edit/${productDetail.id}`)}>Actualizar</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetail