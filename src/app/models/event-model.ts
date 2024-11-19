import { CategoryModel } from "./category-model";

export interface EventModel {
    id: string;
    name: string;
    start: Date;
    end: Date;
    description?: string;
    image?: string;
    category: CategoryModel
}

