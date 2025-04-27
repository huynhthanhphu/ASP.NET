import httpAxios from "./httpAxios";

const MenuService = {
    index: async () => {
        return await httpAxios.get(`menu`); // Lấy danh sách menu
    },
    trash: async () => {
        return await httpAxios.get(`menu/trash`); // Lấy danh sách menu đã xóa
    },
    show: async (id) => {
        return await httpAxios.get(`menu/show/${id}`); // Lấy chi tiết menu
    },
    insert: async (data) => {
        return await httpAxios.post(`menu/store`, data); // Thêm menu
    },
    update: async (id, data) => {
        return await httpAxios.post(`menu/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    status: async (id) => {
        return await httpAxios.get(`menu/status/${id}`); // Thay đổi trạng thái menu
    },
    delete: async (id) => {
        return await httpAxios.get(`menu/delete/${id}`); // Xóa menu vào thùng rác
    },
    restore: async (id) => {
        return await httpAxios.get(`menu/restore/${id}`); // Khôi phục menu từ thùng rác
    },
    destroy: async (id) => {
        return await httpAxios.delete(`menu/destroy/${id}`); // Xóa menu khỏi CSDL
    },
    menu_list: async () => {
        return await httpAxios.get(`menu_list`);
    }
};

export default MenuService;




