import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Departement } from 'app/models/shared/departement.model';
import { Poste } from 'app/models/shared/poste.model';
import { Site } from 'app/models/shared/site.model';
import { Utilisateur } from 'app/models/shared/utilisateur.model';
import { ApiService } from 'app/services/shared/api.service';
import { NotificationService } from 'app/services/shared/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-poste',
  templateUrl: './dialog-poste.component.html',
  styleUrls: ['./dialog-poste.component.scss']
})
export class DialogPosteComponent implements OnInit {

  
  posteForm!: FormGroup;
  utilisateurs!: Utilisateur[];
  departements: Departement[] = [];
  ListePoste!: Poste[];
  poste: Poste = new Poste();
  ActionBtn: string = "Ajouter";
  private jwtHelper = new JwtHelperService();
  public matricule: string = '';
  private _onDestroy = new Subject<void>();
  filteredUsers: Utilisateur[];
  public userFilterCtrl: FormControl = new FormControl();
  sites!: Site[];
  
  constructor(private builder: FormBuilder, 
              private service: ApiService, 
              private dialogRef: MatDialogRef<DialogPosteComponent>, 
              @Inject(MAT_DIALOG_DATA) public editData: Poste,
              // @Inject(MAT_DIALOG_DATA) public data: { id: number, editData: Poste },
              private notificationService: NotificationService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.posteForm = this.builder.group({
      // id : ['', [Validators.required, Validators.pattern(/^-?[0-9]\d*(\d+)?$/)]],
      numéro : ['', Validators.required],
      utilisateurId : ['', Validators.required],
      etage : ['', Validators.required],
      siteId : [],
      userAjout: [''],
    });
    this.getUtilisateurs();
    this.getSites();
    
    this.service.GetDepartements().subscribe((departements: Departement[]) => {
          this.departements = departements;
        });

    this.userFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterUsers();
    });
    
    console.log(this.editData)
    if(this.editData){
      this.ActionBtn = "Modifier";
      this.posteForm.setValue({
        numéro: this.editData.numéro,
        utilisateurId: this.editData.utilisateurId,
        etage: this.editData.etage,
        siteId: this.editData.siteId,
        userAjout: this.editData.userAjout
      });
    }
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.matricule = decodedToken.family_name;
    }
  }

  filterUsers() {
    let search = this.userFilterCtrl.value;
    if (!search) {
      this.filteredUsers = this.utilisateurs.slice();
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredUsers = this.utilisateurs.filter(user => 
      user.nom.toLowerCase().indexOf(search) > -1 || user.prenom.toLowerCase().indexOf(search) > -1);
  }
  AjouterPoste(){
    
    if(!this.editData){
      if(this.posteForm.valid){
        
        this.posteForm.value.numéro= parseInt(this.posteForm.value.numéro);
        this.posteForm.value.userAjout = this.matricule;
        const userAjout = this.posteForm.value.userAjout;
        const utilisateur = this.utilisateurs.find(u => u.id === this.posteForm.value.utilisateurId);
        const departement = this.departements.find(d => d.id === utilisateur.departementId);
        console.log(departement)
        this.posteForm.value.siteId = departement.siteId;
        console.log(this.posteForm.value);
        this.service.AddPoste( { ...this.posteForm.value, userAjout }).subscribe(()=>{

          this.posteForm.reset();
          this.dialogRef.close('ajouter');
          this.notificationService.success('Poste added successfully !');
        },
        ()=>{
          this.notificationService.danger('Error when adding a Poste.');
        })
      }
    } else {
      this.updatePoste();
    }
  }

  updatePoste(){
    this.posteForm.value.numéro= parseInt(this.posteForm.value.numéro);
    
    this.posteForm.value.userModif = this.matricule;
    const userModif = this.posteForm.value.userModif;

    const utilisateur = this.utilisateurs.find(u => u.id === this.posteForm.value.utilisateurId);
    const departement = this.departements.find(d => d.id === utilisateur.departementId);
    console.log(departement)
    this.posteForm.value.siteId = departement.siteId;
    
    if (this.posteForm.valid) {
    this.service.UpdatePoste(this.editData.id, { ...this.posteForm.value, userModif}).subscribe(()=>{
      console.log(this.posteForm.value);
      this.posteForm.reset();
        this.dialogRef.close('modifier');
        this.notificationService.success('Poste modified successfully !');
    });
  }
  }
  getUtilisateurs(): void {
    this.service.GetUtilisateurs().subscribe(utilisateurs => {
      this.utilisateurs = utilisateurs;
      this.filteredUsers = utilisateurs;
    });
  }

  getSites(): void {
    this.service.GetSites().subscribe(sites => {
      this.sites = sites;
    });
  }
  
  close() {
    this.dialogRef.close();
  }

  cancel() {
    this.close();
  }



}
