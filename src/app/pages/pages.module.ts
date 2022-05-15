import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './public/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './public/login/login.component';
import {RegisterComponent} from './public/register/register.component';
import {ProfileComponent} from './secured/profile/profile/profile.component';
import {PostProductComponent} from './secured/post-product/post-product.component';
import {MatLoaderModule} from '../mat-loader.module';
import {ProductDetailComponent} from './public/product-detail/product-detail.component';
import {ProductListingComponent} from './public/product-listing/product-listing.component';
import {EditProfileComponent} from './secured/edit-profile/edit-profile.component';
import {ForgotPasswordComponent} from './public/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './public/reset-password/reset-password.component';
import {ChangePasswordComponent} from './secured/change-password/change-password.component';
import {FeedbackComponent} from './public/feedback/feedback.component';
import {ImageUploadComponent} from './secured/image-upload/image-upload.component';
import {BidComponent} from './secured/bid/bid.component';
import {AboutUsComponent} from './public/about-us/about-us.component';
import {HelpComponent} from './public/help/help.component';
import {FormsModule} from '@angular/forms';
import {ManageProductComponent} from './secured/manage-product/manage-product.component';
import {CartComponent} from './secured/cart/cart.component';
import {BuyNowComponent} from './secured/buy-now/buy-now.component';
import {LogoutComponent} from './secured/logout/logout.component';
import {LiveAuctionComponent} from './public/live-auction/live-auction.component';
import {BillingComponent} from './secured/billing/billing.component';
import {AllProductComponent} from './secured/manage-product/all-product/all-product.component';
import {ViewCategoryComponent} from './secured/manage-product/view-category/view-category.component';
import {AddCategoryComponent} from './secured/manage-product/add-category/add-category.component';
import {TermsConditionsComponent} from './public/terms-conditions/terms-conditions.component';
import {MyBidComponent} from './secured/my-bid/my-bid.component';
import {MyProductComponent} from './secured/my-product/my-product.component';
import {OrderComponent} from './secured/order/order.component';
import {OrderDetailComponent} from './secured/order-detail/order-detail.component';
import {UpdateProductComponent} from './secured/update-product/update-product.component';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'post-product', component: PostProductComponent},
  {path: 'update-product/:id', component: UpdateProductComponent},
  {path: 'product-listing/product-detail/:id', component: ProductDetailComponent},
  {path: 'terms-and-Conditions', component: TermsConditionsComponent},
  {path: 'profile/edit-profile', component: EditProfileComponent},
  {path: 'profile/edit-profile/change-password', component: ChangePasswordComponent},
  {path: 'product-listing', component: ProductListingComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'forgot-password/reset-password', component: ResetPasswordComponent},
  {path: 'image-upload', component: ImageUploadComponent},
  {path: 'product-listing/product-detail/bid', component: BidComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'manage-product', component: ManageProductComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'help', component: HelpComponent},
  {path: 'cart', component: CartComponent},
  {path: 'billing', component: BillingComponent},
  {path: 'bid-details', component: LiveAuctionComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'orders', component: OrderComponent},
  {path: 'order-detail/:orderId', component: OrderDetailComponent},
  {path: 'my-bids', component: MyBidComponent},
  {path: 'my-posted-products', component: MyProductComponent}
];


@NgModule({
  declarations: [HomeComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, ProfileComponent,
    PostProductComponent, ProductListingComponent, ProductDetailComponent, EditProfileComponent, ResetPasswordComponent,
    ChangePasswordComponent,
    FeedbackComponent,
    ImageUploadComponent,
    BidComponent,
    AboutUsComponent,
    HelpComponent,
    ManageProductComponent,
    CartComponent,
    BuyNowComponent,
    LogoutComponent,
    LiveAuctionComponent,
    BillingComponent,
    AllProductComponent,
    ViewCategoryComponent,
    AddCategoryComponent,
    TermsConditionsComponent,
    MyBidComponent,
    MyProductComponent,
    OrderComponent,
    OrderDetailComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatLoaderModule,
    FormsModule
  ],
  providers: [
    // to format matdatePicker for DD-MM-YYYY
  //  {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ]
})
export class PagesModule {
}
