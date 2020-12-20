

export const userService = {
    login,
    logout,
    register
};

const apiUrl = 'http://todomango.test:8080';

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'email':email, 'password':password })
    };

    return fetch(`${apiUrl}/api/auth/login`, requestOptions)
        .then(handleResponseLogin)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/api/auth/register`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(response.statusText);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }
            var error ='';
            if(data && data.errors && data.errors.email){
                 error = data.errors.email;
            }else if(data && data.errors && data.errors.username){
                 error = data.errors.username;
            }else if(data && data.error && data.error == 'user_not_found'){
                 error = 'Cette adresse e-mail est introuvable.';
            }else if(data && data.error && data.error == 'password_not_found'){
                error = 'Le mot de passe actuel est incorrect.';                 
            }else{
                 error = response.statusText; 
            }
            return Promise.reject(error);
        }

        return data;
    });
}


function handleResponseLogin(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                const error = "Nom d'utilisateur ou mot de passe invalide";
                return Promise.reject(error);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}