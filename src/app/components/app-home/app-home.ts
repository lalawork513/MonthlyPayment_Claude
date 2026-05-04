import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Search,
  ShoppingCart,
  ChevronRight,
  Play,
  Heart,
  Star,
  SlidersHorizontal,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  Tag,
  Zap,
  Shield,
} from 'lucide-angular';

export interface Category { id: string; label: string; }
export interface Brand { id: string; label: string; }
export interface UnboxingItem { id: number; title: string; subtitle: string; image: string; }
export interface Product {
  id: number;
  name: string;
  image: string;
  monthlyPrice: number;
  originalPrice: number;
  months: number;
  badge: 'fast' | 'official' | null;
  badgeLabel: string;
  isWishlisted: boolean;
}

@Component({
  selector: 'app-app-home', // 保持 CLI 生成的標籤名
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './app-home.html', // 確保對應你的檔案
  styleUrl: './app-home.scss',   // 確保對應你的檔案
})
export class AppHome { // 保持類名一致
  // Icons
  readonly SearchIcon = Search;
  readonly CartIcon = ShoppingCart;
  readonly ChevronRightIcon = ChevronRight;
  readonly PlayIcon = Play;
  readonly HeartIcon = Heart;
  readonly StarIcon = Star;
  readonly SliderIcon = SlidersHorizontal;
  readonly ChatIcon = MessageCircle;
  readonly PhoneIcon = Phone;
  readonly MailIcon = Mail;
  readonly ClockIcon = Clock;
  readonly MenuIcon = Menu;
  readonly XIcon = X;
  readonly TagIcon = Tag;
  readonly ZapIcon = Zap;
  readonly ShieldIcon = Shield;

  // State
  mobileMenuOpen = signal(false);
  selectedCategory = signal('視聽家電');
  selectedBrand = signal<string | null>(null);
  minPrice = signal(1);
  maxPrice = signal(999000);
  searchQuery = signal('');
  cartCount = signal(3);
  activeTab = signal<'latest' | 'popular'>('popular');
  wishlistIds = signal<Set<number>>(new Set([2]));

  // Nav items
  readonly navItems = ['冷氣專區', '視聽家電', '冰箱', '洗衣機', '健康美容', '廚房家電', '季節家電', '生活家電'];

  // Categories
  readonly categories: Category[] = [
    { id: '窗型冷氣', label: '窗型冷氣' },
    { id: '分離冷氣', label: '分離冷氣' },
    { id: '視聽家電', label: '視聽家電' },
    { id: '冰箱', label: '冰箱' },
    { id: '洗衣機', label: '洗衣機' },
    { id: '健康美容', label: '健康美容' },
    { id: '廚房家電', label: '廚房家電' },
    { id: '季節家電', label: '季節家電' },
    { id: '生活家電', label: '生活家電' },
  ];

  readonly brands: Brand[] = [
    { id: '國際牌', label: '國際牌' }, { id: 'LG', label: 'LG' }, { id: '日立', label: '日立' },
    { id: '聲寶', label: '聲寶' }, { id: '奇美', label: '奇美' }, { id: '大金', label: '大金' },
    { id: '東元', label: '東元' }, { id: '三洋', label: '三洋' },
  ];

  readonly unboxingItems: UnboxingItem[] = [
    { id: 1, title: '冰箱收納大搜查', subtitle: '前往購買專區', image: 'https://plus.unsplash.com/premium_photo-1734535215461-304f6329934a?q=80&w=1055&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, title: '滾筒洗脫烘開箱', subtitle: '前往購買專區', image: 'https://images.unsplash.com/photo-1649105057951-e3006c21a664?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, title: '空氣清淨機評測', subtitle: '前往購買專區', image: 'https://images.unsplash.com/photo-1658054857921-825454668a30?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, title: '滾筒洗脫烘開箱', subtitle: '前往購買專區', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80' },
  ];

  readonly allProducts: Product[] = [
    { id: 1, name: 'Sony BRAVIA 65吋 4K OLED', image: 'https://cdn1.cybassets.com/media/W1siZiIsIjI3Njc0L3Byb2R1Y3RzLzUxODc5NzI3LzE3MzMzOTE5MTlfM2IzNjBhYTg1MWNhNDU0YmMxZjUuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=547e1b7c39a75329', monthlyPrice: 2499, originalPrice: 59900, months: 24, badge: 'fast', badgeLabel: '快速出貨', isWishlisted: false },
    { id: 2, name: 'Dyson V15 Detect', image: 'https://i2.momoshop.com.tw/1777570230/goodsimg/0012/680/852/12680852_R.webp', monthlyPrice: 1200, originalPrice: 22900, months: 24, badge: null, badgeLabel: '', isWishlisted: false },
    { id: 3, name: 'Panasonic 雙門變頻冰箱-鏡面鑽石黑(NR-B261VG-X1)', image: 'https://i3.momoshop.com.tw/1772562098/goodsimg/0011/373/328/11373328_OL.jpg', monthlyPrice: 835, originalPrice: 18392, months: 24, badge: null, badgeLabel: '', isWishlisted: false },
    { id: 4, name: 'HITACHI 日立 15KG 日製AI智能感測變頻左開熱泵滾筒洗脫烘洗衣機(BD-SX150JJ-W)', image: 'https://i2.momoshop.com.tw/1775037003/goodsimg/0013/439/638/13439638_OR.jpg', monthlyPrice: 3338, originalPrice: 73508, months: 24, badge: 'official', badgeLabel: '官方保固', isWishlisted: true },
  ];

  products = signal<Product[]>(this.allProducts);

  // Computed - 修正 any 類型
  filteredProducts = computed(() => {
    return this.products().filter(
      (p: any) => p.monthlyPrice >= this.minPrice() && p.monthlyPrice <= this.maxPrice()
    );
  });

  // Methods
  selectCategory(cat: string): void { this.selectedCategory.set(cat); }
  selectBrand(brand: string): void { this.selectedBrand.set(this.selectedBrand() === brand ? null : brand); }

  // 修正 any 類型
  toggleMobileMenu(): void { this.mobileMenuOpen.update((v: any) => !v); }
  setActiveTab(tab: 'latest' | 'popular'): void { this.activeTab.set(tab); }

  // 修正 any 類型
  toggleWishlist(productId: number): void {
    this.wishlistIds.update((set: any) => {
      const next = new Set<number>(set);
      next.has(productId) ? next.delete(productId) : next.add(productId);
      return next;
    });
  }

  isWishlisted(productId: number): boolean { return this.wishlistIds().has(productId); }

  // 修正 any 類型
  addToCart(product: Product): void { this.cartCount.update((n: any) => n + 1); }

  formatPrice(price: number): string { return price.toLocaleString('zh-TW'); }
  updateSearch(value: string): void { this.searchQuery.set(value); }
}
