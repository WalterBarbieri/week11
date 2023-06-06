import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  @ViewChild('contenitoreForm', {static: true}) contenitoreForm!: NgForm;

  heroForm = {
    name: '',
    alterEgo: '',
    power: '',
    enemy: '',
    planet: '',
    weakness: ''
  }

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

    this.contenitoreForm.statusChanges?.subscribe(stato => {
      console.log(this.contenitoreForm);
      console.log(stato);
    })
  }

  submitForm() {
    console.log('Form inviato: ', this.contenitoreForm);
    this.hero.name = this.contenitoreForm.value.heroInfo.name;
    this.hero.alterEgo = this.contenitoreForm.value.heroInfo.alterEgo;
    this.hero.power = this.contenitoreForm.value.heroInfo.power;
    this.hero.enemy = this.contenitoreForm.value.heroInfo.enemy;
    this.hero.planet = this.contenitoreForm.value.heroInfo.planet;
    this.hero.weakness = this.contenitoreForm.value.heroInfo.weakness;
    this.contenitoreForm.reset();
  }

}
