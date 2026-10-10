import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface Participant {
  name: string;
  email: string;
  age: string;
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    age: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.min(18)],
    }),
  });

  participants = signal<Participant[]>([]);

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.participants.update((list) => [...list, this.form.getRawValue()]);
    this.form.reset();
  }

  clearList() {
    this.participants.set([]);
  }
}