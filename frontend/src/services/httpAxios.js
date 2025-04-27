import axios from "axios";

const httpAxios = axios.create({
    baseURL: 'http://localhost:5000/api', // Đảm bảo baseURL đúng
    timeout: 20000, // Thêm timeout để tránh yêu cầu quá lâu
});

// Thêm interceptor để xử lý phản hồi
httpAxios.interceptors.response.use(
    function (response) {
        // Kiểm tra dữ liệu trả về
        console.log(response.data); // In ra để kiểm tra dữ liệu
        return response.data;
    },
    function (error) {
        const { response } = error;
        if (response) {
            console.error('Lỗi từ server:', response.data);
        } else {
            console.error('Lỗi mạng hoặc server không phản hồi');
        }
        return Promise.reject(error);
    }
);

export default httpAxios;
