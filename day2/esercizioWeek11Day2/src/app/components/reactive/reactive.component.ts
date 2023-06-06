import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  heroForm!: FormGroup;

  hero: any = {
    name: '',
    alterEgo: '',
    power: '',
    enemy: '',
    planet: '',
    weakness: ''
  }

  constructor() { }

  ngOnInit(): void {
    this.heroForm = new FormGroup ({
      name: new FormControl(null, Validators.required),
      alterEgo: new FormControl(null, Validators.required),
      power: new FormControl(null, Validators.required),
      enemy: new FormControl(null, Validators.maxLength(10)),
      planet: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      weakness: new FormControl
    })

    this.heroForm.statusChanges?.subscribe(stato => {
      console.log(this.heroForm);
      console.log(stato);
    })
  }

  submitForm() {
    console.log('Form inviato: ', this.hero);
    this.hero.name = this.heroForm.value.name;
    this.hero.alterEgo = this.heroForm.value.alterEgo;
    this.hero.power = this.heroForm.value.power;
    this.hero.enemy = this.heroForm.value.enemy;
    this.hero.planet = this.heroForm.value.planet;
    this.hero.weakness = this.heroForm.value.weakness;
    this.heroForm.reset();
  }

}
