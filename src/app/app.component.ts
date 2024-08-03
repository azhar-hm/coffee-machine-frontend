import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoffeeOrderSelectionComponent } from './components/coffee-order-selection/coffee-order-selection.component';
import { CoffeeOrderSummaryComponent } from './components/coffee-order-summary/coffee-order-summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoffeeOrderSelectionComponent, CoffeeOrderSummaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'coffee-machine-frontend';
}
