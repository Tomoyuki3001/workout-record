class AuthService {
  login = async (email, password) => {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      return data;
    } else {
      throw new Error(data.message);
    }
  };

  logout = () => {
    localStorage.removeItem("token");
  };

  isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };
}

export default new AuthService();
