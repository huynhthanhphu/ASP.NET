import httpAxios from "./httpAxios";

const ProductSaleService = {
    index: async () => {
        return await httpAxios.get(`product-sale`);
    },
    trash: async () => {
        return await httpAxios.get(`product-sale/trash`);
    },
    show: async (id) => {
        return await httpAxios.get(`product-sale/show/${id}`);
    },
    insert: async (data) => {
        return await httpAxios.post(`product-sale/store`, data);
    },
    update: async (id, data) => {
        return await httpAxios.post(`product-sale/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    status: async (id) => {
        return await httpAxios.get(`product-sale/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`product-sale/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`product-sale/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`product-sale/destroy/${id}`);
    },
}

export default ProductSaleService;
