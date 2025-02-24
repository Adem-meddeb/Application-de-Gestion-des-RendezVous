import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-politique-de-confidentialite',
  standalone: false,
  
  templateUrl: './politique-de-confidentialite.component.html',
  styleUrl: './politique-de-confidentialite.component.css'
})
export class PolitiqueDeConfidentialiteComponent implements OnInit {
  sections = [
    {
      title: 'Collecte des données',
      icon: 'security',
      content: `Les données personnelles collectées incluent les informations fournies lors de l'inscription, la prise de rendez-vous et l'utilisation des services. Nous enregistrons uniquement les données nécessaires au bon fonctionnement du service.`
    },
    {
      title: 'Finalités du traitement',
      icon: 'assignment',
      content: `Vos données sont utilisées pour : gestion des rendez-vous, personnalisation du service, amélioration continue de la plateforme, et conformité aux obligations légales. Aucun usage commercial externe n'est effectué sans consentement.`
    },
    {
      title: 'Sécurité des données',
      icon: 'lock',
      content: `Nous implémentons des mesures techniques et organisationnelles de pointe : chiffrement AES-256, audits réguliers, contrôle d'accès strict et sauvegardes journalières.`
    },
    {
      title: 'Droits des utilisateurs',
      icon: 'gavel',
      content: `Conformément au RGPD, vous pouvez exercer vos droits d'accès, rectification, opposition et portabilité via votre espace personnel ou par demande écrite à meddebadem000@gmail.com.`
    },
    {
      title: 'Partage des données',
      icon: 'share',
      content: `Les données médicales sensibles ne sont jamais partagées sans consentement explicite. Les partenaires techniques sont soumis à des clauses de confidentialité strictes.`
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}