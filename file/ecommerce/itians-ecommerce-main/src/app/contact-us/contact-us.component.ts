import { Component } from '@angular/core';
import { OurTeamComponent } from "../our-team/our-team.component";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [OurTeamComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUSComponent {

}
