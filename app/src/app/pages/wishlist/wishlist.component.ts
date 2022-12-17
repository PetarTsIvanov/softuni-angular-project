import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: Cart = { items: [] };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private wishlistService: WishlistService, private cartService: CartService) { }

  ngOnInit(): void {
    this.wishlistService.wishlist.subscribe((_wishlist: Cart) => {
      this.wishlist = _wishlist;
      this.dataSource = this.wishlist.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.wishlistService.getTotal(items);
  }

  onRemoveFromWishlist(item: CartItem): void {
    this.wishlistService.removeFromWishlist(item);
  }

  onAddQuantity(item: CartItem): void {
    this.wishlistService.addToWishlist(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.wishlistService.removeQuantity(item);
  }

  onAddToWishlist(item: CartItem): void {
    this.wishlistService.addToWishlist(item);
  }

  onAddToCart(item: CartItem): void {
    this.cartService.addToCart(item);
  }
}
