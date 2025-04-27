import httpAxios from "./httpAxios";

const BrandService = {
  // Lấy danh sách thương hiệu
  index: async () => {
    return await httpAxios.get(`brands`);
  },
  
  // Lấy danh sách thương hiệu đã bị xóa mềm
  getTrashed: async () => {
    return await httpAxios.get(`brand/trash`);
  },
  
  // Lấy chi tiết thương hiệu theo ID
  show: async (id) => {
    return await httpAxios.get(`brand/show/${id}`);
  },
  
  // Thêm mới thương hiệu
  insert: async (data) => {
    return await httpAxios.post(`brand/store`, data);
  },
  
  // Cập nhật thương hiệu
  update: async (id, data) => {
    return await httpAxios.post(`brand/update/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
},
  // Thay đổi trạng thái của thương hiệu
  status: async (id) => {
    return await httpAxios.get(`brand/status/${id}`);
  },
  
  // Xóa mềm thương hiệu (đưa vào thùng rác)
  delete: async (id) => {
    return await httpAxios.get(`brand/delete/${id}`);
  },
  
  // Khôi phục thương hiệu đã bị xóa mềm
  restore: async (id) => {
    return await httpAxios.get(`brand/restore/${id}`);
  },
  
  // Xóa vĩnh viễn thương hiệu
  destroy: async (id) => {
    return await httpAxios.delete(`brand/destroy/${id}`);
  },
};

export default BrandService;
