import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  NavigationEnd,
  Event,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  url$: Observable<string>;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.url$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url)
    );
  }

  ngOnInit(): void {
    // this.router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationStart) {
    //     if (event.url === '/') {
    //       this.renderer.addClass(this.el.nativeElement, 'nav-absolute');
    //     } else {
    //       this.renderer.removeClass(this.el.nativeElement, 'nav-absolute');
    //     }
    //   }
    // });
  }
}
