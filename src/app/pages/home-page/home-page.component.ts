import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { EventsRepository } from '../../services/events-repository.service';
import { EventModel } from '../../models/event-model';
import { CreateEventModalComponent } from "./components/create-event-modal/create-event-modal.component";
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [DialogModule, TimelineModule, CardModule, ButtonModule, CommonModule, CreateEventModalComponent],
  providers: [EventsRepository],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  protected events: EventModel[];
  isCreateModalVisible = false;

  constructor(readonly eventsRepository: EventsRepository) {
    this.events = eventsRepository.getEvents().sort((x, y) => { 
      return x.start >= y.start ? 1 : -1
    });
  }

  showCreateEventModal() {
    this.isCreateModalVisible = true;
  }
}
