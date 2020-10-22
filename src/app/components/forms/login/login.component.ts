import { UserConfig } from './../../../config/user-config';
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
  returnUrl: string;
  loading = false;
  loginFailed = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {
    this.userForm = this.buildLoginForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {
  }

  private buildLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.pattern(UserConfig.validUsername),
        Validators.minLength(UserConfig.usernameMinLength)
      ]],
      password: ['']
    });
  }

  public onSubmit() {
    if (this.userForm.invalid) {
      return;
    } else {
      const username = this.userForm.get('username').value;
      const password = this.userForm.get('password').value;
      const loginResponse = this.authenticationService.login(username, password);
      this.loading = true;
      loginResponse.subscribe(res => {
        this.loading = false;
        this.loginFailed = false;
        this.router.navigate([this.returnUrl]);
      },
      err => {
        console.log(err);
        this.loading = false;
        this.loginFailed = true;
      }
      );
    }
  }

  public isLoginFormValid(): boolean {
    return this.userForm.valid;
  }

  public isValidUsername(username: string): boolean {
    return !!username.match(UserConfig.validUsername);
  }

  public shouldDisplayUsernameRequirements(): boolean {
    return !this.userForm.valid && this.userForm.get('username').value.length >= UserConfig.usernameMinLength;
  }

  public loginIncorrect(): boolean {
    return this.loginFailed;
  }

  public register() {
    this.router.navigate(['/register']);
  }

}
