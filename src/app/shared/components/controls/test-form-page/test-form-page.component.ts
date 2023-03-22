import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-form-page',
  templateUrl: './test-form-page.component.html',
  styleUrls: ['./test-form-page.component.scss'],
})
export class TestFormPageComponent {
  formGroup = new FormGroup({
    firstname: new FormControl<string>('', [Validators.required]),
    lastname: new FormControl<string>('', [Validators.required]),
  });

  constructor(

  ) {
    this.formGroup.statusChanges.subscribe((value)=> console.log(value,  this.formGroup.errors))

     }
}
