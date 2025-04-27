import httpAxios from "./httpAxios";

const LoginService = {
  login: async (data) => {
    return await httpAxios.post("/auth/login", data);
  },
};

export default LoginService;
