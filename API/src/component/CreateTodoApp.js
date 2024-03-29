import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import todoService from "../service/TodoService";
import * as yup from 'yup';
import Swal from "sweetalert2";
function CreateTodoApp() {
    const navigate = useNavigate();
    return(
        <Formik 
        initialValues={{
            name: "",
            time: "",
            day: "",
            description: "",
        }} 
        validationSchema={yup.object({
            name: yup.string()
            .matches(/^[\p{L}\p{Mn}\p{Mc}\s]+$/u, "Tên không chứa ký tự đặc biệt!")
            .required("Không được để trống!").max(50,"Tên không được quá 50 ký tự!")
            .min(2,"Tên phải dài hơn 2 ký tự"),
            time: yup.string()
            .required("Tên không được để trống!").max(50,"Không quá 50 ký tự").min(2,"Phải dài hơn 2 ký tự!")
            .matches(/^[0-9+:]+$/,"Không chứa ký tự đặc biệt!"),
            day: yup.string()
            .required("Không được phép để trống!").max(50,"Không quá 50 ký tự").min(2,"Phải dài hơn 2 ký tự!")
            .matches(/^[0-9+.]+$/,"Không chứa ký tự đặc biệt!"),
            description: yup.string()
            .required("Không được để trống phần mô tả!")
        })}
        onSubmit={async (values) => {
            await todoService.createTodo(values);
            Swal.fire({
                title: "Add todo success",
                icon: "success"
            })
            navigate(`/`);
        }}>
            {({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6 offset-md-3">
                                <div className="mb-3">
                                    <h3 className="d-flex justify-content-center">Create TodoApp</h3>
                                </div>
                                <Form accept="" className="shadow p-4 mb-5">
                                    <div className="mb-3">
                                        <label htmlFor="name">Name Todo</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            id="name"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="mx-2"
                                            style={{
                                                height: "0.6rem",
                                                marginLeft: "68%",
                                                marginBottom: "1.3rem"
                                                }}>
                                            <ErrorMessage className="text-danger" name="name"
                                                            component="small" />
                                            </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="time">Time</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="time"
                                            id="time"
                                        />
                                    </div>
                                    <div className="row">
                                            <div className="mx-2"
                                                        style={{
                                                            height: "0.6rem",
                                                            marginLeft: "68%",
                                                            marginBottom: "1.3rem"
                                                        }}>
                                                        <ErrorMessage className="text-danger" name="time"
                                                            component="small" />
                                            </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="day">Day</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="day"
                                            id="day"
                                        />
                                    </div>
                                    <div className="row">
                                            <div className="mx-2 mb-4"
                                                        style={{
                                                            height: "0.6rem",
                                                            marginLeft: "68%",
                                                            marginBottom: "1.3rem"
                                                        }}>
                                                        <ErrorMessage className="text-danger" name="day"
                                                            component="small" />
                                            </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description">Description</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            id="description"
                                        />
                                    </div>
                                    <div className="row">
                                            <div className="mx-2"
                                                        style={{
                                                            height: "0.6rem",
                                                            marginLeft: "68%",
                                                            marginBottom: "1.3rem"
                                                        }}>
                                                        <ErrorMessage className="text-danger" name="description"
                                                            component="small" />
                                            </div>
                                    </div>
                                    <div className="mb-5">
                                        <NavLink to={`/`} type="button" className="btn btn-outline-dark float-start">Go Home</NavLink>
                                        <button type="button" onClick={handleSubmit} className="btn btn-outline-primary col-1 float-end" style={{width: "auto"}}>Save</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}


export default CreateTodoApp;