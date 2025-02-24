import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mention-legales',
  standalone: false,
  
  templateUrl: './mention-legales.component.html',
  styleUrl: './mention-legales.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MentionLegalesComponent implements OnInit {
  legalSections = [
    {
      title: 'Éditeur de la Plateforme',
      content: `La plateforme est éditée par Adem Meddeb et Yassin Ben Mansour, responsables du contenu et du fonctionnement de l'application de gestion des rendez-vous médicaux.`,
      expanded: true
    },
    {
      title: 'Hébergement',
      content: `L'application est hébergée par des serveurs cloud sécurisés sous la responsabilité technique de Adem Meddeb et Yassin Ben Mansour. Les données sont stockées dans des centres de certification conformes aux normes européennes de protection des données.`
    },
    {
      title: 'Propriété Intellectuelle',
      content: `L'ensemble des éléments constitutifs de la plateforme (design, code source, bases de données, logos) sont la propriété exclusive de Adem Meddeb et Yassin Ben Mansour. Toute reproduction ou utilisation non autorisée est strictement interdite et protégée par les lois sur la propriété intellectuelle.`
    },
    {
      title: 'Responsabilité',
      content: `Les informations présentes sur la plateforme sont fournies à titre indicatif. Adem Meddeb et Yassin Ben Mansour déclinent toute responsabilité concernant d'éventuelles inexactitudes ou omissions. L'utilisation des services proposés s'effectue sous l'entière responsabilité de l'utilisateur.`
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleSection(section: any): void {
    section.expanded = !section.expanded;
  }
}