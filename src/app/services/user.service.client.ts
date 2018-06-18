export class UserServiceClient {

  findUserById(userId) {
    return fetch('http://localhost:4000/api/user/' + userId)
      .then(response => response.json());
  }

  findUserByUsername(username) {
    return fetch('http://localhost:4000/api/user/' + username)
      .then(response => response.json());
  }

  findAllUsers() {
    return fetch('http://localhost:4000/api/user/')
      .then(response => response.json());
  }

  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };
    return fetch('http://localhost:4000/api/login', {
      method: 'post',
      body: JSON.stringify(credentials),
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  logout() {
    return fetch('http://localhost:4000/api/logout', {
      method: 'post',
      credentials: 'same-origin'
    });
  }

  profile() {
    return fetch('http://localhost:4000/api/profile',
      {
        credentials: 'same-origin'
      })
      .then(response => response.json());
  }

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch('http://localhost:4000/api/user', {
      body: JSON.stringify(user),
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => (
      response.json()
    ));
  }
}

