import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { ExitConfirmationDialogComponent } from '../exit-confirmation-dialog/exit-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PointsGameComponent } from '../points-game/points-game.component';

@Component({
  selector: 'app-trivia-game',
  standalone: true,
  imports: [ExitConfirmationDialogComponent, PointsGameComponent],
  templateUrl: './trivia-game.component.html',
  styleUrl: './trivia-game.component.css',
})
export class TriviaGameComponent implements OnInit {
  category: Category | null = null;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.category = this.categoryService.getCatgoryById(+params['id']);
        console.log(this.category);
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
