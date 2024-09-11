import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import InputForm from '../components/InputForm'
import Select from '../components/Select'
import InputFile from '../components/InputFile'
import Button from '../components/Button'
import { useCreateProductMutation } from '../store/apis/productApi'

import { saveProduct, updateProduct, getProduct } from '../db'
import { IProducts } from '../types'
import { productSchema } from '../validationSchemas'

const ProductCreate = () => {
  const [ mutation ] = useCreateProductMutation()
  const navigate = useNavigate()
  const { id } = useParams()
  const methods = useForm<IProducts>({
    defaultValues: {
      title: '',
      price: '',
      description: '',
      image: '',
      category: ''
    },
    mode: 'all',
    resolver: productSchema
  })

  useEffect(() => {
    if (!id) return
    getProduct(Number(id)).then((data) => {
      methods.reset(data)
    })
  }, [id, methods])

  const handleSubmit = async (formData: IProducts) => {
    if (!id) {
      const { data } = await mutation(formData)
      await saveProduct(data)
    } else {
      await updateProduct(Number(id), formData)
    }
    navigate('/products')
  }

  return (
    <div>
      <h2>{!id ? 'Crear' : 'Editar'} Producto</h2>
      <div className="main d-flex justify-content-center">
        <FormProvider {...methods}>
          <div className="col-md-6">
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <div className="mb-3">
                <InputForm label="Título" name="title" />
              </div>
              <div className="mb-3">
                <InputForm label="Precio" name="price" />
              </div>
              <div className="mb-3">
                <InputForm label="Descripción" name="description" />
              </div>
              <div className="mb-3">
                <InputFile label="Imagen" name="image" />
              </div>
              <div className="mb-3">
                <Select label="Categoría" name="category" />
              </div>
              <hr className="my-4" />
              <Button className="w-100">Guardar</Button>
            </form>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

export default ProductCreate