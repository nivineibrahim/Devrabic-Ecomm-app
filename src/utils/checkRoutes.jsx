import React from "react";
const storePath = "/";
const cartPath = "/cart";
const addProductsPath="/addProducts"

export const isStoreSelected = (currentPath) => currentPath === storePath;
export const isCartSelected= (currentPath) => currentPath === cartPath;
export const isAddProductsSelected=(currentPath) => currentPath === addProductsPath