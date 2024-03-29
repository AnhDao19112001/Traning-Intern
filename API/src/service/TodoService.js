import axios from "axios";

const createTodo = async (todo) => {
    try {
        const result = await axios.post(`http://localhost:8088/createTodo`,todo);
        return result.data;
    } catch (error) {
        console.log(error);   
    } 
}

const search = async (findByName,sortBy, sortOrder) => {
    try {
        const result = await axios.get(`http://localhost:8088/todoList/${findByName}?sortBy=${sortBy}&sortOrder=${sortOrder}`);
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

const findById = async (id) => {
    try {
        const result = await axios.get(`http://localhost:8088/getByID/${id}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

const updateTodo = async (id,todo) => {
    try {
        const result = await axios.patch(`http://localhost:8088/update/${id}`,todo);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteTodo = async (_id) => {
    try {
        const result = await axios.delete(`http://localhost:8088/delete/${_id}`);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

const changeStatusTodo = async (id) => {
    try {
      const result = await axios.patch(`http://localhost:8088/status/${id}`);
      return result.status;
    } catch (error) {
      throw error;
    }
  }

const todoService = {
    createTodo,
    findById,
    updateTodo,
    deleteTodo,
    search,
    changeStatusTodo
} 
export default todoService;