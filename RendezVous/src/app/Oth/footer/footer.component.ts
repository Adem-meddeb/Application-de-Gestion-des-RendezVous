import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  year: number = new Date().getFullYear();

  accounts = [
    {
      name: "Adem Meddeb",
      github: "https://github.com/Adem-meddeb",
      linkedin: "https://www.linkedin.com/in/adem-meddeb-750ab5261/"
    }
  ];
}
