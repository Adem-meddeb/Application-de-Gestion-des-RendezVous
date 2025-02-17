import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Appointment } from '../../Models/appointment.model';
import { jsPDF } from 'jspdf';
import { style } from '@angular/animations';
import autoTable from 'jspdf-autotable';

interface MedicalHistory {
  diagnosis?: string;
  treatment?: string;
  notes?: string;
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly styles = {
    title: {
      fontSize: 20, // Réduit de 22 à 20
      textColor: [40, 53, 147] as [number, number, number], // Bleu plus foncé
      font: 'helvetica',
      style: 'bold'
    },
    header: {
      fontSize: 12, // Réduit de 14 à 12
      textColor: [40, 53, 147] as [number, number, number],
      background: [241, 243, 255] as [number, number, number],
      font: 'helvetica'
    },
    bodyText: {
      fontSize: 12,
      textColor: [55, 65, 81] as [number, number, number],
      lineHeight: 1.6
    },
    sectionMargin: 15,
    pageMargin: 40,
    logoSize: 50,
    spacing: 8 // Ajoutez cette ligne
  };

  constructor(private datePipe: DatePipe) { }

  public async generateMedicalRecordPdf(appointment: Appointment, logoUrl?: string): Promise<void> {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
  
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 40; // Augmenté de 30 à 40
  
    // En-tête professionnel
    if (logoUrl) {
      await this.addLogo(doc, logoUrl, 20, 12, 30); // Taille réduite à 30mm (au lieu de 40)
      doc.setFillColor(...this.styles.header.background);
      // Modifier la hauteur du rectangle
doc.rect(0, 0, pageWidth, 10, 'F'); // Hauteur réduite à 10mm (au lieu de 12)
    }
  
    // Titre principal
    this.createTitle(doc, 'DOSSIER MÉDICAL', pageWidth / 2, yPosition, true);
    yPosition += 20; // Augmenté l'espace après le titre
  
    // Informations de l'établissement
    this.createHeader(doc, [
      'TabibNet',
      'Bouargoub, Nabeul, 8040',
      'Tél: 58 270 519',
      'tabibnet03@gmail.com'
    ], pageWidth - 20, 25, 'right'); // Position Y ajustée à 25

    // Section Patient
    yPosition = this.createSection(doc, 'INFORMATIONS PATIENT', [
      `Nom complet: ${appointment.patient.firstName} ${appointment.patient.lastName}`,
      `Date de naissance: ${this.formatDate(appointment.patient.birthDate)} (${this.calculateAge(appointment.patient.birthDate)} ans)`,
      `ID Patient: ${appointment.patient.id}`,
      `Adresse: ${appointment.patient.address || 'Non renseignée'}`
    ], 20, yPosition);

    // Section Consultation
    yPosition = this.createSection(doc, 'DÉTAILS CONSULTATION', [
      `Date: ${this.formatDate(appointment.date)} à ${appointment.time}`,
      `Type: ${appointment.type}`,
      `Statut: ${appointment.status}`,
    ], 20, yPosition + this.styles.sectionMargin);

    // Historique Médical avec tableau
    if (appointment.medicalHistory) {
      yPosition = this.createMedicalHistoryTable(doc, appointment.medicalHistory, 20, yPosition + this.styles.sectionMargin);
    }

    // Pied de page professionnel
    this.createFooter(doc, `Document généré le ${this.datePipe.transform(new Date(), 'dd/MM/yyyy à HH:mm')}`);

    doc.save(this.generateFileName(appointment));
  }


