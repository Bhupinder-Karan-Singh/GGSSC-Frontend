import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AppServiceService } from 'src/app/services/app-service.service';
import { CandidateServiceService } from 'src/app/services/candidate-service.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.scss'],
})
export class EditCandidateComponent implements OnInit {
  displayedColumns: string[] = ['roll_number', 'name', 'dob', 'fname', 'mname', 'email', 'phoneNumber', 'File', 'Action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  candidates:any
  loading:any = false

  title = "Candidates List";

  constructor(
    private candidateService: CandidateServiceService,
    private appComponent: AppComponent,
    private router: Router,
    private appService: AppServiceService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadCandidates();
  }

  ionViewWillEnter(): void {
    this.loadCandidates();
  }

  loadCandidates() {
    this.appService.loading = "Loading";
    this.loading = true
    this.candidateService.getAllCandidates().subscribe(
      (response: any) => {
        this.appService.loading = false;
        this.loading = false
        if (response.length > 0) {
          this.candidates = response.reverse()
          this.dataSource.data = response.reverse();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (error) => {
        this.appService.loading = false;
        this.loading = false
        const errorMessage = "Internal Server Error : " + error.statusText;
        this.appService.presentToast('top', errorMessage);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Reset pagination to the first page after filter
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editEvent(element: any, j: number) {
    console.log('Edit:', element);
  }

  deleteEvent(element: any, j: number) {
    console.log('Delete:', element);
  }

  candidateList(element: any, j: number) {
    console.log('Candidate List:', element);
  }

  exportToExcel() {
    const truncatedCandidates = this.candidates.map((candidate: any) => ({
      rollNumber: candidate.rollNumber,
      name: candidate.name,
      dateOfBirth: candidate.dateOfBirth,
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
  
}
