import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsersInterface } from '../../interface/user.interface';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  userGroup!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  /**
   * @description: Creates a from froup and sets its variables and validations.
   */
  ngOnInit(): void {
    this.userGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      dob: ['', [Validators.required]],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('^[a-zA-z0-9 ]*$'),
        ],
      ],
    });
  }

  /**
   * @description: Function gets triggered on Submit button click event. It makes the POST api call and sends the form data in api request body.
   * Once the response is received it shows the alert message
   */
  onSubmit() {
    console.log('user: ', this.userGroup.value);

    if (this.userGroup.valid) {
      const userData: UsersInterface = this.userGroup.value;

      this.http.post('http://localhost:3000/users', userData).subscribe(
        (response) => {
          alert('User added successfully');
        },
        (error) => {
          alert('An error occured while saving the user.');
        }
      );
    }
  }
}
