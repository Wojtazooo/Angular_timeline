import { CategoryModel } from "./category-model";

export interface EventModel {
    id: number;
    name: string;
    start: Date;
    end: Date;
    description?: string;
    image?: string;
    category: CategoryModel
}

