import { ICategory } from "./ICategory"
import { IImage } from "./IImage"

export interface ISaleProduct {
  id: number;
  documentId: string;
  name: string;
  descripcion: string;
  stock: number;
  tasaComisionPorcentual: number;
  tasaComisionPorcentualAlMayor: number;
  precioNeto: number;
  precioAlMayor: number;
  descripcionDetallada: string;
  peso: string;
  paisOrigen: string;
  marca: string;
  EAN: string;
  quantity: number;
  imagenes?: IImage[] | IImage;
  categoria?: ICategory;
  localizations?: null | boolean | string | number | undefined | unknown | never | void | object | null[] | boolean[] | string[] | number[] | undefined[] | unknown[] | never[] | void[] | object[];
}