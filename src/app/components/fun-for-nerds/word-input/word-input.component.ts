import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-word-input',
  standalone: true,
  imports: [],
  templateUrl: './word-input.component.html',
  styleUrl: './word-input.component.css'
})
export class WordInputComponent {

  // The partial word that the user has typed
  @Output() partialWord = new EventEmitter<string>();

  // The word that the user has typed
  @Output() word = new EventEmitter<string>();

  // The current word being typed by the user
  currentWord = '';

  onInput(event: Event) {
   const input = event.target as HTMLInputElement; // Get the input element
   this.partialWord.emit(input.value); // Emit the partial word
   this.currentWord = input.value; // Update the current word
  };

  onSubmit() {
    this.word.emit(this.currentWord); // Emit the word
  };

}
