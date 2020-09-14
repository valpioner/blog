import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ScullyRoute,
  ScullyRoutesService,
  TransferStateService,
  isScullyGenerated,
} from '@scullyio/ng-lib';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  links$: Observable<ScullyRoute[]> = this.scully.available$;
  blogPosts$: Observable<any>;
  tags = ['Саморозвиток', 'Освіта', 'Особисте', 'Подорожі', 'ІТ', 'Гроші'];

  constructor(
    private scully: ScullyRoutesService,
    private transferStateService: TransferStateService
  ) {
    this.blogPosts$ = this.transferStateService.useScullyTransferState(
      'blogPostRoutes',
      this.scully.available$.pipe(
        map((routes) =>
          routes.filter(
            (route) =>
              route.route.startsWith('/blog/') &&
              route.sourceFile.endsWith('.md')
          )
        )
      )
    );
  }

  ngOnInit() {
    this.links$.subscribe((links) => {
      console.log(links);
    });
  }
}
