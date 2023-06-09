import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'app/models/shared/departement.model';
import { Site } from 'app/models/shared/site.model';
import { ApiService } from 'app/services/shared/api.service';
import { NotificationService } from 'app/services/shared/notification.service';
import { DialogDepartementComponent } from './dialog-departement/dialog-departement.component';
import swal from 'sweetalert2';
import { data } from 'jquery';
import { Utilisateur } from 'app/models/shared/utilisateur.model';
import { UserStoreService } from 'app/services/shared/user-store.service';
import { AuthenticationService } from 'app/services/shared/authentication.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {

  constructor(private service: ApiService, 
              private route: ActivatedRoute, 
              private router: Router, 
              public dialog: MatDialog, 
              private notificationService: NotificationService,
              private userStore: UserStoreService,
              private authenticationService: AuthenticationService){}

  ListeDepartement!: Departement[];
  departement: Departement = new Departement();
  Site: Site[];
  sites!: Site[];
  utilisateurs!: Utilisateur[];
  formTitle: string = '';
  buttonLabel: string = '';
  lengthDeps: number;
  isLoading: boolean;
  displayedColumns: string[] = ['nom', 'chefD', 'siteId', 'action'];
  dataSource!: MatTableDataSource<Departement>;
  nom='';
  chefD='';
  siteId=0;
  selectedSite: Site;
  selectedUser: Utilisateur;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  role!: string;


  ngOnInit() : void{
    this.getDepartements();
    this.getUtilisateurs();
    this.getSites();
    const depSearch = JSON.parse(sessionStorage.getItem('depSearch'));
      if (depSearch !== null) {
        this.nom = depSearch.nom;
        this.chefD = depSearch.chefD;
        this.siteId = depSearch.siteId;
      }
      this.userStore.getRoleFromStore().subscribe(val => {
        const roleFromToken = this.authenticationService.getRoleFromToken();
        this.role = val || roleFromToken;
        if (this.role !== 'RH' && this.role !== 'Gestionnaire') {
          const actionIndex = this.displayedColumns.indexOf('action');
          if (actionIndex !== -1) {
            this.displayedColumns.splice(actionIndex, 1);
          }
        }
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogDepartementComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === "ajouter"){
        this.getDepartements();
      }
    });
  }

  getDepartements(){
    this.service.GetDepartements().subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{

      }
    })
  }

  deleteDepartement(id: number): void {
    swal.fire({
      text: `Are you sure to delete this Department ?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        this.service.DeleteDepartement(id)
          .subscribe(()=>
            {
              this.getDepartements();
              this.notificationService.success('Department deleted successfully');
            },
            () => {
              this.notificationService.danger('Delete Department failed');
            }
          );
      }
    });
  }

  getSites(): void {
    this.service.GetSites().subscribe(sites => {
      this.sites = sites;
    });
  }

  getSiteNom(id: number): string {
    const site = this.sites.find(s => s.id === id);
    return site ? site.site : '';
  }

  getUtilisateurs(): void {
    this.service.GetUtilisateurs().subscribe(utilisateurs => {
      this.utilisateurs = utilisateurs;
    });
  }

  getUtilisateurNom(id: number): string {
    const utilisateur = this.utilisateurs.find(s => s.id === id);
    return utilisateur ? (utilisateur.nom + ' ' + utilisateur.prenom) : '';
  }

  onSortData(sort) {
    this.service.siteRequest.next(sort);
  }
  updateDepartement(row: any) {
    this.dialog.open(DialogDepartementComponent, {
      data: row,
    }).afterClosed().subscribe(result=>{
      if(result === "modifier"){
        this.getDepartements();
      }
    })
    }

    onClickingEnter(event) {
      if (event.key === 'Enter') {
        this.onSearchClick();
      }
    }
  
onSearchClick() {
  const filterNom = document.getElementById('nom') as HTMLInputElement;

  const filterNomValue = filterNom.value.trim().toLowerCase();
  const filterUserValue = this.selectedUser ? (this.selectedUser.nom + ' ' + this.selectedUser.prenom).toLowerCase() : '';
  const filterSiteValue = this.selectedSite ? this.selectedSite.site.toString().toLowerCase() : '';

  if (filterNomValue !== '') {
    this.dataSource.filterPredicate = (data: Departement, filter: string) =>
      data.nom.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    this.dataSource.filter = filterNomValue;
  } else if (filterUserValue !== '') {
    this.dataSource.filterPredicate = (data: Departement, filter: string) =>
      this.getUtilisateurNom(data.chefD).toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    this.dataSource.filter = filterUserValue;
  } else if (filterSiteValue !== '') {
    this.dataSource.filterPredicate = (data: Departement, filter: string) =>
      this.getSiteNom(data.siteId).toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    this.dataSource.filter = filterSiteValue;
  }
  
}

  
    onResetAllFilters() {
      this.departement.nom = ''; // réinitialisation des filtres
      this.selectedUser= null; 
      this.selectedSite = null; 
      this.getDepartements();
      this.onSearchClick(); // lancement d'une nouvelle recherche
    }
  
}
