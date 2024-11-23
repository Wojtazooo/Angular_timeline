import { Injectable } from '@angular/core'
import { CategoryModel } from '../models/category-model'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class CategoriesRepository {
    private categories: CategoryModel[] = [
        { id: crypto.randomUUID(), name: 'Sports', color: '#1E90FF', icon: 'fa-solid fa-volleyball' },
        { id: crypto.randomUUID(), name: 'Concerts', color: '#FF6347', icon: 'fa-solid fa-music' },
        { id: crypto.randomUUID(), name: 'Movies', color: '#4B7782', icon: 'fa-solid fa-clapperboard' },
        { id: crypto.randomUUID(), name: 'Technology', color: '#32CD32', icon: 'fa-solid fa-microchip' },
    ]
    private categoriesSubject: BehaviorSubject<CategoryModel[]> = new BehaviorSubject(this.categories)

    constructor() {}

    getCategories(): Observable<CategoryModel[]> {
        return this.categoriesSubject.asObservable()
    }

    addCategory(category: CategoryModel) {
        this.categories = [...this.categories, category]
        this.categoriesSubject.next(this.categories)
    }
}
