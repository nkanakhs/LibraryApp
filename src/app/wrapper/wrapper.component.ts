import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [NavComponent,RouterOutlet],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css'
})
export class WrapperComponent {

}
