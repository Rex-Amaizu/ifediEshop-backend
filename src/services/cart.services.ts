// services/cart.service.ts
import { Types } from "mongoose";
import { UserRepository } from "../repositories/user.repository";
import { ProductRepository } from "../repositories/product.repository";
import { CartItemInput, PopulatedProduct } from "../types/user.types";

const productRepo = new ProductRepository();

export class CartService {
  private calculateTotal(cart: any[]) {
    return cart.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  }

  private mapCartItems(cart: any[]) {
    return cart.map((item) => {
      const product = item.product as PopulatedProduct;
      return {
        _id: item._id.toString(),
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          images: product.images,
          colors: product.colors || [],
          sizes: product.sizes || [],
        },
        quantity: item.quantity,
        selectedColor: item.selectedColor ?? null,
        selectedSize: item.selectedSize ?? null,
        createdAt: item.createdAt ?? item._id.getTimestamp(),
        updatedAt: item.updatedAt ?? new Date(),
      };
    });
  }

  /* =======================
     GET CART
  ======================= */
  async getCart(userId: string) {
    const user = await UserRepository.findByIdWithCart(userId);
    if (!user) throw new Error("User not found");

    const items = this.mapCartItems(user.userCart);
    const totalAmount = this.calculateTotal(user.userCart);

    return { items, totalAmount };
  }

  /* =======================
     ADD TO CART
  ======================= */
  async addToCart(
    userId: string,
    productId: string,
    quantity = 1,
    color?: string | null,
    size?: string | null
  ) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");

    const product = await productRepo.findProductById(productId);
    if (!product) throw new Error("Product not found");

    // Validate color
    if (product.colors?.length > 1 && !color)
      throw new Error("Please select a color");
    if (color && !product.colors.includes(color))
      throw new Error("Invalid color selected");

    // Validate size
    if (product.sizes?.length > 1 && !size)
      throw new Error("Please select a size");
    if (size && !product.sizes.includes(size))
      throw new Error("Invalid size selected");

    // Check if item exists in cart (same product + color + size)
    const existingItem = user.userCart.find(
      (item) =>
        item.product.toString() === productId &&
        item.selectedColor === (color ?? null) &&
        item.selectedSize === (size ?? null)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItemInput = {
        product: product._id,
        quantity,
        selectedColor: color ?? null,
        selectedSize: size ?? null,
      };
      user.userCart.push(newItem as any);
    }

    await user.save();

    const updatedUser = await UserRepository.findByIdWithCart(userId);
    const items = this.mapCartItems(updatedUser!.userCart);
    const totalAmount = this.calculateTotal(updatedUser!.userCart);

    return { items, totalAmount };
  }

  /* =======================
     UPDATE QUANTITY
  ======================= */
  async updateQuantity(userId: string, productId: string, quantity: number) {
    if (quantity <= 0) throw new Error("Quantity must be greater than zero");

    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");

    const item = user.userCart.find((i) => i.product.toString() === productId);
    if (!item) throw new Error("Item not found in cart");

    item.quantity = quantity;
    await user.save();

    const updatedUser = await UserRepository.findByIdWithCart(userId);
    const items = this.mapCartItems(updatedUser!.userCart);
    const totalAmount = this.calculateTotal(updatedUser!.userCart);

    return { items, totalAmount };
  }

  /* =======================
     REMOVE ITEM
  ======================= */
  async removeFromCart(
    userId: string,
    productId: string,
    color?: string | null,
    size?: string | null
  ) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");

    // Remove only the cart item that matches product + color + size
    user.userCart = user.userCart.filter(
      (i) =>
        !(
          i.product.toString() === productId &&
          i.selectedColor === (color ?? null) &&
          i.selectedSize === (size ?? null)
        )
    );

    await user.save();

    const updatedUser = await UserRepository.findByIdWithCart(userId);
    const items = this.mapCartItems(updatedUser!.userCart);
    const totalAmount = this.calculateTotal(updatedUser!.userCart);

    return { items, totalAmount };
  }

  /* =======================
     CLEAR CART
  ======================= */
  async clearCart(userId: string) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");

    user.userCart = [];
    await user.save();

    return { items: [], totalAmount: 0 };
  }
}
