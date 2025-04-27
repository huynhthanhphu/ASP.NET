import httpAxios from "./httpAxios";

const BannerService = {
    index: async () => {
        return await httpAxios.get(`banner`); // Lấy danh sách banner
    },
    trash: async () => {
        return await httpAxios.get(`banner/trash`); // Lấy danh sách banner đã xóa
    },
    show: async (id) => {
        return await httpAxios.get(`banner/show/${id}`); // Lấy chi tiết banner
    },
    insert: async (data) => {
        return await httpAxios.post(`banner/store`, data); // Thêm banner
    },
    update: async (id, data) => {
        return await httpAxios.post(`banner/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    status: async (id) => {
        return await httpAxios.get(`banner/status/${id}`); // Thay đổi trạng thái banner
    },
    delete: async (id) => {
        return await httpAxios.get(`banner/delete/${id}`); // Xóa banner vào thùng rác
    },
    restore: async (id) => {
        return await httpAxios.get(`banner/restore/${id}`); // Khôi phục banner từ thùng rác
    },
    destroy: async (id) => {
        return await httpAxios.delete(`banner/destroy/${id}`); // Xóa banner khỏi CSDL
    },
    slider_list: async () => {
        return await httpAxios.get('banner'); // Lấy danh sách banner từ API
    },
};

export default BannerService;




