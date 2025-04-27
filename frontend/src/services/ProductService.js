import httpAxios from "./httpAxios";

const ProductService = {
    index: async () => {
        return await httpAxios.get(`products`);
    },
    trash: async () => {
        return await httpAxios.get(`product/trash`);
    },
    show: async (id) => {
        return await httpAxios.get(`product/show/${id}`);
    },
    insert: async (data) => {
        return await httpAxios.post('/products/store', data);
    },
    update: async (id, data) => {
        return await httpAxios.post(`product/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    status: async (id) => {
        return await httpAxios.get(`product/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`product/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`product/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`product/destroy/${id}`);
    },
    newProducts: async (limit) => {
        return await httpAxios.get(`products/new/${limit}`);
    },
    productSale: async (limit) => {
        return await httpAxios.get(`product_sale/${limit}`);
    },
    productBestseller: async (limit) => {
        return await httpAxios.get(`product_bestseller/${limit}`);
    },
    productAll: async () => {
        return await httpAxios.get(`products`);
    },
    productCategory: async (categoryid, limit) => {
        return await httpAxios.get(`products/category/${categoryid}/${limit}`);
    },
    productDetail: async (id) => {
        return await httpAxios.get(`products/detail/${id}`);
    }
}

export default ProductService;
