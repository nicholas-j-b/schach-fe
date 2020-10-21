import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  validUsername = /^[A-Za-z0-9_]+$/;
  usernameMinLength = 3;
  returnUrl: string;
  loginLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {
    this.userForm = this.buildLoginForm();
    this.userForm.valueChanges.subscribe(form => {
      console.log(form);
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    console.log(this.userForm.get('username'));
    console.log(this.userForm.get('password'));
  }

  private buildLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.pattern(this.validUsername),
        Validators.minLength(3)
      ]],
      password: ['']
    });

  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    } else {
      const username = this.userForm.get('username').value;
      const password = this.userForm.get('password').value;
      console.log(username);
      const loginResponse = this.authenticationService.login(username, password);
      this.loginLoading = true;
      loginResponse.subscribe(res => {
        this.loginLoading = false;
        this.router.navigate([this.returnUrl]);
      });
    }


  }

  isLoginFormValid(): boolean {
    return this.userForm.valid;
  }

  isValidUsername(username: string): boolean {
    return !!username.match(this.validUsername);
  }

  shouldDisplayUsernameRequirements(): boolean {
    return !this.userForm.valid && this.userForm.get('username').value.length >= this.usernameMinLength;
  }

}
