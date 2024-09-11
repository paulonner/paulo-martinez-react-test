import Dexie, { type EntityTable } from 'dexie'

interface IProduct {
  id: number,
  title: string,
  description: string,
  price: number,
  image: string,
  category: string
}

const db = new Dexie('myDatabase') as Dexie & {
  products: EntityTable<IProduct, 'id'>
}

db.version(1).stores({
  products: 'id, title, price, description, image, category'
})


export const saveProduct = async (payload: IProduct) => {
  const allProducst = await getAllProducts()
  const id = allProducst.length + payload.id
  
  //console.log(dat);
  
  await db.products.add({
    ...payload,
    id
  })
}

export const getProduct = async (id: number) => {
  return await db.products.get(id)
}

export const getAllProducts = async () => {
  return await db.products.toArray()
}

export const deleteProduct = async (id: number) => {
  await db.products.delete(id)
}

export const updateProduct = async (id: number, payload: Partial<IProduct>) => {
  await db.products.update(id, payload)
}