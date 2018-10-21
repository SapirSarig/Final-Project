export default class OfferService {
  host = "http://localhost:49923";

  createOffer(offer) {
    //var data = new FormData();
    //data.append("json", JSON.stringify(user));
    var data = JSON.stringify(offer);
    return fetch(`${this.host}/api/Offers`, {
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

  getOfferById(id) {
    return fetch(`${this.host}/api/Offers/${id}`, {
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

  getAllOffers() {
    return fetch(`${this.host}/api/Offers`, {
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

  getOffersByAuctionId(id) {
    return fetch(`${this.host}/api/Offers/GetOffersByAuctionId?auctionId=${id}`, {
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
  getAllOffersByUserId(id) {
    return fetch(`${this.host}/api/Offers/GetOffersByUserId?userId=${id}`, {
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
  updateOffer(offerId, status){
    var data = JSON.stringify(status);
    return fetch(`${this.host}/api/Offers?offerId=${offerId}&status=${status}`, {
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

  getAllOffersByBusinessUserId(id) {
    return fetch(`${this.host}/api/Offers/GetAllOffersByBusinessUserId?userId=${id}`, {
      method: "GET",
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

  deleteOffer(offerId){
    var data = JSON.stringify(offerId);
    return fetch(`${this.host}/api/Offers/DeleteOffer?id=${offerId}`, {
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

  updateIsOpenNegotiations(OfferId){
    //var data = JSON.stringify(offerId);
    return fetch(`${this.host}/api/Offers/UpdateIsOpenNegotiation?id=${OfferId}`, {
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

  updatePrice(offerId, type, value){
    var data = JSON.stringify({type, value});
    return fetch(`${this.host}/api/Offers/UpdatePrice?offerId=${offerId}&type=${type}&value=${value}`, {
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
