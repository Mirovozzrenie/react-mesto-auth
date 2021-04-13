

class Api {
  constructor({ url, headers, groupId }) {
    this._headers = headers;
    this._url = url;
    this._groupId = groupId;
  }

  getInitialCards() {
    return fetch(`${this._url}/v1/${this._groupId}/cards`, {
      headers: this._headers
    }).then(this._check);
  }

  getUserServerInfo() {
    return fetch(`${this._url}/v1/${this._groupId}/users/me`, {
      headers: this._headers
    }).then(this._check);
  }

  setUserServerInfo(data) {
    return fetch(`${this._url}/v1/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._check);
  }

  addNewCard(data) {
    return fetch(`${this._url}/v1/${this._groupId}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._check);
  }

  removeCard(cardId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._check);
  }

  addLike(cardId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers
    }).then(this._check);
  }

  removeLike(cardId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._check);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this.removeLike(cardId);
    }
    return this.addLike(cardId);
  }


  patchUserAvatar(data) {
    return fetch(`${this._url}/v1/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
      avatar: data.avatar
      })
    }).then(this._check);
  }

  _check(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка на сервере ${res.status}`);
    }
    return res.json();
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co",
  headers: {
    "content-type": "application/json",
    authorization: "4f7a8deb-b8dc-4715-b562-817f1a68a8cc"
  },
  groupId: "cohort-20"
});


export { api }