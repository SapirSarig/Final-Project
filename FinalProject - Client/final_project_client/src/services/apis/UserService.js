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

  getFilteredInfluencersByName(searchStr) {
    return fetch(`${this.host}/api/Users/GetFilteredInfluencersByName?SearchStr=${searchStr}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json();
      }).catch((err) => {
        console.log(err);
      })
  }

  getFilteredUsersByName(searchStr) {
    return fetch(`${this.host}/api/Users/GetFilteredUsersByName?SearchStr=${searchStr}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json();
      }).catch((err) => {
        console.log(err);
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
    return fetch(`${this.host}/api/InfluencerUsers`,
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

  loginUser(info) {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    var data = JSON.stringify(info);
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
      }).catch((err) => {
        console.log(err);
      })
  }

  loginExternalUser({ email }) {
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
      }).catch((err) => {
        console.log(err);
      })
  }

  getAllUsers() {
    return fetch(`${this.host}/api/Users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json();
      }).catch((err) => {
        console.log(err);
      })
  }

  //check
  AddReviewToUser(userId, review) {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    var data = JSON.stringify(review);
    return fetch(`${this.host}/api/Users/AddReview?userId=${userId}`,
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

  SendLinkToResetPassword(obj) {
    var data = JSON.stringify(obj);
    return fetch(`${this.host}/api/Users/SendLinkToResetPassword`, {
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
        alert(err);
      })
  }

  resetPasswordToUser(authUser, password) {
    var data = JSON.stringify({ AuthUser: authUser, Password: password });
    return fetch(`${this.host}/api/Users/ResetPassword`, {
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
        alert(err);
      })
  }

  UpdateBusinessUser(userToUpdate) {
    var data = JSON.stringify(userToUpdate);
    return fetch(`${this.host}/api/BusinessUsers`, {
      method: "PATCH",
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

  UpdateInfluencerUser(userToUpdate) {
    var data = JSON.stringify(userToUpdate);
    return fetch(`${this.host}/api/InfluencerUsers`, {
      method: "PATCH",
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

  GetAllInfluencerUserOffers(id) {
    return fetch(`${this.host}/api/InfluencerUsers/GetAllOffers?userId=${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json();
      }).catch((err) => {
        console.log(err);
      })
  }

  sendMailToBusinessUser(auctionId) {
    var data = JSON.stringify(auctionId);
    return fetch(`${this.host}/api/Users/SendMailToBusinessUser?auctionId=${auctionId}`, {
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

  AddStar(Id, NumOfStars) {
    return fetch(`${this.host}/api/Users/AddStars?id=${Id}&NumOfStars=${NumOfStars}`, {
      method: "POST",
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

  sendMailToInfluencerUser(offerId,auctionName){
    var data = JSON.stringify(auctionName);
    return fetch(`${this.host}/api/Users/SendMailToInfluencerUser?offerId=${offerId}&auctionName=${auctionName}`, {
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

  getAllUserChats(userId){
    return fetch(`${this.host}/api/Users/GetAllChats?id=${userId}`, {
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

}