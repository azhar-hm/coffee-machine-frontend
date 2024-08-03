export interface CoffeeSize {
    name: string;
    price: number;
  }
  
  export interface CoffeeType {
    name: string;
    price: number;
  }
  
  export interface CoffeeTopping {
    name: string;
    price: number;
  }
  
  export interface CoffeeDetails {
    sizes: CoffeeSize[];
    types: CoffeeType[];
    toppings: CoffeeTopping[];
  }
  