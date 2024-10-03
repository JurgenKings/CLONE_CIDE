import { ICategory } from "./ICategory"
import { IImage } from "./IImage"

export interface ISaleProduct {
  id: number;
  documentId: string;
  name: string;
  description: string;
  stock: number;
  tasaComisionPorcentual: number;
  precioSinComision: number;
  priceAlMayor: number;
  descripcionDetallada: string;
  peso: string;
  quantity: number;
  images?: IImage[] | IImage;
  category?: ICategory;
  localizations?: null | boolean | string | number | undefined | unknown | never | void | object | null[] | boolean[] | string[] | number[] | undefined[] | unknown[] | never[] | void[] | object[];
}