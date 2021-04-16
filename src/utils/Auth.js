
export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
    console.log(password, email);
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password: password,
            email: email
        })
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .catch((err) => console.log(err));
};


export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password: password, email:email})
    }).then((res) => {return res.json()}).then((data) => {
            console.log(data)
            if (data){
                localStorage.setItem('jwt', data.jwt);
                return data;
            }
        })
        .catch(err => console.log(err))
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json())
        .then(data => data)
}