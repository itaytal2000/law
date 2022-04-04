import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Fromto } from '../../Shared/fromto';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.css']
})

export class CurrencyRateComponent implements OnInit {

  fromToResultText:string;      // Text of Full currency convert to display
  isSubmitted: boolean;         // Submit button was pressed
  arrCoin: Array<string> = [];  // Coins (symbol_) array (Data from API)
  allConvert:Fromto[];          // Currency convert which was already done (history)
  currencyArr;                  // Reaponse from API with currency symbol and value

  constructor(private httpClient: HttpClient, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.isSubmitted = false;
    this.getCurrencies();    
  }

  currencyForm = this.fb.group({
    txtSum:   ['', [Validators.required]],
    slctFrom: ['', [Validators.required]],
    slctTo:   ['', [Validators.required]],
  });


  onSubmit(): void {
    var sum:number;             // Value to convert
    var fromRate: number;       // From value
    var toRate: number;         // To Value
    var res: string;            // Convert calcaulation result
    var from:string;            // From symbol
    var to:string;              // To Symbol
    this.isSubmitted = true;    // Submit button was pressed
    // Form is valid
    if (this.currencyForm.valid){
      sum = this.currencyForm.get('txtSum').value;                        // Sum of money to convert
      from = this.currencyForm.get('slctFrom').value;                     // From currency (symbol)
      to = this.currencyForm.get('slctTo').value;                         // To currency (symbol)
      fromRate = this.currencyArr.rates[from];                            // From Currency value
      toRate = this.currencyArr.rates[to];                                // To Currenct Value
      res = (sum / fromRate * toRate).toFixed(2).toString();              // Result calculation
      this.fromToResultText= sum + " " + from + " = " + res + " " + to;   // Result Text to display
      if (localStorage.getItem('allConvert') == null)                     // Get all history results from local storage
      {
        this.allConvert=[];
      }
      else
      {
        this.allConvert = JSON.parse(localStorage.getItem('allConvert'));
      }
      this.allConvert.push(new Fromto(sum, from, to, res));               // Add Result to all convert for history
      localStorage.setItem('allConvert',JSON.stringify(this.allConvert)); // Save new data to local storage (to avoid Refresh - Delete)
    }
  }


  // Get coin (symbol) data from API and push it to array (arrCoin)
  getCurrencies(){
    var apiCurrencyUrl = 'http://api.exchangeratesapi.io/v1/latest?access_key=fe8ebe83872f1edda3125b431f14aa7f';
    this.httpClient.get<any>(apiCurrencyUrl).subscribe(
      response=>{
        this.currencyArr=response;
        for (const coin in this.currencyArr.rates) {
          this.arrCoin.push(coin);
        }
      }
    );
  };
}