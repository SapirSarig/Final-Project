export default class NegotiationService {
    host = "http://localhost:49923";

    addMessage(message) {
        var msg = JSON.stringify(message);
        return fetch(`${this.host}/api/Messages`, {
          method: "POST",
          body: msg,
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

      getMessagesByOfferId(id){
        return fetch(`${this.host}/api/Messages/?chatId=${id}`, {
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