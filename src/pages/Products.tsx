import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetProductsQuery } from '../store/apis/productApi'
import Pagination from '../components/Pagination'
import { IPagination, IProducts } from '../types'
import InputFilter from '../components/InputFilter'
import { getAllProducts } from '../db'

const Products = () => {
  const { data, isLoading } = useGetProductsQuery()
  const navigate = useNavigate()
  const [ perPage, setPerPage ] = useState(10)
  const [ search, setSearch ] = useState('')
  const [ localProducts, setLocalProducts ] = useState<IProducts[]>([])
  const [ pagination, setPagination ] = useState<IPagination>({
    currentPage: 1,
    totalPages: 0
  })
  
  useEffect(() => {
    if (!data) return

    setPagination({
      currentPage: 1,
      totalPages: Math.ceil(data.length / perPage)
    })
  }, [data, perPage])

  const handlePageClick = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  useEffect(() => {
    getAllProducts().then((products) => setLocalProducts(products))
  }, [])

  if (isLoading) return null
  
  const products = data
    .concat(localProducts).sort((a, b) => b.id - a.id)
    .slice((pagination.currentPage - 1) * perPage, pagination.currentPage * perPage)
    .filter((item: IProducts) => item.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <h2>Listado de productos</h2>
      <div className="table-responsive">
        <div className="w-25">
          <InputFilter
            label="Buscar"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="table table-hover table-bordered mt-4">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {products.map((item: IProducts) => (
              <tr key={item.id} onClick={() => navigate(`/products/${item.id}`)}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.image}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          pagination={pagination}
          handlePageClick={handlePageClick}
          perPage={perPage}
          setPerPage={setPerPage}
        />
      </div>
    </>
  )
}

export default Products