import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { CiSearch } from "react-icons/ci";
import todoService from "../service/TodoService";
import "../css/search.css";
import"../css/pagination.css";
import { Formik, Form, Field } from "formik";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from "sweetalert2";
function Home() {
    const [currentItems, setCurrentItems] = useState([]);
    const [findByName, setFindByName] = useState("")
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [todoList, setTodoList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [todoObject, setTodoObject] = useState({});
    const [modal, setModal] = useState(false);

// --------------- Pagination --------------- //

    const itemsPerPage = 5;
    let stt = itemOffset;

    useEffect(() => {
      if (todoList) {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(todoList.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(todoList.length / itemsPerPage));
        let firstPage = document.querySelector(".page-next");
        let lastPage = document.querySelector(".page-previous");
        if (firstPage != null && lastPage != null) {
          if (itemOffset === 0) {
            if (endOffset >= todoList.length) {
              firstPage.style.display = "none";
              lastPage.style.display = "none";
            } else {
              firstPage.style.display = "none";
              lastPage.style.display = "block";
            }
          } else if (endOffset > todoList.length) {
            firstPage.style.display = "block";
            lastPage.style.display = "none";
          } else {
            firstPage.style.display = "block";
            lastPage.style.display = "block";
          }
        }
      }
    }, [itemOffset, itemsPerPage, todoList]);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % todoList.length;
      setItemOffset(newOffset);
    };

// --------------- Delete Todo --------------- //

const toggleModal = () => setModal(!modal);
    const deleteTodoApp = (obj) => {
        setTodoObject(obj);
        toggleModal();
    }

    const handleDelete = async (id) => {
        try {
            await todoService.deleteTodo(id);
            Swal.fire({
              title: `Delete success`,
              icon: "success"
            });
            const data = await todoService.search(findByName, sortBy, sortOrder);
            setTodoList(data);
            toggleModal();
        } catch (error) {
            console.log(error);
        }
    }

// --------------- Search and Sort and Show List Todo --------------- //

    useEffect(() => {
        const searchByName = async () => {
            try {
                const todoData = await todoService.search(findByName, sortBy, sortOrder);
                setTodoList(todoData);
            } catch (error) {
                console.log(error+'chưa được rồi');
            }
        };
        searchByName();
    }, [sortBy, sortOrder, findByName]);

    const handleSubmit = async (values) => {
      try {
          const result = await todoService.search(values.findByName, sortBy, sortOrder);
          setTodoList(result);
          setFindByName(values.findByName);
      } catch (error) {
          console.log(error);
      }
  };

// --------------- Status Todo App --------------- //

    // const handleStatus = async (id) => {
    //   try {
    //     if (id) {
    //       const todo = await todoService.findById(id);
    //       if (todo) {
    //         const updatedTodo = { ...todo, status: !todo.status };
    //         await todoService.updateTodo(id, updatedTodo);
    //         const updatedItems = currentItems.map(item => {
    //           if (item.id === id) {
    //             return { ...item, status: !item.status };
    //           }
    //           return item;
    //         });
    //         setCurrentItems(updatedItems);
    //       } else {
    //         throw new Error('Không tìm thấy công việc');
    //       }
    //     } else {
    //       throw new Error('id không tồn tại');
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    return(
        <>
            <h1 className="text-center mt-2">Todo App</h1>
            <div className="header-right mx-5 mt-4 mb-4 d-flex align-items-center justify-content-end">
              <Formik
              initialValues={{findByName: "" }}
              onSubmit={(values) => {handleSubmit(values)}}>
                  <Form className="header-search-form for-des mx-3" style={{paddingRight: "5px"}}>
                            <Field
                                type="findByName"
                                name="findByName"
                                id="form-input-home"
                                className="form-input m-0"
                                placeholder="Tìm kiếm ..."/>
                            <button type="submit" >
                                <CiSearch/>
                            </button>
                   </Form>
              </Formik>
              <div className="col-auto me-2">
                  <select className="form-select" onChange={(event) => setSortBy(event.target.value)}>
                    <option value="">Sắp xếp theo</option>
                    <option value="name">Name</option>
                    <option value="time">Time</option>
                    <option value="day">Day</option>
                  </select>
              </div>
              <div className="col-auto me-2">
                  <select className="form-select" onChange={(event) => setSortOrder(event.target.value)}>
                    <option value="asc">Giảm gần</option>
                    <option value="desc">Tăng dần</option>
                  </select>
              </div>
          <NavLink to={`/createTodo`} className={"btn btn-outline-primary float-end"} style={{marginRight:"85px"}}>Add Todo</NavLink>
          </div>

          <table className="table table-hover container mt-5">
            <thead className="text-center">
              <tr>
                <th scope="col">NO</th>
                <th scope="col">Todo</th>
                <th scope="col">Description</th>
                <th scope="col">Function</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {
                currentItems.map((value, key) => (
                  <tr key={key.id} scope="row">
                    <th scope="row">{++stt}</th>
                    <td><NavLink to={`/getByID/${value.id}`}>{value.name}</NavLink></td>
                    <td>{value.description}</td>
                    <td>
                      <NavLink to={`/update/${value.id}`} className={"btn btn-outline-warning mx-2"}>Update</NavLink>
                      <Button outline color="danger" className="btn btn-outline-modal" onClick={() => deleteTodoApp(value)}>Delete</Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      <div className="d-grid justify-content-center mt-2">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="< "
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              nextLinkClassName="page-previous"
              previousLinkClassName="page-next"
              activeClassName="active"
            />
          </div>
          <div>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Delete TodoApp</ModalHeader>
                <ModalBody>
                    Do you want to delete {todoObject.name} ?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Close</Button>
                    <Button color="danger" onClick={() => handleDelete(todoObject.id)}>Delete</Button>
                </ModalFooter>
            </Modal>
        </div>
        </>
    )
}
export default Home;