import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { EventsRepository } from '../../services/events-repository.service';
import { EventModel } from '../../models/event-model';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TimelineModule, CardModule, ButtonModule, CommonModule],
  providers: [EventsRepository],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  protected events: EventModel[];

  constructor(readonly eventsRepository: EventsRepository) {
    this.events = eventsRepository.getEvents().sort((x, y) => { 
      return x.start >= y.start ? 1 : -1
    });
  }
}
