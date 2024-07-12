import { Component } from '@angular/core';
import { StarNightComponent } from '../common/star-night/star-night.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StarNightComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
