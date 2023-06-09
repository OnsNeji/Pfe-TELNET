import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Departement } from 'app/models/shared/departement.model';
import { ProjectSuccess } from 'app/models/shared/projectSuccess.model';
import { NotificationService } from 'app/services/shared';
import { ApiService } from 'app/services/shared/api.service';
import { ProjectSuccessService } from 'app/services/shared/project-success.service';

@Component({
  selector: 'app-dialog-project-success',
  templateUrl: './dialog-project-success.component.html',
  styleUrls: ['./dialog-project-success.component.scss']
})
export class DialogProjectSuccessComponent implements OnInit {

  projectSuccessForm!: FormGroup;
  departements: Departement[];
  ProjectSuccesses!: ProjectSuccess[];
  projectSuccess: ProjectSuccess = new ProjectSuccess();
  private jwtHelper = new JwtHelperService();
  public matricule: string = '';
  ActionBtn: string = "Ajouter";
  imageUrl: string;

  constructor(private builder: FormBuilder, 
    private service: ProjectSuccessService, 
    private depService: ApiService,
    private dialogRef: MatDialogRef<DialogProjectSuccessComponent>, 
    @Inject(MAT_DIALOG_DATA) public editData: ProjectSuccess,
    private notificationService: NotificationService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectSuccessForm = this.builder.group({
      titre : ['', Validators.required],
      description : ['', Validators.required],
      departementId : [''],
      pieceJointe: [''],
      userAjout: [''],
    });

    this.getDepartements();

    if(this.editData){
      this.ActionBtn = "Modifier";
      // this.departementForm.patchValue(this.editData);
      this.projectSuccessForm.patchValue(this.editData);
    }

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.matricule = decodedToken.family_name;
    }
  }

  AjouterProjectSuccess() {
    if (!this.editData) {
      this.projectSuccessForm.value.pieceJointe = this.imageUrl;
     
      if (this.projectSuccessForm.valid) {
        console.log(this.projectSuccessForm.value)
        this.projectSuccessForm.value.userAjout = this.matricule;
        const userAjout = this.projectSuccessForm.value.userAjout;
        this.service.AddProjectSuccess({ ...this.projectSuccessForm.value, userAjout }).subscribe(() => {
          this.projectSuccessForm.reset();
          this.dialogRef.close('ajouter');
          this.notificationService.success('Project Success added successfully !');
        },
          () => {
            this.notificationService.danger('Error when adding a Project Success.');
          })
      }
    } else {
      this.updateProjectSuccess();
    }
  }

  updateProjectSuccess() {
    if (!this.imageUrl) {
      this.projectSuccessForm.value.pieceJointe = this.editData.pieceJointe;
    } else {
      this.projectSuccessForm.value.pieceJointe = this.imageUrl;
    }
    if (this.projectSuccessForm.valid) {
    this.service.UpdateProjectSuccess(this.editData.id, { ...this.projectSuccessForm.value }).subscribe(() => {
      this.projectSuccessForm.reset();
      this.dialogRef.close('modifier');
      this.notificationService.success('Project Success modified successfully !');
    },
      () => {
        this.notificationService.danger('Error when modifying a Project Success.');
      });
    }
  }

  getDepartements(): void {
    this.depService.GetDepartements().subscribe(departements => {
      this.departements = departements;
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

  }

  close() {
    this.dialogRef.close();
  }

  cancel() {
    this.close();
  }

}
