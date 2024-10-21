import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WrapperComponent } from "./wrapper/wrapper.component";
import { NavComponent } from './nav/nav.component';
import { HomepageComponent } from "./homepage/homepage.component";
import { TopNavComponent } from "./top-nav/top-nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WrapperComponent, NavComponent, HomepageComponent, TopNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'library-app';
}
