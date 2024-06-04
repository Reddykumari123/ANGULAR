import { State, createReducer,createSelector,on } from "@ngrx/store";
import { AppState } from "./appstate";
import { addProducts, removeProduct, updatedProducts } from "./actions";



export const initialstate: AppState = {
    products : [],
};

export const productReducer = createReducer(
    initialstate,
    on(addProducts, (state, {products}) =>(
        {
            ...state,
            products : [...state.products, products]
        }
    )),


    on(updatedProducts, (state, {products}) =>(
        {
            ...state,
            products : [
                ...state.products.map(p => {
                  const updatedProduct = products.find(prod => prod.id === p.id); // Find the corresponding product from the updated products array
                  return updatedProduct ? { ...p, ...updatedProduct } : p; // Merge if found, otherwise return the original product
                })
            ]
            
            })),
          
          on(removeProduct, (state, { products }) => ({
            ...state,
            products: state.products.filter((p) => p.id !== products.id),
          }))
        );

        
    



    
    
