import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { ExitConfirmationDialogComponent } from '../exit-confirmation-dialog/exit-confirmation-dialog.component';

@Component({
  selector: 'app-mixed-letters-game',
  standalone: true,
  imports: [],
  templateUrl: './mixed-letters-game.component.html',
  styleUrl: './mixed-letters-game.component.css',
})
export class MixedLettersGameComponent implements OnInit {
  category: Category | null = null;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.category = this.categoryService.getCatgoryById(+params['id']);
      }
    });
  }

  exit() {
    const dialogRef = this.dialog.open(ExitConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate(['/game']);
      } else if (result === 'no') {
        //this.newGame();
      }
    });
  }
}
