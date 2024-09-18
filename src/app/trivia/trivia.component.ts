import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css',
})
export class TriviaComponent implements OnInit {
  private category: Category | null = null;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.categoryService.getCatgoryById(params['id'])
      }
    });
  }
}
