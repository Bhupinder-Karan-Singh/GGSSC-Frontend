import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import 'jspdf-autotable';
import { EventServiceService } from 'src/app/services/event-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { AlertController } from '@ionic/angular';
import { CandidateServiceService } from 'src/app/services/candidate-service.service';
import { AppComponent } from 'src/app/app.component';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent  implements OnInit {

  // displayedColumns: string[] = ['roll_number', 'name', 'dob', 'age', 'fname', 'mname', 'email', 'phoneNumber','Category','Comments', 'File','Action'];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['File', 'Details'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  candidates:any
  loading:any = false

  title:any
  error:any = false

  paramsId:any;
  currentSortField: 'name' | 'age' | null = null;
  currentDirection: 'asc' | 'desc' = 'asc';

  constructor(
    public eventService: EventServiceService,
    private route:ActivatedRoute,
    private router: Router,
    private appService: AppServiceService,
    private candidateService: CandidateServiceService,
    private alertController: AlertController,
    private appComponent: AppComponent,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // this.loadCandidates()
  }

  ionViewWillEnter(): void {
    this.loadCandidates()
  }

  loadCandidates(){
    this.title = this.eventService.eventName
    this.route.params.subscribe((params)=>{
      if(params['_id']){
        this.loading = true
        this.appService.loading = "Loading";
        this.candidateService.getCandidatesList(params['_id']).subscribe((response:any)=>{
          if(response.length>0){
            this.loading = false
            this.appService.loading = false;
            this.candidates = response.reverse()
            this.dataSource.data = response.reverse();
            this.prepareData(this.dataSource.data);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },100);
            this.error = false
          }else{
            this.loading = false
            this.appService.loading = false;
            this.appService.presentToast('top',"No Candidate registered")
          }
        },(error) => {
          this.error = true
          this.appService.loading = false
          const errorMessage = "Internal Server Error : "+error.statusText;
          this.appService.presentToast('top',errorMessage)
        })
      }else{
        this.router.navigate(['/edit-events']);
      }
    })
  }

  exportToExcel() {
    const truncatedCandidates = this.candidates.map((candidate: any) => ({
      Category: candidate.category === 'Winner Age Group 1' ?  '🏅 Winner' : 
          candidate.category === 'Winner Age Group 2' ? '🏅 Winner' : 
          candidate.category === 'Runner up' ? '⭐ Runner up' : 
          '',
      rollNumber: candidate.rollNumber,
      name: candidate.name,
      dateOfBirth: candidate.dateOfBirth,
      age: candidate.age,
      fatherName: candidate.fatherName,
      motherName: candidate.motherName,
      email: candidate.email,
      phoneNumber: candidate.phoneNumber,
      category: candidate.category,
      comments: candidate.comments
      // images: candidate.images?.length > 100 ? candidate.images.substring(0, 100) + "..." : candidate.images, // Optionally truncate long URLs
    }));
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(truncatedCandidates);
  
    // Set column widths dynamically based on the maximum content length
    const colWidths = this.candidates.reduce((acc: any, candidate: any) => {
      Object.keys(candidate).forEach((key) => {
        const valueLength = String(candidate[key]).length;
        if (!acc[key] || acc[key] < valueLength) {
          acc[key] = valueLength;
        }
      });
      return acc;
    }, {});
  
    // Adjust column widths in the Excel sheet
    worksheet['!cols'] = Object.keys(colWidths).map((key) => ({
      wch: colWidths[key], // 'wch' specifies the column width (in characters)
    }));
  
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const fileName = 'Candidates_List.xlsx';
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, fileName);
  }
  
  printTable() {
    const tableContainer = document.getElementById('table-container-2');
    if (!tableContainer) return;

    const printContent = tableContainer.innerHTML;
    const totalEntries = this.dataSource?.data?.length || 0; 

    // Create hidden iframe for printing
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    // Write HTML + styles
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            table, th, td { border: 1px solid #ddd; }
            th, td { padding: 8px; text-align: left; word-wrap: break-word; }
            .image { text-align: center !important; }
            img { max-width: 200px; max-height: 200px; object-fit: cover; border-radius: 0.2em; }
            .action-column, .mat-sort-header-arrow, .pagination { display: none !important; }

            /* Highlight categories */
            .blinking-ageGroup-1 { background-color: #ffdc73; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .blinking-ageGroup-2 { background-color: #ffdc73; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .blinking-runnerup { background-color: #b5e2ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            h2 { text-align: center; }
            h3 { text-align: center; }
          </style>
        </head>
        <body>
          <h2>${this.eventService.eventName}</h2>
          <h3>Total Candidates: ${totalEntries}</h3>
          <div>${printContent}</div>
        </body>
      </html>
    `);
    doc.close();

    const images = doc.images;
    let loaded = 0;

    if (images.length === 0) {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      document.body.removeChild(iframe);
      return;
    }

    // Wait for all images to load before printing
    for (let i = 0; i < images.length; i++) {
      images[i].onload = images[i].onerror = () => {
        loaded++;
        if (loaded === images.length) {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          setTimeout(() => document.body.removeChild(iframe), 500);
        }
      };
    }
  }
  
  formatDateForDatePicker(date: string | Date | null): string {
    if (!date) return ''; // Handle null or undefined case
    return new Date(date).toISOString().split('T')[0]; // Ensure 'YYYY-MM-DD' format
  }

  // Prepare data to format dates properly before rendering (call this after fetching data)
  prepareData(elements: any[]) {
    elements.forEach(element => {
      element.dateOfBirth = this.formatDateForDatePicker(element.dateOfBirth);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Reset pagination to the first page after filter
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goBack(){
    this.router.navigate(['/edit-events']);
  }

  async removeCandidate(element:any){
    this.route.params.subscribe((params)=>{
      if(params['_id']){
        this.paramsId = params['_id']
      }
    })
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'The candidate will be removed from the event !!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Remove',
          handler: () => {
            console.log('Delete clicked');    
            this.loading = true
            this.appComponent.isLoading = true
            this.appService.loading = "Loading";
            this.candidateService.removeCandidate(element._id,this.paramsId).subscribe((response:any)=>{
              this.loading = false
              this.appService.loading = false;
              const index = this.candidates.findIndex((item:any) => item._id === element._id);
                if (index !== -1) {
                  this.candidates.splice(index, 1);
                }
                this.appService.presentToast('top',response)
            },(error: { statusText: string; }) => {
              this.appService.loading = false
              const errorMessage = "Internal Server Error : "+error.statusText;
              this.appService.presentToast('top',errorMessage)
            })
          },
        },
      ],
    });
    await alert.present();
  }

  openPopup(element:any,eventHistory: any[]): void {
    const formattedMessage = eventHistory
      .map((event, index) => 
        `${index + 1}. Event : ${event.eventName}, Age: ${event.age}, Year: ${event.eventRegistrationYear}`
      )
      .join('\n');

    this.dialog.open(DialogBoxComponent, {
      data: { 
        title: +element.rollNumber +" : "+ element.name ,
        message: formattedMessage 
      },
    });
  }

  sortBy(field: 'name' | 'age') {
    // If clicking same field → toggle direction
    if (this.currentSortField === field) {
      this.currentDirection =
        this.currentDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // New field → reset to ascending
      this.currentSortField = field;
      this.currentDirection = 'asc';
    }

    // Custom sorting accessor
    this.dataSource.sortingDataAccessor = (item, property) => {
      return field === 'age'
        ? Number(item.age)
        : item.name?.toLowerCase();
    };

    this.sort.active = 'Details';
    this.sort.direction = this.currentDirection;

    this.sort.sortChange.emit({
      active: 'Details',
      direction: this.currentDirection
    });
  }
}
