import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {of} from "rxjs";

@Component({
  selector: 'app-test-input',
  templateUrl: './test-input.component.html',
  styleUrls: ['./test-input.component.scss']
})
export class TestInputComponent {
  // @Input() inputId: string = ''
  @Input() control = new FormControl<string>('')
  @Input() label: string = ''


  constructor() {
    this.control.statusChanges.subscribe(console.log)


  }

}
