import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-form',
  templateUrl: './addnewform.component.html',
  styleUrls: ['./addnewform.component.css']
})
export class AddNewFormComponent {
  @Output() addNewFormEvent = new EventEmitter<void>();

  // Function to add a new form
  onAddNewForm() {
    this.addNewFormEvent.emit();
  }
}
