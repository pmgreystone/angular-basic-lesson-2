import { CommonModule } from '@angular/common';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, ParamMap, RouterModule, RouterOutlet } from '@angular/router';
import { Params } from '@angular/router';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



interface VideoModel {
  id: String
  title: String
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  videoIdToUrl(id: String): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}?autoplay=0`)
  }

  searchIdEmpty(): Boolean {
    return this.searchId.length == 0
  }

  searchId: String = ""

  videoModels: VideoModel[] = [
    {id: "JvkX2_46gUY", title: "Angular v19 Developer Event"},
    {id: "vVIRu3-DDfE", title: "Angular v18 release recap"},
    {id: "PXNp4LENMPA", title: "Announcing Angular.dev"},
    {id: "O1TZD_w16NY", title: "Nullish Coalescing | #ngUpdate"},
    {id: "bavWOHZM6zE", title: "Introducing Angular DevTools"}
  ]

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: Params) => {
      const paramMap = params['params']
      if(paramMap && Object.keys(paramMap).includes('id')) {
        this.searchId = paramMap['id']
      } else {
        this.searchId = ""
      }
    })
  }
}