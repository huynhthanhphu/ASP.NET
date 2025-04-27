import httpAxios from "./httpAxios";
 const CategoryService ={
    index: async () => {
        return await httpAxios.get('categories'); // Đảm bảo URL đúng với route API
      },
    trash: async() =>{
        return await httpAxios.get(`category/trash`);
    },
    show: async(id) =>{
        return await httpAxios.get(`category/show/${id}`);
    },
    insert: async (data) =>{
        return await httpAxios.post(`category/store`,data);
    },
    update: async (id, data) => {
        return await httpAxios.post(`category/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    status: async(id) =>{
        return await httpAxios.get(`category/status/${id}`);
    },
    delete: async(id) =>{
        return await httpAxios.get(`category/delete/${id}`);
    },
    restore: async(id) =>{
        return await httpAxios.get(`category/restore/${id}`);
    },
    destroy: async(id) =>{
        return await httpAxios.delete(`category/destroy/${id}`);
    },
}
export default CategoryService;