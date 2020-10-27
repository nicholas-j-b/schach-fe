import { UserConfig } from './../../../config/user-config';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  registerFailed = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService
  ) {
    this.userForm = this.buildRegisterForm();
  }

  ngOnInit(): void {
  }

  private buildRegisterForm() {
    return this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.pattern(UserConfig.validUsername),
        Validators.minLength(UserConfig.usernameMinLength),
        Validators.maxLength(UserConfig.usernameMaxLength)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(UserConfig.passwordMinLength),
        Validators.maxLength(UserConfig.passwordMaxLength)
      ]],
      passwordRepeat: ['', [
        Validators.required
      ]],
    },
      {
        validator: this.checkPasswordsMatch
      });
  }

  public onSubmit() {
    if (this.userForm.invalid) {
      return;
    } else {
      const username = this.userForm.get('username').value;
      const password = this.userForm.get('password').value;
      const rergisterResponse = this.authenticationService.register(username, password);
      this.loading = true;
      rergisterResponse.subscribe(
        res => {
          this.loading = false;
          if (res) {
            this.registerFailed = false;
            this.router.navigate(['/home']);
          }
        },
        err => {
          console.log(err);
          this.loading = false;
          this.registerFailed = true;
          this.userForm = this.buildRegisterForm();
        });
    }

  }

  public isRegistrationFormValid(): boolean {
    return this.userForm.valid;
  }

  public shouldDisplayUsernameRequirements(): boolean {
    const formUsername = this.userForm.get('username');
    return formUsername.invalid && formUsername.value.length >= UserConfig.usernameMinLength;
  }

  public shouldDisplayPasswordsMatchWarning(): boolean {
    const formPassword = this.userForm.get('password');
    const formPasswordRepeat = this.userForm.get('passwordRepeat');
    return formPassword.value.length > 0 &&
      formPasswordRepeat.value.length > 0 &&
      this.userForm.getError('passwordsNotMatch');
  }

  public shouldDisplayRegisterFailWarning(): boolean {
    return this.registerFailed && this.userForm.get('username').value.length <= 0;
  }

  public checkPasswordsMatch(group: FormGroup): ValidationErrors | null {
    const password = group.get('password');
    const passwordRepeat = group.get('passwordRepeat');
    return password.value === passwordRepeat.value ? null : { passwordsNotMatch: true };
  }

}
