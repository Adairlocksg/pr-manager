export class LoginService {
  public static login(token: string, username: string) {
    localStorage.setItem("@token", token);
    localStorage.setItem("@username", username);
  }

  public static logout() {
    localStorage.removeItem("@token");
    localStorage.removeItem("@username");
  }
}
