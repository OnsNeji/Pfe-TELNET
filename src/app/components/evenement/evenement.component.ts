import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from 'app/models/shared/evenement.model';
import { MediaEvent } from 'app/models/shared/mediaEvent.model';
import { NotificationService, DateTimeService, AuthenticationService } from 'app/services/shared';
import { EvenementService } from 'app/services/shared/evenement.service';
import swal from 'sweetalert2';
import { DialogDescriptionComponent } from './dialog-description/dialog-description.component';
import { DialogEventComponent } from './dialog-event/dialog-event.component';
import { UserStoreService } from 'app/services/shared/user-store.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent implements OnInit {

  constructor(private service: EvenementService, 
              private route: ActivatedRoute, 
              private router: Router, 
              public dialog: MatDialog, 
              private notificationService: NotificationService,
              private dateTimeService: DateTimeService,
              private userStore: UserStoreService,
              private authenticationService: AuthenticationService){}

  ListeEvents!: Evenement[];
  evenement: Evenement = new Evenement();
  mediaEvent : MediaEvent = new MediaEvent();
  displayedColumns: string[] = ['titre', 'description', 'dateEvent', 'mediaEvents', 'lien', 'action'];
  dataSource!: MatTableDataSource<Evenement>;
  lengthEvents: number;
  isLoading: boolean;
  date= new Date();
  role!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.getEvenements();
    this.onResetAllFilters();
    
this.userStore.getRoleFromStore().subscribe(val => {
  const roleFromToken = this.authenticationService.getRoleFromToken();
  this.role = val || roleFromToken;
  if (this.role !== 'Administrateur' && this.role !== 'Gestionnaire') {
    const actionIndex = this.displayedColumns.indexOf('action');
    if (actionIndex !== -1) {
      this.displayedColumns.splice(actionIndex, 1);
    }
  }
});
  }


  extractDomain(url: string): string {
    let domain = '';
    if (url) {
      const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+(?:\.[^:\/\n]+)?)\.(com|fr|tn)/i;
      const match = url.match(regex);
      if (match && match.length >= 3) {
        domain = match[1] + '.' + match[2];
      }
    }
    return domain;
  }
  
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogEventComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === "ajouter"){
        this.getEvenements();
      }
    });
  }

  openDescriptionDialog(evenement: any): void {
    const dialogRef = this.dialog.open(DialogDescriptionComponent, {
      width: '500px',
      data: { description: evenement.description },
    });
  }
  
  getEvenements(){
    this.service.GetEvenements().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{

      }
    })
  }

  deleteEvenement(id: number): void {
    swal.fire({
      text: `Are you sure to delete this Event ?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        this.service.DeleteEvenement(id)
          .subscribe(()=>
            {
              this.getEvenements();
              this.notificationService.success('Event deleted successfully');
            },
            () => {
              this.notificationService.danger('Delete Event failed');
            }
          );
      }
    });
  }

  onSortData(sort) {
    this.service.eventRequest.next(sort);
  }

  updateEvenement(row: any) {
    this.dialog.open(DialogEventComponent, {
      data: row,
      width: '1000px',
    }).afterClosed().subscribe(result=>{
      if(result === "modifier"){
        this.getEvenements();
      }
    })
    }

    dateOnly(event): boolean {
      return this.dateTimeService.dateOnly(event);
    }

    onClickingEnter(event) {
      if (event.key === 'Enter') {
        this.onSearchClick();
      }
    }

    onSearchClick() {
      const filterDate = document.getElementById('date') as HTMLInputElement;
      const filterDesc = document.getElementById('description') as HTMLInputElement;
      const filterTitre = document.getElementById('titre') as HTMLInputElement;
  
      const filterTitreValue = filterTitre.value.trim().toLowerCase();
      const filterDescValue = filterDesc.value.trim().toLowerCase();
      const filterDateValue = filterDate.value.trim().toLowerCase();
  
      if (filterTitreValue !== '') {
        this.dataSource.filterPredicate = (data: Evenement, filter: string) =>
        data.titre.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      this.dataSource.filter = filterTitreValue;
      }else if (filterDescValue !== '') {
        this.dataSource.filterPredicate = (data: Evenement, filter: string) =>
        data.description.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      this.dataSource.filter = filterDescValue;
      }else if (filterDateValue !== '') {
        this.dataSource.filterPredicate = (data: Evenement, filter: string) => {
          const formattedDate = new Date(data.dateEvent).toLocaleDateString(); // format the date as a string
          return formattedDate.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        };
      this.dataSource.filter = filterDateValue;
      }
    }

    onResetAllFilters() {
      this.evenement.description = ''; // réinitialisation des filtres
      this.evenement.titre = ''; 
      this.evenement.dateEvent = null; 
      this.getEvenements();
      this.onSearchClick(); // lancement d'une nouvelle recherche
    }
}
