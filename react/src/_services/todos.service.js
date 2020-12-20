
export const todosService = {
    getAll,
    addTodo
};

const apiUrl = 'https://todomango.test:8080';


//Get All Todos
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${apiUrl}/api/all`, requestOptions).then(handleResponse);
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
            }else if(data && data.error && data.error == 'cours_empty'){
                 error = "Vous n'avez pas réservé aucun cours.";
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

function addTodo(todos){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todos)
    };

    return fetch(`${apiUrl}/api/add`, requestOptions).then(handleResponse);
}