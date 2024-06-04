import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./appstate";

export const selectAppState = createFeatureSelector<AppState>('orderFormSelectedProducts');

export const selectProducts = createSelector(
    selectAppState,
    (state: AppState) => state.products
);

export const selectProductName = createSelector(
    selectAppState,
    (state: AppState) => state.products
);
export const selectUpdatedProducts = createSelector(
    selectProducts,
    (products) => {
      // Add your update logic here
      // For example, let's say you want to update a specific product by ID
      const updatedProducts = products.map((product) => {
        if (product.id === 'specific_product_id') {
          // Update the specific product here
          return { ...product, propertyToUpdate: 'new_value' };
        } else {
          return product;
        }
      });
  
      return updatedProducts;
    }
)
  // Define a selector to get the product to remove from the action
export const selectProductToRemove = (state: AppState, props: { productId: string }) => {
    // Assuming you have the product ID to be removed in the action payload
    return state.products.find(product => product.id === props.productId);
  };
  
  // Create a selector to filter out the product to be removed
  export const selectUpdatedProductsAfterRemoval = createSelector(
    selectProducts, // Use your existing selector to get all products
    selectProductToRemove, // Use the selector to get the product to be removed
    (products, productToRemove) => {
      // Filter out the product to be removed
      const updatedProducts = products.filter(product => product.id !== productToRemove.id);
      return updatedProducts;
    }
  );
