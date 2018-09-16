export default class UserService {
    host = "http://localhost:49923";

  getUserById(id) {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    return fetch(`${this.host}/api/Users/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json();
      })
  }
  getUserByEmail(email) {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    return fetch(`${this.host}/api/Users/GetUserByEmail?email=${email}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json();
      })
  }

  createBusinessUser(user) {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    var data = JSON.stringify(user);
    return fetch(`${this.host}/api/BusinessUsers`, {
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

  loginUser({email, password}) {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    var data = JSON.stringify({email, password});
    return fetch(`${this.host}/api/Authentication`, {
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

  loginExternalUser({email}) {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    return fetch(`${this.host}/api/Authentication?email=${email}`, {
      method: "GET",
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

  getAllUsers(){
    return fetch(`${this.host}/api/Users`, {
      method: "GET",
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

  //check
  AddReviewToUser(userId, review) {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    var data = JSON.stringify(userId,review);
    return fetch(`${this.host}api/Users/AddReview?userId=${userId}`, 
    {
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
  
}