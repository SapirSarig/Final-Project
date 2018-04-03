export default class UserService {
    host = "http://localhost:61393";

  getUser() {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    return fetch(`${this.host}/api/Users/0`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        console.log(res.json());
      })
  }
}