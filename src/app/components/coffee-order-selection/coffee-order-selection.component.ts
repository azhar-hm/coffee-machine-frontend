import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoffeeDetailsService } from '../../services/coffee-details.service';
import { CoffeeSize, CoffeeType, CoffeeTopping } from '../../models/coffee-model';

@Component({
  selector: 'app-coffee-order-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './coffee-order-selection.component.html',
  styleUrl: './coffee-order-selection.component.scss'
})
export class CoffeeOrderSelectionComponent {
  coffeeSizes: CoffeeSize[] = [];
  coffeeTypes: CoffeeType[] = [];
  coffeeToppings: CoffeeTopping[] = [];

  coffeeToppingCounts: { [key: string]: number } = {};
  coffeeTotalPrice: number = 0;
  insertedAmount: number = 0;
  changeAmount: number | null = null;
  orderNumber: string = '';
  paymentConfirmed: boolean = false;

  coinAmount: number = 0;
  billAmounts: { [key: number]: number } = {2: 0, 5: 0, 10: 0};
  bills: number[] = [2, 5, 10];

  coffeeForm: FormGroup;
  paymentVisible: boolean = false;

  constructor(private fb: FormBuilder, private coffeeDetailsService: CoffeeDetailsService) {
    this.coffeeForm = this.fb.group({
      selectedSize: [null, Validators.required],
      selectedType: [null, Validators.required],
      addToppings: ['no'],  // Default to 'no'
    });
  }

  ngOnInit(): void {
    this.loadCoffeeDetails();
    this.coffeeForm.valueChanges.subscribe(() => this.calculateTotal());
  }

  loadCoffeeDetails(): void {
    this.coffeeDetailsService.getCoffeeDetails().subscribe((details) => {
      this.coffeeSizes = details.sizes;
      this.coffeeTypes = details.types;
      this.coffeeToppings = details.toppings;
    });
  }

  calculateTotal(): void {
    const { selectedSize, selectedType } = this.coffeeForm.value;
    this.coffeeTotalPrice = 0;
    if (selectedSize) {
      this.coffeeTotalPrice += selectedSize.price;
    }
    if (selectedType) {
      this.coffeeTotalPrice += selectedType.price;
    }
    if (this.isAddingToppings()) {
      for (const topping of this.coffeeToppings) {
        if (this.coffeeToppingCounts[topping.name]) {
          this.coffeeTotalPrice += topping.price * this.coffeeToppingCounts[topping.name];
        }
      }
    }
  }

  onToppingsSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const addToppings = selectElement.value;
    if (addToppings === 'no') {
      this.paymentVisible = true;
    } else if (addToppings === 'yes') {
      this.paymentVisible = false;
    }
  }

  isAddingToppings(): boolean {
    return this.coffeeForm.value.addToppings === 'yes';
  }

  isCoffeeSelectionComplete(): boolean {
    const { selectedSize, selectedType, addToppings } = this.coffeeForm.value;
    return selectedSize && selectedType && (addToppings === 'no' || this.toppingsSelected());
  }

  incrementTopping(toppingName: string): void {
    if (!this.coffeeToppingCounts[toppingName]) {
      this.coffeeToppingCounts[toppingName] = 0;
    }
    this.coffeeToppingCounts[toppingName] += 1;
    this.calculateTotal();
  }

  decrementTopping(toppingName: string): void {
    if (this.coffeeToppingCounts[toppingName] && this.coffeeToppingCounts[toppingName] > 0) {
      this.coffeeToppingCounts[toppingName] -= 1;
      if (this.coffeeToppingCounts[toppingName] === 0) {
        delete this.coffeeToppingCounts[toppingName];
      }
      this.calculateTotal();
    }
  }

  confirmOrder(): void {
    if (this.isAddingToppings() && !this.toppingsSelected()) {
      alert('Please select at least one topping.');
      return;
    }
    this.paymentVisible = true;
  }

  toppingsSelected(): boolean {
    return Object.values(this.coffeeToppingCounts).some(count => count > 0);
  }

  updateCoinAmount(amount: number): void {
    this.coinAmount += amount;
    this.insertedAmount = this.coinAmount + this.getTotalBillAmount();
  }

  updateBillAmount(amount: number): void {
    const billAmount = Math.abs(amount);
    if (amount > 0) {
      this.billAmounts[billAmount] = (this.billAmounts[billAmount] || 0) + 1;
    } else {
      if (this.billAmounts[billAmount] > 0) {
        this.billAmounts[billAmount] -= 1;
      }
    }
    this.insertedAmount = this.coinAmount + this.getTotalBillAmount();
  }

  getTotalBillAmount(): number {
    return Object.entries(this.billAmounts).reduce((total, [bill, count]) => total + (+bill * count), 0);
  }

  confirmPayment(): void {
    if (this.insertedAmount >= this.coffeeTotalPrice) {
      this.generateOrderNumber();
      this.changeAmount = this.insertedAmount - this.coffeeTotalPrice;
      this.paymentConfirmed = true;
      alert(`Payment confirmed! Your order number is ${this.orderNumber}. Change to return: ${this.changeAmount}€`);
      this.resetForm();
    } else {
      alert('Not enough amount inserted.');
    }
  }

  generateOrderNumber(): void {
    this.orderNumber = 'ORD' + Math.floor(Math.random() * 1000000).toString();
  }

  resetForm(): void {
    this.coffeeForm.reset({
      addToppings: 'no'
    });
    this.coffeeToppingCounts = {};
    this.coinAmount = 0;
    this.billAmounts = {2: 0, 5: 0, 10: 0};
    this.insertedAmount = 0;
    this.changeAmount = null;
    this.orderNumber = '';
    this.paymentConfirmed = false;
    this.paymentVisible = false;
  }
}
