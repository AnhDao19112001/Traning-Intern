import {Todo} from '../models/Todo.js';
/**
 * Author: DaoPTA
 * Show list Todo App
 * day: 28/03/2024
 * @param {sortBy} req 
 * @param {sortOrder} res 
 */
export const getAllTodoList = async (req,res) => {
    let sortField = req.query.sortBy || 'name';
    let sortOrder = parseInt(req.query.sortOrder) || 1;
    if (sortOrder === -1) {
        sortOrder = -1;
    } else {
        sortOrder = 1;
    }
    let sortOption = {};
    sortOption[sortField] = sortOrder;
    Todo.find({}).sort(sortOption).then(function(todo) {
        res.json(todo);
    }).catch(function(err) {
        res.json(err);
    })
}

/**
 * Author: DaoPTA
 * Search And Sort Todo App
 * day: 28/03/2024
 * @param {sortBy} req 
 * @param {sortOrder} res 
 */
export const getTodoByName = async (req, res) => {
    try {
        let sortField = req.query.sortBy || 'name';
        let sortOrder = parseInt(req.query.sortOrder) || 1;
        if (!req.query.sortBy) {
            sortField = 'name';
        }
        if (isNaN(sortOrder)) {
            sortOrder = 1; 
        }
        if (sortOrder === -1) {
            sortOrder = -1;
        } else {
            sortOrder = 1;
        }
        let sortOption = {};
        sortOption[sortField] = sortOrder;
        
        let result;
        const searchName = req.params.name || '';
        if (searchName) {
            result = await Todo.find({
                "$or": [{
                    name: { $regex: searchName }
                }]
            }).sort(sortOption);
        } else {
            result = await Todo.find({}).sort(sortOption);
        }
        
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
/** 
 * author: DaoPTA
 * Create todo 
 * day: 28/03/2024
 */
export const createTodo = async (req, res) => {
    try {
        const { name, time, day, description } = req.body;
        const data = new Todo({ name, time, day, description, status: false }); 
        const result = await data.save();
        console.log(result);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};


/**
 * author: DaoPTA
 * getByID todo app
 * day: 28/03/2024
 */
export const getTodoById = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
/**
 * author: DaoPTA
 * Delete todo find by ID
 * day: 28/03/2024
 */
export const deleteTodoById = async (req, res) => {
    try {
        const todoId = req.params.id;
        const deletedTodo = await Todo.findByIdAndDelete(todoId);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo không tìm thấy' });
        }
        res.json({ message: `Todo ${deletedTodo.name} đã được xóa` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
/**
 * author: DaoPTA
 * Update todo 
 * day: 22/03/2024
 */
export const updateTodoById = async (req, res) => {
    try {
        const todoId = req.params.id;
        const updateTodo = req.body;
        const options = { new: true };
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, updateTodo, options);
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const changeStatusTodo = async (req, res) => {
    try {
      const todoId = req.params.id;
      const todo = await Todo.findById(todoId);
      if (!todo) {
        return res.status(404).json({ message: 'Không tìm thấy mục cần tìm' });
      }
    //   todo.status = true;
      todo.status = !todo.status;
      await todo.save();
      return res.status(200).json({ message: 'Đã thay đổi trạng thái thành công' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Đã xảy ra lỗi khi thay đổi trạng thái' });
    }
  };
  
  