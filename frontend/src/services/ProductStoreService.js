import httpAxios from "./httpAxios";

const ProductStoreService = {
    index: async () => {
        return await httpAxios.get(`product-store`);
    },
    trash: async () => {
        return await httpAxios.get(`product-store/trash`);
    },
    show: async (id) => {
        return await httpAxios.get(`product-store/show/${id}`);
    },
    insert: async (data) => {
        return await httpAxios.post(`product-store/store`, data);
    },
    update: async (id, data) => {
        return await httpAxios.post(`product-store/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    status: async (id) => {
        return await httpAxios.get(`product-store/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`product-store/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`product-store/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`product-store/destroy/${id}`);
    },
}

export default ProductStoreService;
