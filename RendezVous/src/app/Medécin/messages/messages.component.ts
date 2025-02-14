import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  standalone: false,
  
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
  }
}
