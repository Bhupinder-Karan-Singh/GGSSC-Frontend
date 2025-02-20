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

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent  implements OnInit {

    displayedColumns: string[] = ['roll_number', 'name', 'dob', 'age', 'fname', 'mname', 'email', 'phoneNumber', 'File'];
    dataSource = new MatTableDataSource<any>([]);
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    candidates:any
    loading:any = false
  
    title:any
    error:any = false

  constructor(
    public eventService: EventServiceService,
    private route:ActivatedRoute,
    private router: Router,
    private appService: AppServiceService,
    private candidateService: CandidateServiceService
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
        console.log(params['_id'])
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
      rollNumber: candidate.rollNumber,
      name: candidate.name,
      dateOfBirth: candidate.dateOfBirth,
      age: candidate.age,
      fatherName: candidate.fatherName,
      motherName: candidate.motherName,
      email: candidate.email,
      phoneNumber: candidate.phoneNumber,
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
    const printContent = document.getElementById('table-container')?.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow?.document.write('<html><head><title>Print Table</title>');
    
    // Adding the print styles to the new window's document
    printWindow?.document.write(`
      <style>
        @media print {
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          #table-container { width: 100%; overflow: hidden; }
          table { width: 100%; border-collapse: collapse; }
          table, th, td { border: 1px solid #ddd; }
          th, td { padding: 8px; text-align: left; word-wrap: break-word; }
          img { max-width: 100px; max-height: 100px; object-fit: contain; }
          h1 { text-align: center; }
          .action-column {display: none;}
          .mat-sort-header-arrow {display: none;}
          .pagination {display: none;}
        }
      </style>
    `);
    
    printWindow?.document.write('</head><body>');
    printWindow?.document.write('<h1>Candidate List</h1>');  // Optional header
    printWindow?.document.write('<div>' + printContent + '</div>');
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
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

}
