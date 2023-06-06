import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  weaknesses: FormControl[] = [];

  powers: FormControl[] = [];

  heroForm!: FormGroup;

  hero: any = {
    name: '',
    alterEgo: '',
    powers: [],
    enemy: '',
    planet: '',
    weaknesses: []
  }

  constructor() { }

  ngOnInit(): void {
    this.heroForm = new FormGroup ({
      name: new FormControl(null, Validators.required),
      alterEgo: new FormControl(null, Validators.required),
      enemy: new FormControl(null, Validators.maxLength(10)),
      planet: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    })

    this.heroForm.statusChanges?.subscribe(stato => {
      console.log(this.heroForm);
      console.log(stato);
    })
  }

  generateWeakness() {
    const newWeakness = new FormControl('');
    this.weaknesses.push(newWeakness);
    this.heroForm.addControl(`input${this.weaknesses.length}`, newWeakness);
  }
  isWeaknessEmpty() {
    return this.weaknesses.some((weakness: FormControl) => weakness.value?.trim() === '');
  }

  generatePower() {
    const newPower = new FormControl('');
    this.powers.push(newPower);
    this.heroForm.addControl(`input${this.powers.length}`, newPower);
  }
  isPowerEmpty() {
    return this.powers.some((power: FormControl) => power.value?.trim() === '');
  }



  submitForm() {
    console.log('Form inviato: ', this.hero);
    this.hero.name = this.heroForm.value.name;
    this.hero.alterEgo = this.heroForm.value.alterEgo;
    this.hero.powers = this.powers.map((power: FormControl) => power.value).filter((value: string) => value.trim() !== '');
    this.hero.enemy = this.heroForm.value.enemy;
    this.hero.planet = this.heroForm.value.planet;
    this.hero.weaknesses = this.weaknesses.map((weakness: FormControl) => weakness.value).filter((value: string) => value.trim() !== '');
    this.heroForm.reset();
  }

}
