import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-coffee-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coffee-order-summary.component.html',
  styleUrl: './coffee-order-summary.component.scss'
})
export class CoffeeOrderSummaryComponent {
  @Input() orderDetails: any;
  selectedSize: any = null;
  selectedType: any = null;
  selectedToppings: any[] = [];
  totalPrice = 0;
  insertedMoney = 0;
  orderConfirmed = false;

  ngOnInit() {
    if (this.orderDetails) {
      this.selectedSize = this.orderDetails.size;
      this.selectedType = this.orderDetails.type;
      this.selectedToppings = this.orderDetails.toppings;
      this.totalPrice = this.orderDetails.total;
      this.orderConfirmed = true;
    }
  }

  insertMoney(amount: number) {
    this.insertedMoney += amount;
  }

  completeOrder() {
    if (this.insertedMoney >= this.totalPrice) {
      const change = this.insertedMoney - this.totalPrice;
      alert(`Order Completed! Change: ${change}€`);
      this.resetOrder();
    } else {
      alert('Insufficient funds.');
    }
  }

  cancelOrder() {
    alert('Order Canceled');
    this.resetOrder();
  }

  resetOrder() {
    this.orderConfirmed = false;
    this.insertedMoney = 0;
    // Reset the CoffeeSelectionComponent as well
  }
}
