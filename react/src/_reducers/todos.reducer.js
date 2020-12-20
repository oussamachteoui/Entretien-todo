import { todosConstants } from '../_constants';

export function todos(state = {}, action) {
    switch (action.type) {
        case todosConstants.GETALL_TODOS_REQUEST:
            return {
                loading: true
            };
        case todosConstants.GETALL_TODOS_SUCCESS:
            return {
                cours: action.cours
            };
        case todosConstants.GETALL_TODOS_FAILURE:
            return {
                error: action.error
            };
        case todosConstants.GET_TODOS_REQUEST:
            return {
                loading: true
            };
        case todosConstants.GET_TODOS_SUCCESS:
            return {
                todos: action.todos
            };                               
        case todosConstants.GET_TODOS_FAILURE:
            return {
                error: action.error
            };          
        default:
            return state
    }
}