
export interface Todo{
    id:string,
    discription:string,
    isDone:boolean,
    name:string,
    date:Date,
    priority:number,
    folderId:string,
    tagId:Array<string>
}