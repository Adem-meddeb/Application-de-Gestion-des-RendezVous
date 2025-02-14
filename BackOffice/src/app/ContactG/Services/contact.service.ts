// Import des éléments nécessaires d'Angular
import { Injectable } from '@angular/core';
import { Message } from '../contact.model'; // Interface définissant la structure d'un message

/**
 * Service pour la gestion des messages de contact
 * Fournit des fonctionnalités CRUD pour les messages
 */
@Injectable({
  providedIn: 'root' // Le service est disponible globalement dans l'application
})
export class ContactService {
  /**
   * Stockage en mémoire des messages (mock data pour le développement)
   * En production, remplacer par des appels API
   */
  private messages: Message[] = [
    {
      id: 1,
      senderName: 'Jean Dupont',
      senderEmail: 'jean.dupont@example.com',
      content: 'Bonjour, je souhaite prendre rendez-vous...',
      date: new Date('2024-03-15'),
      subject: 'Demande de rendez-vous'
    },
    {
      id: 2,
      senderName: 'Marie Curie',
      senderEmail: 'marie.curie@example.com',
      content: 'Question concernant les résultats...',
      date: new Date('2024-03-16'),
      subject: 'Question médicale'
    }
  ];

  constructor() { 
    // Le constructeur reste vide car aucune initialisation spéciale n'est nécessaire
    // Dans une vraie application, on pourrait initialiser une connexion API ici
  }

  /**
   * Récupère tous les messages
   * @returns Une copie des messages pour prévenir la mutation directe
   */
  getMessages(): Message[] {
    // Utilisation de map() et spread operator pour retourner une copie
    return this.messages.map(msg => ({ ...msg }));
  }

  /**
   * Trouve un message par son identifiant unique
   * @param id - L'identifiant numérique du message à trouver
   * @returns Une copie du message ou undefined si non trouvé
   */
  getMessageById(id: number): Message | undefined {
    // Recherche linéaire dans le tableau
    const message = this.messages.find(msg => msg.id === id);
    // Retourne une copie pour éviter les modifications accidentelles
    return message ? { ...message } : undefined;
  }

  /**
   * Supprime un message de la liste
   * @param id - L'identifiant numérique du message à supprimer
   */
  deleteMessage(id: number): void {
    // Filtrage du tableau pour exclure le message cible
    this.messages = this.messages.filter(msg => msg.id !== id);
  }

  /**
   * Ajoute un nouveau message (méthode optionnelle pour complétude)
   * @param newMessage - Le nouveau message à ajouter
   */
  addMessage(newMessage: Omit<Message, 'id'>): void {
    // Génération d'un nouvel ID (méthode basique pour le mock)
    const newId = Math.max(...this.messages.map(m => m.id)) + 1;
    
    // Création du message complet avec ID
    const completeMessage: Message = {
      ...newMessage,
      id: newId,
      date: new Date() // Force la date actuelle pour le mock
    };

    this.messages.push(completeMessage);
  }

  /**
   * Méthode de recherche générique (exemple supplémentaire)
   * @param searchTerm - Terme de recherche
   * @returns Messages correspondant au terme de recherche
   */
  searchMessages(searchTerm: string): Message[] {
    const term = searchTerm.toLowerCase();
    return this.messages.filter(msg =>
      msg.content.toLowerCase().includes(term) ||
      msg.subject.toLowerCase().includes(term) ||
      msg.senderName.toLowerCase().includes(term)
    );
  }
}