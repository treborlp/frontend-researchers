import { Component, OnInit } from '@angular/core';
import { ResearcherService } from '../service/researcher.service';
import { Researcher } from '../class/researcher';

@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.css']
})
export class ResearcherComponent implements OnInit {

  researcher: Researcher = new Researcher();
  constructor(private researcherService: ResearcherService) { }

  ngOnInit(): void {
  }

  public crearResearcher(): void{
    //console.log(this.researcher)
    this.researcherService.createResearcher(this.researcher).subscribe(
      researcher => {
        //this.router.navigate(['/sectores'])
        //Swal.fire('Nuevo Sector', `Sector ${sector.nombreSector}`, 'success')   
        console.log(`Researcher ${researcher.name} was created`);     
      }
    )
  }

}
