import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    } ,
    day: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true
    }
});

const typeSchema = new mongoose.Schema({
    nameType: {
        type: String,
        required: true
    }
})

const REGEX_NAME = /^[\p{L}\p{Mn}\p{Mc}\s]+$/u;
const REGEX_DAY = /^[0-9+.]+$/;

function isValidateName(name){
    return REGEX_NAME.test(name);
}

function isValidateDay(day){
    return REGEX_DAY.test(day);
}

TodoSchema.pre('save',function(next){ //.pre dùng để đăng ký 1 middleware trước 1 sự kiện xác định
    if(!isValidateName(this.name) || !isValidateDay(this.day)){
        return next(new Error("Tên không chứa ký tự đặc biệt!"));
    }

    if(!this.name || this.name.trim().length === 0){
        return next(new Error("Tên không được để trống!"))
    } else if (this.name.trim().length < 2) {
        return next(new Error("Phải dài hơn 2 ký tự!"))
    } else if(this.name.trim().length > 50) {
        return next(new Error("Phải ít hơn 50 ký tự!"))
    }

    if(!this.day || this.day.trim().length === 0){
        return next(new Error("Time không được để trống!"))
    } else if (this.day.trim().length < 2) {
        return next(new Error("Phải dài hơn 2 ký tự!"))
    } else if(this.day.trim().length > 50) {
        return next(new Error("Phải ít hơn 50 ký tự!"))
    }
    next();
});

export const Todo = mongoose.model('todo',TodoSchema);
export const TypeTodo = mongoose.model('type',typeSchema);