import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AutocompleteComponent} from './autocomplete/autocomplete.component';
import {MatLoaderModule} from '../mat-loader.module';
import {FormsModule} from '@angular/forms';
import {ProductListingComponent} from '../pages/public/product-listing/product-listing.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'product-listing', component: ProductListingComponent },
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, AutocompleteComponent],
  imports: [
    CommonModule,
    MatLoaderModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [HeaderComponent, FooterComponent, AutocompleteComponent]
})
export class LayoutModule {
}
