import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { LoginFormComponent } from './login-form/login-form.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '400px',
      autoFocus:true,
      disableClose: true
    });
  }

}
