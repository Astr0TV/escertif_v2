import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConnexionService } from '../service/connexion.service';
import { AttestationsmodelComponent } from './attestationsmodel/attestationsmodel.component';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  formation: any;
  connexionnew: any;
  data!: string;
  google: any;

  constructor(private http: HttpClient, private route: Router, private connexionservice: ConnexionService, public dialog: MatDialog) { }

  /*Deconnexion */
  goToPage(pageName: string): void {
    this.route.navigate([`${pageName}`]);
    localStorage.clear();
  }

  ngOnInit(): void {
      /*methode qui permet de tester l'éligibilité de connexion pour l'utilisateur 
    * l'utilisateur une fois connecté ;il sera redériger vers son interface personnel selon son role*/    
   var test = JSON.parse(localStorage.getItem('userConnect') || '{}')
     if (this.connexionservice.isConnected()) {

          this.route.navigateByUrl('accueil');
    } else {
      this.route.navigateByUrl('connexion');
    
    }
  /* Cette API permet la Recupération des données de l'utilisateurs connecté (son nom, son prenom) */
    var test = JSON.parse(localStorage.getItem('userConnect') || '{}')
    this.http.get('http://localhost:8090/user/' + test.id).subscribe({
      next: (data) => {
        this.connexionnew = data;
      },
      error: (err) => { console.log(err); }
    });
    /**Cette API permet de recuperer la liste des personnes certifiés*/
    let headers = new HttpHeaders();
    headers = headers.set('X-Spreadsheet-Id', '1TuU8I95gERt0THusIVXGuu8mfEanW1DpMhwurdUye58').set('Authorization', 'Bearer 7DfIlwn7eTd7PYK3p7arciqZRJDemYFqLzONK8Ad2HB9kuhhcoP6VamSiHs')
    this.http.get('https://api.sheetson.com/v2/sheets/Dossiers en cours/', { headers: headers }).subscribe({
      next: (data) => {
        this.formation = data;
        console.log('this msg concernec les informations de');
        console.log(data)
      },
      error: (err) => { console.log(err); }
    });

    let headers2 = new HttpHeaders();
    headers = headers.set('X-Spreadsheet-Id', '1llzEoFjr-hQL9G6dXBVV-U11togkAhZxucron2GV5nM').set('Authorization', 'Bearer 7DfIlwn7eTd7PYK3p7arciqZRJDemYFqLzONK8Ad2HB9kuhhcoP6VamSiHs')
    this.http.get('https://api.sheetson.com/v2/sheets/Liste des formations FC/', { headers: headers2 }).subscribe({
      next: (data) => {
        this.google = data;
        console.log('this msg concernec les informations de');
        console.log(data)
      },
      error: (err) => { console.log(err); }
    });
  }



  /**Cette fonction permet de lancer un modal d'afficher l'exemplaire de certificat */

  opendialog(p: any) {
    this.connexionservice.cartif = p;
    this.dialog.open(AttestationsmodelComponent);

  }

}

