import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { TimelineModule } from 'primeng/timeline'
import { EventModel } from '../../models/event-model'

@Component({
    selector: 'app-events-timeline',
    standalone: true,
    imports: [TimelineModule, CardModule, ButtonModule, CommonModule],
    templateUrl: './events-timeline.component.html',
})
export class EventsTimelineComponent {
    @Input({ required: true }) events: EventModel[] = []

    @Output() onDelete: EventEmitter<EventModel> = new EventEmitter<EventModel>()
    @Output() onEdit: EventEmitter<EventModel> = new EventEmitter<EventModel>()

    dateFormat = 'dd/MM/yyyy'
}
