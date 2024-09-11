export interface InputProps {
  label: string;
  name: string;
  type? : string;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
}

export interface IProducts {
  id?: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
