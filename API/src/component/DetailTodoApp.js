import { useEffect, useState } from "react";
import todoService from "../service/TodoService";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
function DetailTodoApp() {
    const [todo, setTodo] = useState({});
    const [typeStatus, setTypeStatus] = useState([])
    const param = useParams();

    const getListStatus = async () => {
        const result = await todoService.typeStatus();
        setTypeStatus(result)
    }

    useEffect(() => {
        getListStatus();
    },[])

    const getDetail = async () => {
        const result = await todoService.findById(param.id);
        console.log(result);
        setTodo(result);
    } 
    useEffect(() => {
        getDetail();
    },[param.id])
    return(
        <form>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="mb-3">
                            <h3 className="d-flex justify-content-center">Detail TodoApp</h3>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name">Name Todo</label>
                                <p type=""
                                    className="form-control"
                                    name="name"
                                    id="name">{todo.name}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="time">Time</label>
                                <p type=""
                                    className="form-control"
                                    name="time"
                                    id="time">{todo.time}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="day">Day Todo</label>
                                <p type=""
                                    className="form-control"
                                    name="day"
                                    id="day">{todo.day}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description">Description Todo</label>
                                <p type=""
                                    className="form-control"
                                    name="description"
                                    id="description">{todo.description}</p>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="description">Trạng thái công việc</label>
                        <p type=""
                                    className="form-control"
                                    name="type"
                                    id="type">{todo.type_status?.type}</p>
                    </div>

                        <div className="mb-5">
                            <NavLink to={`/`} type="button" className="btn btn-outline-dark float-start">Go Home</NavLink>
                        </div>
                    </div>  
                </div>
            </div>
        </form>
    )
}
export default DetailTodoApp;