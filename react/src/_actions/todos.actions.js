import { todosConstants } from '../_constants';
import { coursService, todosService } from '../_services';
import {alertActions} from './alert.actions';



export const todosActions = {
    getAll,
    addTodo
};


//Get All Todos
function getAll() {
    return dispatch => {
        dispatch(request());

        todosService.getAll()
            .then(
                todos => dispatch(success(todos)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: todosConstants.GETALL_TODOS_REQUEST } }
    function success(todos) { return { type: todosConstants.GETALL_TODOS_SUCCESS, todos } }
    function failure(error) { return { type: todosConstants.GETALL_TODOS_FAILURE, error } }
}



function addTodo(todos){
    return dispatch => {
        dispatch(request(todos));
        console.log(todos);

        todosService.addTodo(todos)
            .then(
                todos => { 
                    dispatch(success());
                   
                    dispatch(alertActions.success('Todo Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(todos) { return { type: todosConstants.POST_TODO_REQUEST, todos } }
    function success(todos) { return { type: todosConstants.POST_TODO_SUCCESS, todos } }
    function failure(error) { return { type: todosConstants.POST_TODO_FAILURE, error } }
}
