import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
//Import fissi per reactive forms
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'proveMattinaWeek11Day2';

  //Costruzione form
  contenitoreForm!: FormGroup;
  generi = ['uomo', 'donna'];
  userNameProibiti = ['Mario', 'Anna'];
  //Chiamatan costruttore fissa per reactive forms
  constructor(private fb: FormBuilder) {}
  //Controllo validità form
  validUserName = (formC: FormControl) => {
    if (this.userNameProibiti.includes(formC.value)) {
      return { userNameProibiti: true };
    } else {
      return null;
    }
  };

  ngOnInit(): void {
    this.contenitoreForm = this.fb.group({
      userinfo: this.fb.group({
        username: this.fb.control(null, [
          Validators.required,
          this.validUserName,
        ]),
        email: this.fb.control(null, [Validators.required, Validators.email]),
      }),
      genere: this.fb.control('donna'),
      sports: this.fb.array([]),
    });
    this.contenitoreForm.valueChanges.subscribe((value) => {
      console.log('Stato del form: ', value);
    });
  }
  getError(name: string, errore: string) {
    return this.contenitoreForm.get(name)?.errors![errore];
  }

  getFormC(name: string) {
    return this.contenitoreForm.get(name);
  }

  getSportsF() {
    return (this.contenitoreForm.get('sports') as FormArray).controls;
  }

  addSports() {
    const control = this.fb.control(null);
    (this.contenitoreForm.get('sports') as FormArray).push(control);
    console.log(this.getSportsF);
  }

  submitForm() {
    console.log(this.contenitoreForm);

    console.log('Form Correttamente Inviato');

    this.contenitoreForm.reset();
  }
}
