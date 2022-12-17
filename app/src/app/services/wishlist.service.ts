import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlist = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackbar: MatSnackBar) { }

  addToWishlist(item: CartItem): void {
    const items = [...this.wishlist.value.items]

    const itemInWishlist = items.find((_item) => _item.id === item.id);

    if (itemInWishlist) {
      itemInWishlist.quantity += 1;
    } else {
      items.push(item);
    }

    this.wishlist.next({ items });
    this._snackbar.open('Item added to wishlist.', 'Ok', { duration: 3000 });
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;

    let filteredItems = this.wishlist.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;

        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromWishlist(itemForRemoval, false);
    }

    this.wishlist.next({ items: filteredItems });
    this._snackbar.open('Item removed from wishlist', 'Ok', { duration: 3000 });
  }

  getTotal(items: Array<CartItem>): number {
    return items.map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  removeFromWishlist(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.wishlist.value.items.filter((_item) => _item.id !== item.id);

    if (update) {
      this.wishlist.next({ items: filteredItems });
      this._snackbar.open('Item removed from wishlist', 'Ok', { duration: 3000 }); 
    }

    return filteredItems;
  }

}
