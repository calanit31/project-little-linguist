import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { HelpGameComponent } from './help-game/help-game.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MixedLettersComponent } from './mixed-letters/mixed-letters.component';
import { WordSorterComponent } from './word-sorter/word-sorter.component';
import { GameCardComponent } from './game-card/game-card.component';
import { WordSorterGameComponent } from './word-sorter-game/word-sorter-game.component';
import { MixedLettersGameComponent } from './mixed-letters-game/mixed-letters-game.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'category', component: CategoriesListComponent },
  { path: 'category/:id', component: CategoryFormComponent },
  { path: 'newcategory', component: CategoryFormComponent },
  { path: 'help', component: HelpGameComponent },
  { path: 'mixed-latters', component: MixedLettersComponent },
  { path: 'word-sorter', component: WordSorterComponent },
  { path: 'game', component: GameCardComponent },
  { path: 'word-sorter-game/:id', component: WordSorterGameComponent },
  { path: 'mixed-latters-game/:id', component: MixedLettersGameComponent },
];
