import axios from "axios";

const createTodo = async (todo) => {
    try {
        const result = await axios.post(`http://localhost:8088/api/createTodo`,todo);
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log("---------------"+error);   
    } 
}

const search = async (findByName, sortBy, sortOrder) => {
    try {
        const result = await axios.get(`http://localhost:8088/api/todoList`, {
            params: {
                findByName: findByName,
                sortBy: sortBy,
                sortOrder: sortOrder
            }
        });
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findById = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8088/api/getByID/${id}`);
        console.log("--------------------"+result.data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

const updateTodo = async (id,todo) => {
    try {
        const result = await axios.patch(`http://localhost:8088/api/update/${id}`,todo);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteTodo = async (_id) => {
    try {
        const result = await axios.delete(`http://localhost:8088/api/delete/${_id}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

const changeStatusTodo = async (id) => {
    try {
      const result = await axios.patch(`http://localhost:8088/api/status/${id}`);
      return result.status;
    } catch (error) {
      throw error;
    }
  }

const typeStatus = async () => {
    try {
        const result = await axios.get(`http://localhost:8088/api/type`);
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

const todoService = {
    createTodo,
    findById,
    updateTodo,
    deleteTodo,
    search,
    changeStatusTodo,
    typeStatus
} 
export default todoService;