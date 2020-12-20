import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 import { todosActions } from '../../_actions';



function HomePage() {

    const [todos, setTodos] = useState({
        text: ''       
    });


    const registering = useSelector(state => state.registration.registering);
    const [submitted, setSubmitted] = useState(false);
    const todoList = useSelector(state => state.todos);
    console.log(todoList);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(todosActions.getAll());
        console.log(todoList);
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setTodos(todos => ({ ...todos, [name]: value }));
    }
    
    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if ( todos.text != '') {
            dispatch(todosActions.addTodo(todos));
        }
    }

    return (
        <div className="homepage">
        
        <div className="form-style formRegister">
                <h2>Add TODO</h2>
                <form name="form" onSubmit={handleSubmit}>          
                    
                    <div className="form-group">
                        <label>TODO</label>
                        <input type="text" name="text" onChange={handleChange} />
                    </div>                  
                   
                    <div className="form-group">
                        <button className="btn btn-outline-success">
                            {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                           ADD todo
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export { HomePage };