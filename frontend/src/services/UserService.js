import httpAxios from "./httpAxios";
 const UserService ={
    index: async () => {
        return await httpAxios.get('user');
      },
    trash: async() =>{
        return await httpAxios.get(`user/trash`);
    },
    show: async(id) =>{
        return await httpAxios.get(`user/show/${id}`);
    },
    insert: async (data) =>{
        return await httpAxios.post(`user/store`,data);
    },
    update: async (id, data) => {
        return await httpAxios.post(`user/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    status: async(id) =>{
        return await httpAxios.get(`user/status/${id}`);
    },
    delete: async(id) =>{
        return await httpAxios.get(`user/delete/${id}`);
    },
    restore: async(id) =>{
        return await httpAxios.get(`user/restore/${id}`);
    },
    destroy: async(id) =>{
        return await httpAxios.delete(`user/destroy/${id}`);
    },
    customer_login: async (data) => {
        return await httpAxios.post("customer/login", data);
    },
    customer_register: async (data) => {
        return await httpAxios.post("customer/register", data);
    },
    customer_profile: async (id) => {
        return await httpAxios.get(`customer/profile/${id}`);
    },
}
export default UserService;