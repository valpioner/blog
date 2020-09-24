import { DOCUMENT } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  Renderer2,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScullyRoutesService, TransferStateService } from '@scullyio/ng-lib';
import { combineLatest } from 'rxjs';
import { pluck, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private scully: ScullyRoutesService,
    private transferStateService: TransferStateService,
    private router: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  public ngOnInit() {
    this.activatedRoute.params
      .pipe(take(1), pluck('slug'))
      .subscribe((slug) => {
        this.addDiscusScript(slug);
      });
  }

  addDiscusScript = function (slug: string) {
    let script = this._renderer2.createElement('script');
    script.setAttribute('data-timestamp', +new Date());
    script.src = 'https://valpioner.disqus.com/embed.js';
    script.text = `
      var disqus_config = function () {
        this.page.url = ${
          this._document.URL.split('?')[0]
        };  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = ${slug}; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
    `;
    this._renderer2.appendChild(this._document.body, script);
  };

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