  // pdf.service.ts
  private async addLogo(doc: jsPDF, url: string, x: number, y: number, size: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Ajouter pour les requêtes CORS
      img.src = url;

      // Gestion de timeout
      const timeout = setTimeout(() => {
        reject(new Error('Timeout de chargement du logo (5s)'));
      }, 5000);

      img.onload = () => {
        clearTimeout(timeout);
        try {
          doc.addImage(img, 'PNG', x, y, size, size);
          resolve();
        } // Après (vérification du type d'erreur)
        catch (e) {
          const message = e instanceof Error ? e.message : 'Erreur inconnue';
          reject(new Error(`Erreur d'insertion du logo: ${message}`));
        }
      };

      // Après (gestion correcte de l'événement d'erreur)
      img.onerror = (event) => {
        clearTimeout(timeout);
        const errorMessage = (event as ErrorEvent)?.message || 'Erreur inconnue';
        reject(new Error(`Échec du chargement du logo: ${url} - ${errorMessage}`));
      };
    });
  }

  private addSectionTitle(doc: jsPDF, text: string, x: number, y: number): number {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(this.styles.title.fontSize);
    doc.setTextColor(...this.styles.title.textColor);
    doc.text(text, x, y);
    return y + this.styles.spacing;
  }

  private addPatientSection(doc: jsPDF, appointment: Appointment, x: number, y: number): number {
    this.setHeaderStyle(doc);
    doc.text('PATIENT:', x, y);

    this.setValueStyle(doc);
    const patientInfo = [
      `Nom complet: ${appointment.patient.firstName} ${appointment.patient.lastName}`,
      `Date de naissance: ${this.formatDate(appointment.patient.birthDate)} (${this.calculateAge(appointment.patient.birthDate)} ans)`,
      `ID Patient: ${appointment.patient.id}`,
      `Adresse: ${appointment.patient.address || 'Non renseignée'}`
    ];

    patientInfo.forEach((line, index) =>
      doc.text(line, x + 10, y + 10 + (index * this.styles.spacing))
    );

    return y + (patientInfo.length * this.styles.spacing) + 15;
  }

  private addConsultationSection(doc: jsPDF, appointment: Appointment, x: number, y: number): number {
    this.setHeaderStyle(doc);
    doc.text('CONSULTATION:', x, y);

    this.setValueStyle(doc);
    const consultationDetails = [
      `Date: ${this.formatDate(appointment.date)} à ${appointment.time}`,
      `Type: ${appointment.type}`,
      `Statut: ${appointment.status}`
    ];

    consultationDetails.forEach((line, index) =>
      doc.text(line, x + 10, y + 10 + (index * this.styles.spacing))
    );

    return y + (consultationDetails.length * this.styles.spacing) + 15;
  }

  private addMedicalHistorySection(doc: jsPDF, appointment: Appointment, x: number, y: number): number {
    if (!appointment.medicalHistory) return y;

    this.setHeaderStyle(doc);
    doc.text('HISTORIQUE MÉDICAL:', x, y);

    this.setValueStyle(doc);
    let currentY = y + 10;
    const history = appointment.medicalHistory;

    const addField = (label: string, value: string) => {
      if (value) {
        doc.text(`${label}: ${value}`, x + 10, currentY);
        currentY += this.styles.spacing;
      }
    };

    addField('Diagnostic', history.diagnosis || 'Non spécifié');
    addField('Traitement', history.treatment || 'Non spécifié');
    addField('Observations', history.notes || 'Aucune observation');

    return currentY + this.styles.spacing;
  }

  private generateFileName(appointment: Appointment): string {
    const date = this.datePipe.transform(appointment.date, 'yyyyMMdd');
    return `Dossier_Medical_${appointment.patient.lastName}_${date}.pdf`;
  }

  private formatDate(date?: string): string {
    return date ?
      this.datePipe.transform(date, 'dd/MM/yyyy') || 'Date inconnue' :
      'Non spécifiée';
  }

  private calculateAge(birthDate?: string): number {
    if (!birthDate) return 0;
    const diff = Date.now() - new Date(birthDate).getTime();
    return new Date(diff).getUTCFullYear() - 1970;
  }

  private setHeaderStyle(doc: jsPDF): void {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(this.styles.header.fontSize);
    doc.setTextColor(...this.styles.header.textColor);
  }

  // Corrigez la méthode setValueStyle
  private setValueStyle(doc: jsPDF): void {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(this.styles.bodyText.fontSize); // Changé de 'value' à 'bodyText'
    doc.setTextColor(...this.styles.bodyText.textColor); // Changé de 'value' à 'bodyText'
  }

  private createTitle(doc: jsPDF, text: string, x: number, y: number, center: boolean = false): void {
    const pageWidth = doc.internal.pageSize.getWidth(); // Ajouter cette ligne
    
    doc.setFont(this.styles.title.font, this.styles.title.style);
    doc.setFontSize(20);
    doc.setTextColor(...this.styles.title.textColor);
    doc.text(text, x, y, { 
      align: center ? 'center' : 'left',
      maxWidth: pageWidth - 40 // Utiliser la variable locale
    });
    this.addLineSeparator(doc, x, y + 5, center ? 100 : 60, center);
  }

  private createSection(doc: jsPDF, title: string, content: string[], x: number, y: number): number {
    const pageWidth = doc.internal.pageSize.getWidth(); // Ajout de cette ligne

    // Le reste de la méthode reste inchangé
    doc.setFont(this.styles.header.font, 'bold');
    doc.setFontSize(this.styles.header.fontSize);
    doc.setTextColor(...this.styles.header.textColor);
    doc.text(title, x, y);

    // Style du contenu
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(this.styles.bodyText.fontSize);
    doc.setTextColor(...this.styles.bodyText.textColor);

    // Contenu avec gestion automatique des sauts de ligne
    const splitText = content.flatMap(text =>
      doc.splitTextToSize(text, pageWidth - 40)
    );

    doc.text(splitText, x + 5, y + 10, {
      lineHeightFactor: this.styles.bodyText.lineHeight
    });

    return y + (splitText.length * 8) + 15;
  }

  private createMedicalHistoryTable(doc: jsPDF, history: MedicalHistory, x: number, y: number): number {
    const headers = ['Catégorie', 'Détails'];
    const data = [
      ['Diagnostic', history.diagnosis || 'Non spécifié'],
      ['Traitement', history.treatment || 'Non spécifié'],
      ['Observations', history.notes || 'Aucune observation']
    ];
  
    let finalY = y;
  
    autoTable(doc, {
      startY: y,
      head: [headers],
      body: data,
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 10,
        cellPadding: 5,
        fillColor: [255, 255, 255],
        textColor: [55, 65, 81],
        lineColor: [200, 200, 200],
        lineWidth: 0.25
      },
      headStyles: {
        fillColor: [63, 81, 181],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [241, 243, 255]
      },
      margin: { left: x },
      didDrawPage: (data) => {
        // Vérification de null et mise à jour sécurisée
        if (data.cursor) {
          finalY = data.cursor.y;
        }
      }
    });
  
    return finalY + 10;
  }

  private createFooter(doc: jsPDF, text: string): void {
    const pageCount = doc.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        text,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
      this.addPageNumber(doc, i, pageCount);
    }
  }

  private addPageNumber(doc: jsPDF, current: number, total: number): void {
    doc.text(
      `Page ${current} sur ${total}`,
      doc.internal.pageSize.getWidth() - 20,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'right' }
    );
  }

  private addLineSeparator(doc: jsPDF, x: number, y: number, width: number, center: boolean = false): void {
    if (center) x = x - width / 2;
    doc.setLineWidth(0.3); // Épaisseur réduite
    doc.setDrawColor(100, 100, 100); // Couleur plus neutre
    doc.line(x, y, x + width, y);
  }

  private createHeader(doc: jsPDF, lines: string[], x: number, y: number, align: 'left' | 'center' | 'right' = 'left'): void {
    const pageWidth = doc.internal.pageSize.getWidth();
    const originalFontSize = doc.getFontSize();
    const originalColor = doc.getTextColor();
  
    doc.setFontSize(9);
    doc.setTextColor(80);
  
    lines.forEach((line: string, index: number) => {
      const lineHeight = 4.5;
      const maxWidth = pageWidth - 40;
      const splitText = doc.splitTextToSize(line, maxWidth);
      
      splitText.forEach((textLine: string, lineIndex: number) => {
        doc.text(textLine, x, y + (index * lineHeight) + (lineIndex * lineHeight), { 
          align,
          maxWidth
        });
      });
    });
  
    doc.setFontSize(originalFontSize);
    doc.setTextColor(originalColor);
  }

}