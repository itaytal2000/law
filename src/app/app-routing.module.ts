import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyRateComponent} from './coin/currency-rate/currency-rate.component';
import { AboutComponent} from './coin/about/about.component';

const routes: Routes = [
  {path:'rate', component: CurrencyRateComponent},
  {path:'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }