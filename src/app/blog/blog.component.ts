import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit {
  constructor(private scully: ScullyRoutesService) {}

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
