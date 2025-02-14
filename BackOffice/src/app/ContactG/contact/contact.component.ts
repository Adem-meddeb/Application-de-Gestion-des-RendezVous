// Import des modules nécessaires
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Pour la gestion des boîtes de dialogue
import { MatTableDataSource } from '@angular/material/table'; // Source de données pour le tableau Material
import { ContactDetailsComponent } from '../contact-details/contact-details.component'; // Composant des détails du message
import { ContactService } from '../Services/contact.service'; // Service de gestion des messages
import { Message } from '../contact.model'; // Interface définissant la structure d'un message

/**
 * Composant pour l'affichage et la gestion de la liste des messages
 */
@Component({
  selector: 'app-contact', // Sélecteur HTML du composant
  standalone: false, // Indique que le composant n'est pas standalone
  templateUrl: './contact.component.html', // Chemin vers le template HTML
  styleUrl: './contact.component.css' // Chemin vers le fichier CSS
})
export class ContactComponent {
  // Colonnes à afficher dans le tableau Material
  displayedColumns: string[] = ['senderName', 'senderEmail', 'subject', 'date'];
  
  // Source de données pour le tableau lié au template
  dataSource: MatTableDataSource<Message>;

  /**
   * Constructeur initialisant les dépendances et les données
   * @param dialog Service pour l'ouverture de boîtes de dialogue
   * @param contactService Service de gestion des messages
   */
  constructor(
    private dialog: MatDialog,
    private contactService: ContactService
  ) {
    // Initialisation de la source de données avec les messages du service
    this.dataSource = new MatTableDataSource(this.contactService.getMessages());
  }

  /**
   * Ouvre une boîte de dialogue avec les détails complets d'un message
   * @param message Le message sélectionné à afficher
   */
  openMessageDetail(message: Message): void {
    // Récupération du message complet depuis le service
    const fullMessage = this.contactService.getMessageById(message.id);
    
    if (fullMessage) {
      // Configuration de la boîte de dialogue
      this.dialog.open(ContactDetailsComponent, {
        width: '600px', // Largeur fixe
        data: { message: fullMessage }, // Données transmises
        panelClass: 'message-dialog' // Classe CSS personnalisée
      });
    }
  }

  /**
   * Supprime un message et met à jour l'affichage
   * @param id Identifiant unique du message à supprimer
   */
  deleteMessage(id: number): void {
    // Appel au service pour suppression
    this.contactService.deleteMessage(id);
    
    // Mise à jour de la source de données
    this.dataSource.data = this.contactService.getMessages();
    
    // Optionnel: Ajouter un feedback utilisateur ici (snackbar, toast, etc.)
  }

  /**
   * Filtre les messages selon la saisie utilisateur
   * @param event Événement d'entrée utilisateur
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Réinitialise la pagination si disponible
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}