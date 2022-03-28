import { Todo } from "../../todo/models/todo";

export interface Folder{
    id:string,
    userId:string,
    title:string,
    todo:Array<Todo>,
    date:Date
}