import { DestroyRef, Injectable } from '@angular/core'
import { EventModel } from '../models/event-model'
import { CategoryModel } from '../models/category-model'
import { BehaviorSubject, Observable } from 'rxjs'
import { CategoriesRepository } from './categories-repository.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Injectable({
    providedIn: 'root',
})
export class EventsRepository {
    private events: EventModel[] = []
    private eventsSubject: BehaviorSubject<EventModel[]> = new BehaviorSubject(this.events)
    private categories: CategoryModel[] = []

    constructor(
        readonly categoriesRepository: CategoriesRepository,
        readonly destroyRef: DestroyRef
    ) {
        categoriesRepository
            .getCategories()
            .pipe(takeUntilDestroyed(destroyRef))
            .subscribe((categories) => (this.categories = [...categories]))
        this.initCategories()
    }

    getEvents(): Observable<EventModel[]> {
        return this.eventsSubject.asObservable()
    }

    addEvent(event: EventModel) {
        this.events = [...this.events, event]
        this.eventsSubject.next(this.events)
    }

    editEvent(event: EventModel) {
        this.events = [...this.events.filter((x) => x.id != event.id), event]
        this.eventsSubject.next(this.events)
    }

    deleteEvent(event: EventModel) {
        this.events = [...this.events.filter((x) => x.id != event.id)]
        this.eventsSubject.next(this.events)
    }

    private initCategories() {
        this.events = [
            {
                id: crypto.randomUUID(),
                name: 'UEFA Champions League Final',
                start: new Date('2024-11-10T21:00:00'),
                end: new Date('2024-11-10T23:00:00'),
                description: 'Final match between Manchester City and Inter Milan held in Istanbul.',
                imageUrl:
                    'https://m.media-amazon.com/images/S/pv-target-images/e289ef8df96b7ba8a662963ec522ac60b7f68eac384f1a7a6bdb5ce0c494ec74.jpg',
                category: this.categories[0],
            },
            {
                id: crypto.randomUUID(),
                name: 'Taylor Swift Concert',
                start: new Date('2024-11-15T20:00:00'),
                end: new Date('2024-11-15T23:00:00'),
                description: 'Taylor Swift performs her latest hits at Madison Square Garden.',
                imageUrl: 'https://schengen.news/wp-content/uploads/2024/01/Taylor-Swift-Eras-Tour-1.jpg',
                category: this.categories[1],
            },
            {
                id: crypto.randomUUID(),
                name: 'Avengers: Endgame Movie Screening',
                start: new Date('2024-11-01T18:00:00'),
                end: new Date('2024-11-01T21:00:00'),
                description: 'Special screening of Avengers: Endgame with director commentary.',
                imageUrl:
                    'https://images.thedirect.com/media/article_full/avengers-endgame-mcu-marvel-studios-disney-kevin-feige-leak.jpg',
                category: this.categories[2],
            },
            {
                id: crypto.randomUUID(),
                name: 'Google I/O Conference',
                start: new Date('2024-11-10T09:00:00'),
                end: new Date('2024-11-12T18:00:00'),
                description: 'Annual developer conference by Google, featuring tech talks and product releases.',
                imageUrl:
                    'https://media.cnn.com/api/v1/images/stellar/prod/screen-shot-2024-05-14-at-1-11-36-pm.png?c=16x9&q=h_833,w_1480,c_fill',
                category: this.categories[3],
            },
            {
                id: crypto.randomUUID(),
                name: "Wimbledon Men's Final",
                start: new Date('2024-11-16T14:00:00'),
                end: new Date('2024-11-16T17:00:00'),
                description: "The final match of the Wimbledon Men's Singles tournament.",
                imageUrl:
                    'https://e0.365dm.com/24/07/768x432/skysports-novak-djokovic-carlos-alcaraz_6625237.jpg?20240713001356',
                category: this.categories[0],
            },
            {
                id: crypto.randomUUID(),
                name: 'Beyoncé World Tour',
                start: new Date('2024-11-05T19:00:00'),
                end: new Date('2024-11-05T22:30:00'),
                description: 'Beyoncé performs live at Wembley Stadium as part of her world tour.',
                imageUrl:
                    'https://ew.com/thmb/4FERulFEKAWdfxv_uHXPWgDUCnE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/beyonce-tour-100323-22419fdd92974d1f963c4d2373ef7d7b.jpg',
                category: this.categories[1],
            },
        ]
        this.eventsSubject.next(this.events)
    }
}
