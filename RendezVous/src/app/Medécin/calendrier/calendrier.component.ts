// calendrier.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../Services/SharedService/shared.service';
import { CalendarOptions, EventInput, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Appointment } from '../Models/appointment.model';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css'],
  standalone: false,
})
export class CalendrierComponent implements OnInit {
  currentRoute: string;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    locale: 'fr',
    eventDisplay: 'block',
    eventTimeFormat: { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    eventClassNames: (arg) => {
      return ['custom-event', arg.event.extendedProps['status'].toLowerCase().replace(' ', '-')];
    },
    eventContent: this.customEventContent.bind(this),
    eventDidMount: this.addEventTooltip.bind(this)
  };

  constructor(private router: Router, private sharedService: SharedService) {
    this.currentRoute = this.router.url;
  }

  ngOnInit() {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.transformAppointmentsToEvents(this.sharedService.getAppointments()),
      initialDate: new Date()
    };
  }

  private transformAppointmentsToEvents(appointments: Appointment[]): EventInput[] {
    return appointments.map(appointment => ({
      title: `${appointment.patient.firstName} ${appointment.patient.lastName} - ${appointment.type}`,
      start: new Date(`${appointment.date}T${appointment.time}:00`),
      end: new Date(new Date(`${appointment.date}T${appointment.time}:00`).getTime() + 45*60000),
      extendedProps: {
        status: appointment.status,
        patient: appointment.patient,
        type: appointment.type
      }
    }));
  }

  private customEventContent(arg: EventContentArg) {
    const status = arg.event.extendedProps['status'];
    return {
      html: `
        <div class="event-content">
          <div class="event-time">${arg.timeText}</div>
          <div class="event-title">${arg.event.title}</div>
          <div class="event-status ${status.toLowerCase().replace(' ', '-')}">${status}</div>
        </div>
      `
    };
  }

  private addEventTooltip(info: { el: HTMLElement, event: any }) {
    const event = info.event;
    info.el.title = `
      Patient: ${event.extendedProps['patient'].firstName} ${event.extendedProps['patient'].lastName}
      Type: ${event.extendedProps['type']}
      Heure: ${event.start?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
      Durée: 45 min
      Statut: ${event.extendedProps['status']}
    `;
  }

  handleEventClick(info: any) {
    const patient = info.event.extendedProps.patient;
    this.sharedService.openPatientDetails(patient);
  }
}