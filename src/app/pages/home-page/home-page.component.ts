import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { EventsRepository } from '../../services/events-repository.service';
import { EventModel } from '../../models/event-model';
import { CreateEventModalComponent } from "./components/create-event-modal/create-event-modal.component";
import { DialogModule } from 'primeng/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [DialogModule, TimelineModule, CardModule, ButtonModule, CommonModule, CreateEventModalComponent],
  providers: [EventsRepository],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  protected events: EventModel[] = [];
  isCreateModalVisible = false;

  constructor(readonly eventsRepository: EventsRepository, readonly destroyRef: DestroyRef) {
    this.eventsRepository.getEvents()
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(
        events => {
        this.events = [...events].sort((x, y) => { 
          return x.start >= y.start ? 1 : -1
        });
      });
  }

  showCreateEventModal() {
    this.isCreateModalVisible = true;
  }

  handleOnCreateEventSaved(event: EventModel) {
    this.eventsRepository.addEvent(event);
    this.isCreateModalVisible = false;
  }
}
