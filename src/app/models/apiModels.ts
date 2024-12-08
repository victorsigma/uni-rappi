// Tipado para el producto individual
export interface Product {
    id: number;
    productname: string;
    description: string;
    price: number;
    stock: number;
    photoUrl: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

// Tipado para el producto dentro del carrito
export interface CartProduct {
    id: number;
    quantity: number;
    price: string;
    total: string;
    product: Product;
}

// Tipado para el carrito
export interface CartProductView {
    id: number;
    productname: string;
    description: string;
    price: number;
    stock: number;
    photoUrl: string;
    quantity: number;
    total: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

// Tipado para el carrito
export interface ShoppingCart {
    id: number;
    balance: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    cartProducts: CartProduct[];
}

// Respuesta genérica con metainformación
export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
    path: string;
    method: string;
    responseTime: string;
}

// Usamos el tipo genérico para especificar el tipo de "data" como ShoppingCart
export type ShoppingCartResponse = ApiResponse<ShoppingCart>;
