import { ApiService } from './services/api.service';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'UtopiaTech';
  opened = false;
  opened2 = false;

  displayedColumns: string[] = ['panel_name', 'mac_id', 'Lat', 'Lng','location'];
  displayedColumns2: string[] = ['parameters', 'r_phase'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  voltage: any;
  mcb: any;
  load: any;
  pf: any;
  lat: any;
  lng: any;
  center: any;
  markers = new Array();



  constructor(private api : ApiService){
    
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.api.getS()
    .subscribe({
      next:(res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  info(item: any){
    this.voltage = item.r_volt_status;
    this.mcb = item.r_mcb_status;
    this.load = item.r_load_status;
    this.pf = item.r_pf_status;
    this.opened=!this.opened;
  }

  map(item: any){
    this.lat = item.Lat;
    this.lng = item.Lng;
    this.center = new google.maps.LatLng(this.lat,this.lng);
    this.opened2=!this.opened2;
  }

  moveMap(){
    alert(this.center);
  }
}
