export default class Cards {
  constructor({baseUrl, headers}) {
this._baseUrl = baseUrl
  //  console.log(headers)
  }

  getInitialCards() {
    fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: 'cc10f52f-9ca1-4d2e-8a59-ab54b230d125'
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  // другие методы работы с API
}
