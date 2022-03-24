import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPlatilloRandomComponent } from './dialog-platillo-random/dialog-platillo-random.component';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  width;
  height;

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {


    const dialogRef = this.dialog.open(DialogPlatilloRandomComponent);


  }

  getUserName = (): string => {
    const { lastname, name } = this.authService.getUser();
    return lastname + ' ' + name;
  };
  onResize(event) {
    const innerWidth = event.target.innerWidth;
    const innerHeight = event.target.innerHeight;

    this.width = innerWidth;
    this.height = innerHeight;
  }
}
