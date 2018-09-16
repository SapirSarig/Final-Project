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
                console.log(res);
                //return res.json();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getOfferById(id){
        return fetch(`${this.host}/api/Offers/${id}`, {
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

    getAllOffers(){
        return fetch(`${this.host}/api/Offers`, {
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

    getOffersByAuctionId(id){
      return fetch(`${this.host}/api/Offers/GetOffersByAuctionId?auctionId=${id}`, {
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
}
