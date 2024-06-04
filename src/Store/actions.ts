import { createAction, props } from "@ngrx/store";
import { Product } from "../app/Models/product";

export const loadProducts = createAction('[Product] Load Products');
export const addProducts = createAction('[product] Add', props<{products: Product}>());
export const removeProduct = createAction('[product] Remove', props<{products: Product}>());
export const updatedProducts = createAction('[product] Update', props<{products: Product[]}>());
export const clear = createAction('[product] Clear');
