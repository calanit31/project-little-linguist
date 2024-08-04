import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-word-sorter-game',
  standalone: true,
  imports: [],
  templateUrl: './word-sorter-game.component.html',
  styleUrl: './word-sorter-game.component.css'
})
export class WordSorterGameComponent implements OnInit {
  category: Category | null = null;

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.category = JSON.parse(params['category']);
      console.log('Received category:', this.category);
    } else {
      console.log('No category received');
    }
  });
}
}