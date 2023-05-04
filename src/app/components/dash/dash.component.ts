import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Convention } from 'app/models/shared/convention.model';
import { EmployéMois } from 'app/models/shared/employeMois.model';
import { ProjectSuccess } from 'app/models/shared/projectSuccess.model';
import { Utilisateur } from 'app/models/shared/utilisateur.model';
import { ApiService } from 'app/services/shared/api.service';
import { ConventionService } from 'app/services/shared/convention.service';
import { DemandeService } from 'app/services/shared/demande.service';
import { EmployeMoisService } from 'app/services/shared/employe-mois.service';
import { EvenementService } from 'app/services/shared/evenement.service';
import { NouveautéService } from 'app/services/shared/nouveauté.service';
import { ProjectSuccessService } from 'app/services/shared/project-success.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit,AfterViewInit {

  totalDemandes: number;
  projectSuccesses: ProjectSuccess[] = [];
  projectSuccess: ProjectSuccess;
  latestEmployee: EmployéMois;
  utilisateurs!: Utilisateur[];
  latestUtilisateurs!: Utilisateur[];

  barChartData = [{ 
    data: [], 
    label: 'Nombre de conventions ( / Mois)',
    backgroundColor: ['gray', '#a5d6a7', '#87cefa', '#3f629d','rgba(255, 255, 255, 0.5)', 'gray', '#4682b4', '#f8f8ff', '#778899', '#b0c4de','#f0ffff', '#f5f5f5'], // set different colors for each bar in the chart
    borderWidth: 1 // set border width for the bars }];
  }];
  barChartLabels: string[] = [];

  HbarChartData = [{ 
    data: [], 
    label: 'Durée restante de la convention ( / jours)',
    backgroundColor: ['gray', '#ffa500', '#a5d6a7',  '#87cefa', '#e6e6fa', '#4682b4', '#f8f8ff', '#778899', '#b0c4de','#f0ffff', '#f5f5f5'], // set different colors for each bar in the chart
    borderWidth: 1 // set border width for the bars }];
  }];
  HbarChartLabels: string[] = [];

  doughnutChartData = [{   data: [], 
    backgroundColor: ['#a5d6a7', 'yellow', '#FF2E2E', ],
    label: 'Status',
  }];
  doughnutChartLabels: string[] = [];

  lineChartData = [{   data: [], 
    borderColor: '#3f629d',
    backgroundColor: '#3f629d',
    tension: 0.5,
    fill: false,
    label: 'Demandes par documents',
  }];
  lineChartLabels: string[] = [];

  roleChartData = [{   data: [], 
    backgroundColor: ['#a5d6a7', 'yellow', '#ffa500', '#d5d6d2' ],
    label: 'Utilisateur par departement',
  }];
  roleChartLabels: string[] = [];

  userBarChartData = [
    { 
      data: [], 
      label: 'Utilisateurs',
      borderColor: '#3f629d',
      backgroundColor: '#3f629d',
      fill: false,
      tension: 0.5, // set different colors for each bar in the chart

    },

    { 
      data: [], 
      label: 'Mariés',
      borderColor: 'yellow',
      backgroundColor: 'yellow',
      fill: false,
      tension: 0.5, // set different colors for each bar in the chart

    },
    { 
      data: [], 
      label: 'Parents',
      borderColor: 'red',
      backgroundColor: 'red',
      fill: false,
      tension: 0.5, // set different colors for each bar in the chart

    },
    { 
      data: [], 
      label: 'Célibataires',
      borderColor: 'green',
      backgroundColor: 'green',
      fill: false,
      tension: 0.5, // set different colors for each bar in the chart

    },
  ];
  userBarChartLabels: string[] = [];

  ENLineChartData = [
    { 
      data: [], 
      label: 'Evenement',
      backgroundColor: '#1f77b4',
      borderColor: '#1f77b4',
      fill: false,
      tension: 0.5,
    },
    { 
      data: [], 
      label: 'Nouveauté',
      backgroundColor:'#FF2E2E',
      borderColor: '#FF2E2E',
      fill: false,
      tension: 0.5,
    }
  ];
  ENLineChartLabels: string[] =  [];

  constructor(private conventionService: ConventionService,
              private demandeService: DemandeService,
              private userService: ApiService,
              private evenementService: EvenementService,
              private nouveautéService: NouveautéService,
              private projectSuccessService: ProjectSuccessService,
              private employeMoisService: EmployeMoisService, ) { }

  @ViewChild('chart') private chartRef!: ElementRef;
  private chart: any;
  @ViewChild('Hchart') private HchartRef!: ElementRef;
  private Hchart: any;
  @ViewChild('doughnutChart') private doughnutChartRef!: ElementRef;
  private doughnutChart: any;
  @ViewChild('lineChart') private lineChartRef!: ElementRef;
  private lineChart: any;
  @ViewChild('roleChart') private roleChartRef!: ElementRef;
  private roleChart: any;
  @ViewChild('userChart') private userChartRef!: ElementRef;
  private userChart: any;
  @ViewChild('ENChart') private ENChartRef!: ElementRef;
  private ENChart: any;

  ngOnInit(): void {
    this.getProjectSuccesses();
    this.getEmployéMois();
    this.getUtilisateurs();
    this.getLatestUtilisateurs();
    this.conventionService.getMonthlyStatistics().subscribe(data => {
      const sortedData = data.sort((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        } else {
          const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        }
      });
      
      const countData = sortedData.map(c => c.count);
      const monthLabels = sortedData.map(c => c.month + ' ' + c.year);

      this.barChartData[0].data.push(...countData);
      this.barChartLabels.push(...monthLabels);

      if (this.chart) {
        this.chart.update();
      }
    });
    this.conventionService.getConventionDurationLeft().subscribe(data => {
      const durationsData = data.map(x => x.daysLeft);
      const conventionLabels = data.map(x => x.titre);
      console.log(durationsData)
    
      this.HbarChartData[0].data.push(...durationsData);
      this.HbarChartLabels.push(...conventionLabels);
    
      if (this.Hchart) {
        this.Hchart.update();
      }
    });

    this.demandeService.getTotalDemandes().subscribe(total => {
      this.totalDemandes = total;
    });
    this.demandeService.getDemandesStatus().subscribe(data => {
      const countData = data.map(c => c.count);
      const statusLabels = data.map(c => c.status);

      this.doughnutChartData[0].data.push(...countData);
      this.doughnutChartLabels.push(...statusLabels);

      if (this.doughnutChart) {
          this.doughnutChart.update();
      }
    });

    this.demandeService.getDemandesByTitre().subscribe(data => {
      const countData = data.map(d => d.count);
      const titreLabels = data.map(d => d.titre);

      this.lineChartData[0].data.push(...countData);
      this.lineChartLabels.push(...titreLabels);

      if (this.lineChart) {
        this.lineChart.update();
      }
    });

    this.userService.getUtilisateurByDepartement().subscribe(data => {
      const countData = data.map(c => c.count);
      const roleLabels = data.map(c => c.nom);

      this.roleChartData[0].data.push(...countData);
      this.roleChartLabels.push(...roleLabels);

      if (this.roleChart) {
          this.roleChart.update();
      }
    });

    // this.userService.getMonthlyUsers().subscribe(data => {
    //   const sortedData = data.sort((a, b) => {
    //     if (a.year !== b.year) {
    //       return a.year - b.year;
    //     } else {
    //       const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //       return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    //     }
    //   });
      
    //   const countData = sortedData.map(c => c.count);
    //   const monthLabels = sortedData.map(c => c.month + ' ' + c.year);

    //   this.userBarChartData[0].data.push(...countData);
    //   this.userBarChartLabels.push(...monthLabels);

    //   if (this.userChart) {
    //     this.userChart.update();
    //   }
    // });  
    this.evenementService.getStats().subscribe(data => {
      const sortedData = data.sort((a, b) => {
        const aMonthYear = a.monthYear.split(' ');
        const bMonthYear = b.monthYear.split(' ');
        const aYear = parseInt(aMonthYear[1]);
        const bYear = parseInt(bMonthYear[1]);
        if (aYear !== bYear) {
          return aYear - bYear;
        } else {
          const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          const aMonthIndex = monthOrder.indexOf(aMonthYear[0]);
          const bMonthIndex = monthOrder.indexOf(bMonthYear[0]);
          return aMonthIndex - bMonthIndex;
        }
      });

      const countEventData = sortedData.map(c => c.countEvent);
      const countNouvData = sortedData.map(c => c.countNouv);
      const monthYearLabels = sortedData.map(c => c.monthYear);

      this.ENLineChartData[0].data.push(...countEventData);
      this.ENLineChartData[1].data.push(...countNouvData);
      this.ENLineChartLabels.push(...monthYearLabels);

      if (this.ENChart) {
        this.ENChart.update();
      }
    });

    this.userService.getStats().subscribe(data => {
      const sortedData = data.sort((a, b) => {
        const aMonthYear = a.monthYear.split(' ');
        const bMonthYear = b.monthYear.split(' ');
        const aYear = parseInt(aMonthYear[1]);
        const bYear = parseInt(bMonthYear[1]);
        if (aYear !== bYear) {
          return aYear - bYear;
        } else {
          const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          const aMonthIndex = monthOrder.indexOf(aMonthYear[0]);
          const bMonthIndex = monthOrder.indexOf(bMonthYear[0]);
          return aMonthIndex - bMonthIndex;
        }
      });

      const countUsersData = sortedData.map(c => c.countUsers);
      const countMariéesData = sortedData.map(c => c.countMariées);
      const countParentsData = sortedData.map(c => c.countParents);
      const countCélibatairesData = sortedData.map(c => c.countCélibataires);
      const monthYearLabels = sortedData.map(c => c.monthYear);

      this.userBarChartData[0].data.push(...countUsersData);
      this.userBarChartData[1].data.push(...countMariéesData);
      this.userBarChartData[2].data.push(...countParentsData);
      this.userBarChartData[3].data.push(...countCélibatairesData);
      this.userBarChartLabels.push(...monthYearLabels);

      if (this.userChart) {
        this.userChart.update();
      }
    });
  }

  ngAfterViewInit() {
    const chartConfig: any = {
      type: 'bar',
      data: {
        labels: this.barChartLabels,
        datasets: this.barChartData,
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{ ticks: { 
            beginAtZero: true, } }],
          xAxes: [{ barThickness: 5 }],
        },
      },
      legend: {
        display: true,
      },
    };

    const HchartConfig: any = {
      type: 'bar',
      data: {
        labels: this.HbarChartLabels,
        datasets: this.HbarChartData,
      },
      options: {
        indexAxis:'y',
        responsive: true,
        scales: {
          yAxes: [{ ticks: { beginAtZero: true } }],
          xAxes: [{ barThickness: 5 }],
        },
      },
      legend: {
        display: true,
      },
    };

    const doughnutChartConfig: any = {
      type: 'doughnut',
      data: {
          labels: this.doughnutChartLabels,
          datasets: this.doughnutChartData,
      },
      options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
      },
      legend: {
          display: true,
      },
    };

    const lineChartConfig: any = {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: this.lineChartData,
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{ ticks: { 
            beginAtZero: true, } }],
        },
      },
      legend: {
        display: true,
      },
    };

    const roleChartConfig: any = {
      type: 'polarArea',
      data: {
          labels: this.roleChartLabels,
          datasets: this.roleChartData,
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      }
    };

    const userChartConfig: any = {
      type: 'line',
      data: {
        labels: this.userBarChartLabels,
        datasets: this.userBarChartData,
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{ ticks: { 
            beginAtZero: true, } }],
        },
      },
      legend: {
        display: true,
      },
    };

    const ENLineChartConfig: any = {
      type: 'line',
      data: {
        labels: this.ENLineChartLabels,
        datasets: this.ENLineChartData,
      },
      options: {
        responsive: true,
      },
      legend: {
        display: true,
      },
    };
      
    this.ENChart = new Chart(this.ENChartRef.nativeElement, ENLineChartConfig);
    this.userChart = new Chart(this.userChartRef.nativeElement, userChartConfig);
    this.roleChart = new Chart(this.roleChartRef.nativeElement, roleChartConfig);
    this.lineChart = new Chart(this.lineChartRef.nativeElement, lineChartConfig);
    this.doughnutChart = new Chart(this.doughnutChartRef.nativeElement, doughnutChartConfig);
    this.Hchart = new Chart(this.HchartRef.nativeElement, HchartConfig);
    this.chart = new Chart(this.chartRef.nativeElement, chartConfig);
  }

  getProjectSuccesses(){
    this.projectSuccessService.GetProjectSuccesses().subscribe(
      (data: ProjectSuccess[]) => {
        if (data.length > 0) {
          this.projectSuccess = data[data.length - 1];
          console.log(this.projectSuccess);
        }
      },
      error => console.log(error)
    );
  }

  getLatestUtilisateurs(): void{
    this.userService.getLatestUtilisateurs().subscribe(utilisateurs => {
      this.latestUtilisateurs = utilisateurs;
      this.latestUtilisateurs.sort((a, b) => new Date(b.dateEmbauche).getTime() - new Date(a.dateEmbauche).getTime());
    })
  }

  getEmployéMois(){
    this.employeMoisService.GetEmployesMois().subscribe(
      (data: EmployéMois[]) => {
        if (data.length > 0) {
          this.latestEmployee = data[data.length - 1];
          console.log(data);
        }
      },
      error => console.log(error)
    );
  }
  getUtilisateurs(): void {
    this.userService.GetUtilisateurs().subscribe(utilisateurs => {
      this.utilisateurs = utilisateurs;
    });
  }
  getUtilisateurNom(id: number): string {
    const utilisateur = this.utilisateurs.find(s => s.id === id);
    return utilisateur ? (utilisateur.nom + ' ' + utilisateur.prenom) : '';
  }

}
