import httpAxios from "./httpAxios";
 const PostService ={
    index: async () => {
        return await httpAxios.get('post'); // Đảm bảo URL đúng với route API
      },
    trash: async() =>{
        return await httpAxios.get(`post/trash`);
    },
    show: async(id) =>{
        return await httpAxios.get(`post/show/${id}`);
    },
    insert: async (data) =>{
        return await httpAxios.post(`post/store`,data);
    },
    update: async (id, data) => {
        return await httpAxios.post(`post/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    status: async(id) =>{
        return await httpAxios.get(`post/status/${id}`);
    },
    delete: async(id) =>{
        return await httpAxios.get(`post/delete/${id}`);
    },
    restore: async(id) =>{
        return await httpAxios.get(`post/restore/${id}`);
    },
    destroy: async(id) =>{
        return await httpAxios.delete(`post/destroy/${id}`);
    },
    fetchNewPosts: async (limit) => {
        return await httpAxios.get(`post_new/${limit}`);
    }
}
export default PostService;