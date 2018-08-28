export default class AuctionService {
    host = "http://localhost:61393";

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
}
