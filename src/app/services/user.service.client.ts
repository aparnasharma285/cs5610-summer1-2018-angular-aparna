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
    return fetch('http://localhost:4000/api/user')
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
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }


  updateProfile(model) {
    return fetch('http://localhost:4000/api/user', {
      method: 'put',
      body: JSON.stringify(model),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => (
      response
    )).catch(error => {
      alert("update error");
    });
  }

  logout() {
    return fetch('http://localhost:4000/api/logout', {
      method: 'post',
      credentials: 'include'
    });
  }

  profile() {
    return fetch('http://localhost:4000/api/profile',
      {
        credentials: 'include'
      })
      .then(response => response.json())
      .catch( error =>
        alert("Please Login again to continue"));
  }

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch('http://localhost:4000/api/user', {
      body: JSON.stringify(user),
      credentials: 'include',
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => (
      response.json()
    ));
  }
}

