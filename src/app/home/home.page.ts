import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public form: FormGroup;
  public loop = new Array(12);
  public card:any = {
    currentCardBackground : Math.floor(Math.random()* 25 + 1),
    minCardYear : new Date().getFullYear(),
    otherCardMask : {mask:'0000 0000 0000 0000', len:19, type:'number'},
    amexCardMask : {mask:'0000 000000 00000', len:17, type:'number'},
    isCardFlipped : false,
    maskCostum:null
  }

  
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.iniForm();
    this.generateCardNumberBrMask();
    this.card.cardNumberTemp = this.card.otherCardMask;
  }

  private iniForm(): void {
    this.form = this.fb.group({
        numbercard: ['', [Validators.required]],
        month: ['', [Validators.required]],
        year: ['', [Validators.required]],
        holder: ['', [Validators.required]],
        cvv: ['', [Validators.required]],
    })
}

  getCardType () {
    let number = this.form.value.numbercard;

    let re = new RegExp("^4");
    if (number.match(re) != null) return "visa";

    re = new RegExp("^(34|37)");
    if (number.match(re) != null) return "amex";

    re = new RegExp("^5[1-5]");
    if (number.match(re) != null) return "mastercard";

    re = new RegExp("^6011");
    if (number.match(re) != null) return "discover";
    
    re = new RegExp('^9792')
    if (number.match(re) != null) return 'troy'

    return "visa"; // default type
  }

  generateCardNumberBrMask () {
    this.card.maskCostum = this.getCardType() === "amex" ? this.card.amexCardMask : this.card.otherCardMask;
  }

  flipCard (status) {
    console.log(status);
    this.card.isCardFlipped = status;
  }

  blurInputCreditCard() {
    console.log(this.getCardType());
    this.generateCardNumberBrMask();
    let number = '3608 081292 9172';
    let re = new RegExp("^(34|37)");
    if (number.match(re) != null) console.log("amex");
  }



}
