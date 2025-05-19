import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Product} from "../types";

interface ProductStore {
    products: Product[];
    isLoading: boolean;
    addProduct: (product: Product) => void;
    setProducts: (products: Product[]) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (productId: string) => void;
    getProductById: (productId: string) => Product | undefined;
    updateLoading: (isLoading: boolean) => void;
    // getProductsByCategory: (category: string) => Product[];
}



export const useProductStore = create<ProductStore>()(
    persist(
        (set, get) => ({
            products: [],
            isLoading: false,
            addProduct: (product) => {
                set((state) => ({
                    products: [...state.products, product],
                }));
            },
            setProducts: (products) => {
                set(() => ({
                    products: products,
                }));
            },
            updateProduct: (updatedProduct) => {
                set((state) => ({
                    products: state.products.map((product) =>
                        product.id === updatedProduct.id ? updatedProduct : product
                    ),
                }));
            },
            deleteProduct: (productId) => {
                set((state) => ({
                    products: state.products.filter((product) => product.id !== productId),
                }));
            },
            getProductById: (productId) => {
                return get().products.find((product) => product.id === productId);
            },

            updateLoading: (isLoading) => {
                set(() => ({
                    isLoading: isLoading,
                }));
            }
        }),
        {
            name: "product-storage", // unique name
        }
    )
);