import { Component, OnInit } from '@angular/core';
import { ResearcherService } from 'src/app/admin/service/researcher.service';
import { Researcher } from 'src/app/admin/class/researcher';
import { AuthService } from 'src/app/admin/service/auth.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  researcher: Researcher = new Researcher();
  constructor(private researcherService: ResearcherService) { }


  ngOnInit(): void {
    
    /*this.researcherService.findResearcher(1).subscribe(
      researcher => this.researcher = researcher
    )*/
    
  }

  



}
