import { Author } from "./author.model";

export class Comment{
    id:number;
    createdAt:number;
    updatedAt:number;
    body:string;
    author:Author;
}