import httpAxios from "./httpAxios";

const OrderService = {
    index: async () => {
        return await httpAxios.get(`order`); // Lấy danh sách order
    },
    trash: async () => {
        return await httpAxios.get(`order/trash`); // Lấy danh sách order đã xóa
    },
    show: async (id) => {
        return await httpAxios.get(`order/show/${id}`); // Lấy chi tiết order
    },
    insert: async (data) => {
        return await httpAxios.post(`order/store`, data); // Thêm order
    },
    update: async (id, data) => {
        return await httpAxios.post(`order/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    status: async (id) => {
        return await httpAxios.get(`order/status/${id}`); // Thay đổi trạng thái order
    },
    delete: async (id) => {
        return await httpAxios.get(`order/delete/${id}`); // Xóa order vào thùng rác
    },
    restore: async (id) => {
        return await httpAxios.get(`order/restore/${id}`); // Khôi phục order từ thùng rác
    },
    destroy: async (id) => {
        return await httpAxios.delete(`order/destroy/${id}`); // Xóa order khỏi CSDL
    },
};

export default OrderService;




