import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [RouterLink, RouterOutlet,RouterLinkActive],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {

  constructor(){
    
  }

}
