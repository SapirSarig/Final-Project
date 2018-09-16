export default class AuctionService {
    host = "http://localhost:49923";

    createAuction(auction) {
        //var data = new FormData();
        //data.append("json", JSON.stringify(user));
        var data = JSON.stringify(auction);
        return fetch(`${this.host}/api/Auctions`, {
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

    getAuctionById(id){
        return fetch(`${this.host}/api/Auctions/${id}`, {
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

    getAllAuctions(){
        return fetch(`${this.host}/api/Auctions`, {
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

      getFilteredAuctions(searchStr){
        return fetch(`${this.host}/api/Auctions/FilteredAuctions?SearchStr=${searchStr}`, {
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

      getAllOffersOfAuction(auctionId){
        return fetch(`${this.host}/api/Auctions/GetAllOffers?AuctionId=${auctionId}`, {
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

      //delete?
}
