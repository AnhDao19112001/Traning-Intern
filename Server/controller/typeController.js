import {TypeTodo} from '../models/Todo.js';

export const getAllType = async (req,res) => {
    const result = await TypeTodo.find({});
    res.json(result);
}