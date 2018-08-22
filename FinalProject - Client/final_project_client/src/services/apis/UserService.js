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
  createBusinessUser(user) {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    var data = JSON.stringify(user);
    return fetch(`${this.host}/api/AdvertiserUsers`, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  createInfluencerUser(user) {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    var data = JSON.stringify(user);
    return fetch(`${this.host}/api/InfluencerUsers
    `, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  loginUser(loginUser) {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    var data = JSON.stringify(loginUser);
    return fetch(`${this.host}/api/Users/Login`, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json();
      }).catch((err)=> {
        console.log(err);
      })
  }
}