import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService, TransferStateService } from '@scullyio/ng-lib';
import { combineLatest } from 'rxjs';
import { pluck, map } from 'rxjs/operators';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private scully: ScullyRoutesService,
    private transferStateService: TransferStateService
  ) {
    console.log(this.activatedRoute.snapshot);
  }

  blogPost$ = this.transferStateService.useScullyTransferState(
    'allPosts',
    combineLatest([
      this.activatedRoute.params.pipe(pluck('slug')),
      this.scully.available$,
    ]).pipe(
      map(([postId, routes]) =>
        routes.find((route) => route.route === `/blog/${postId}`)
      )
    )
  );

  // $blogPostMetadata = combineLatest([
  //   this.activatedRoute.params.pipe(pluck('postId')),
  //   this.scully.available$,
  // ]).pipe(
  //   map(([postId, routes]) =>
  //     routes.find((route) => route.route === `/blog/${postId}`)
  //   )
  // );
}
