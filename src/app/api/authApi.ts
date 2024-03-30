import { requestApi } from "./api";

const login = (credentials) => {
  const { data, error, isLoading } = requestApi({
    method: "POST",
    url: "http://localhost:5000/auth/login",
    data: credentials,
  });

  return { data, error, isLoading };
};

const logout = () => {
  const { data, error, isLoading } = requestApi({
    method: "POST",
    url: "http://localhost:5000/auth/logout",
  });
  return { data, error, isLoading };
};

export { login, logout };
