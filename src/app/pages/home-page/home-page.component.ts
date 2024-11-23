import { CommonModule } from '@angular/common'
import { Component, DestroyRef } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { TimelineModule } from 'primeng/timeline'
import { EventsRepository } from '../../services/events-repository.service'
import { EventModel } from '../../models/event-model'
import { CreateEventModalComponent } from './components/create-event-modal/create-event-modal.component'
import { DialogModule } from 'primeng/dialog'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService, MessageService } from 'primeng/api'
import { InputSwitchModule } from 'primeng/inputswitch'
import { FormsModule } from '@angular/forms'
import { TableModule } from 'primeng/table'
import { CalendarModule } from 'primeng/calendar'
import { EventsTimelineComponent } from './components/events-timeline/events-timeline.component'
import { EventsTableComponent } from './components/events-table/events-table.component'

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        FormsModule,
        DialogModule,
        TableModule,
        CalendarModule,
        ButtonModule,
        CommonModule,
        CreateEventModalComponent,
        ConfirmDialogModule,
        InputSwitchModule,
        EventsTimelineComponent,
        EventsTableComponent,
    ],
    providers: [EventsRepository, MessageService],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
    protected events: EventModel[] = []
    isCreateModalVisible = false
    eventToDelete: EventModel | undefined = undefined
    displayAsTimeLine = true
    dateFormat = 'dd/MM/yyyy'

    constructor(
        readonly eventsRepository: EventsRepository,
        private readonly confirmationService: ConfirmationService,
        readonly destroyRef: DestroyRef,
        private messageService: MessageService
    ) {
        this.eventsRepository
            .getEvents()
            .pipe(takeUntilDestroyed(destroyRef))
            .subscribe((events) => {
                this.events = [...events].sort((x, y) => {
                    return x.start >= y.start ? 1 : -1
                })
            })
    }

    showCreateEventModal() {
        this.isCreateModalVisible = true
    }

    handleOnCreateEventSaved(event: EventModel) {
        this.eventsRepository.addEvent(event)
        this.isCreateModalVisible = false
    }

    handleDeleteButtonClick(eventModel: EventModel) {
        this.confirmationService.confirm({
            message: `Are you sure that you want to delete '${eventModel.name}?'`,
            header: 'Delete confirmation',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'You have accepted',
                })
                this.eventsRepository.deleteEvent(eventModel)
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                    life: 3000,
                })
            },
        })
    }
}
