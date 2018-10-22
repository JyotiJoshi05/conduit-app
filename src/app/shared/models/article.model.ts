import { Time } from "@angular/common";
import { Author } from "./author.model";

export class Article{
    title: string;
    slug:string;
    body:string;
    createdAt:number;
    updatedAt: number;
    tagList:Array<string>;
    description:string;
    author:Author;
    favorited:boolean;
    favoritesCount:number;
}