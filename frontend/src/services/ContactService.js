import httpAxios from "./httpAxios";

const ContactService = {
    index: async () => {
        return await httpAxios.get(`contact`); // Lấy danh sách contact
    },
    trash: async () => {
        return await httpAxios.get(`contact/trash`); // Lấy danh sách contact đã xóa
    },
    show: async (id) => {
        return await httpAxios.get(`contact/show/${id}`); // Lấy chi tiết contact
    },
    status: async (id) => {
        return await httpAxios.get(`contact/status/${id}`); // Thay đổi trạng thái contact
    },
    delete: async (id) => {
        return await httpAxios.get(`contact/delete/${id}`); // Xóa contact vào thùng rác
    },
    restore: async (id) => {
        return await httpAxios.get(`contact/restore/${id}`); // Khôi phục contact từ thùng rác
    },
    destroy: async (id) => {
        return await httpAxios.delete(`contact/destroy/${id}`); // Xóa contact khỏi CSDL
    },
    insert: async (data) => {
        return await httpAxios.post(`contact/store`, data); // Thêm contact
    },  
};

export default ContactService;




