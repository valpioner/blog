import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  links$: Observable<ScullyRoute[]> = this.scully.available$;
  $blogPosts = this.scully.available$.pipe(
    map((routes) =>
      routes.filter(
        (route) =>
          route.route.startsWith('/blog/') && route.sourceFile.endsWith('.md')
      )
    )
  );

  constructor(private scully: ScullyRoutesService) {}

  ngOnInit() {
    this.links$.subscribe((links) => {
      console.log(links);
    });
  }
}
