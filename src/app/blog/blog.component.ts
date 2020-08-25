import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BlogComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scully: ScullyRoutesService
  ) {}

  $blogPosts = this.scully.available$.pipe(
    map((routes) =>
      routes.filter(
        (route) =>
          route.route.startsWith('/blog/') && route.sourceFile.endsWith('.md')
      )
    )
  );

  ngOnInit() {
    this.scully.available$.subscribe((routes) => console.log(routes));
  }
}
