import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoffeeOrderSelectionComponent } from './components/coffee-order-selection/coffee-order-selection.component';
import { CoffeeOrderSummaryComponent } from './components/coffee-order-summary/coffee-order-summary.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CoffeeOrderSelectionComponent,
    CoffeeOrderSummaryComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {

  @ViewChild('formRenderer') formRenderer!: ElementRef;
  showRenderer = false;
  showCoffeeMachine = false;
  title = 'coffee-machine-frontend';

  ngAfterViewInit() {
    // Ensure the form-renderer is hidden by default
    this.updateRendererVisibility();
  }

  toggleRenderer() {
    this.showRenderer = true;
    this.showCoffeeMachine = false;
    this.updateRendererVisibility();
  }

  toggleCoffeeMachine() {
    this.showCoffeeMachine = true;
    this.showRenderer = false;
    this.updateRendererVisibility();
  }

  private updateRendererVisibility() {
    if (this.formRenderer) {
      const event = this.showRenderer ? 'showRenderer' : 'hideRenderer';
      this.formRenderer.nativeElement.dispatchEvent(new CustomEvent(event));
    }
  }
}
