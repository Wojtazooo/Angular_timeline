import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { CalendarModule } from 'primeng/calendar'
import { TableModule } from 'primeng/table'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { EventModel } from '../../models/event-model'

@Component({
    selector: 'app-events-table',
    standalone: true,
    imports: [TableModule, CalendarModule, FormsModule, CommonModule],
    templateUrl: './events-table.component.html',
})
export class EventsTableComponent implements OnChanges {
    @Input({ required: true }) events: EventModel[] = []
    @Output() onDelete: EventEmitter<EventModel> = new EventEmitter<EventModel>()
    @Output() onEdit: EventEmitter<EventModel> = new EventEmitter<EventModel>()

    protected filteredEvents: EventModel[] = []
    protected dateFilter = { from: null, to: null }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['events']) {
            this.updateFilteredEvents()
        }
    }

    updateFilteredEvents() {
        this.filteredEvents = this.events.filter((event) => {
            const eventStart = new Date(event.start).getTime()
            const eventEnd = new Date(event.end).getTime()
            const fromDate = this.dateFilter.from ? new Date(this.dateFilter.from).getTime() : null
            const toDate = this.dateFilter.to ? new Date(this.dateFilter.to).getTime() : null

            return (!fromDate || eventStart >= fromDate) && (!toDate || eventEnd <= toDate)
        })
    }
}
