import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Evenement } from 'app/models/shared/evenement.model';
import { NotificationService } from 'app/services/shared';
import { EvenementService } from 'app/services/shared/evenement.service';

@Component({
  selector: 'app-dialog-event',
  templateUrl: './dialog-event.component.html',
  styleUrls: ['./dialog-event.component.scss']
})
export class DialogEventComponent implements OnInit {

  eventForm!: FormGroup;
  listeEvents!: Evenement[];
  employe: Evenement = new Evenement();
  private jwtHelper = new JwtHelperService();
  public matricule: string = '';
  ActionBtn: string = "Ajouter";

  constructor(private builder: FormBuilder, 
    private service: EvenementService, 
    private dialogRef: MatDialogRef<DialogEventComponent>, 
    @Inject(MAT_DIALOG_DATA) public editData: Evenement,
    private notificationService: NotificationService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventForm = this.builder.group({
      dateEvent : ['', Validators.required],
      description : ['', Validators.required],
      titre : ['', Validators.required],
      userAjout: [''],
    });

    if(this.editData){
      this.ActionBtn = "Modifier";
      // this.departementForm.patchValue(this.editData);
      this.eventForm.setValue({
        dateEvent: this.editData.dateEvent,
        description: this.editData.description,
        titre: this.editData.titre,
        userAjout : this.editData.userAjout
      });
    }

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.matricule = decodedToken.family_name;
    }
  }

  AjouterEvenement(){
    if(!this.editData){
      if(this.eventForm.valid){
        this.eventForm.value.userAjout = this.matricule;
        const userAjout = this.eventForm.value.userAjout;
        this.service.AddEvenement({ ...this.eventForm.value, userAjout }).subscribe(()=>{
          this.eventForm.reset();
          this.dialogRef.close('ajouter');
          this.notificationService.success('Event added successfully !');
        },
        ()=>{
          this.notificationService.danger('Error when adding an Event.');
        })
      }
    } else {
      this.updateEvenement();
    }
  }

  updateEvenement(){
    this.service.UpdateEvenement(this.editData.id, { ...this.eventForm.value }).subscribe(()=>{
      this.eventForm.reset();
      this.dialogRef.close('modifier');
      this.notificationService.success('Event modified successfully !');
    },
    ()=>{
      this.notificationService.danger('Error when modifying an Event.');
    });
  }

  close() {
    this.dialogRef.close();
  }

  cancel() {
    this.close();
  }
}
