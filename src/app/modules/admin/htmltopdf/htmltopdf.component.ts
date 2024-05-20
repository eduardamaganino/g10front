import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HtmltopdfService } from './htmltopdf.service';

@Component({
  selector: 'app-htmltopdf',
  templateUrl: './htmltopdf.component.html',
  styleUrls: ['./htmltopdf.component.scss']
})
export class HtmltopdfComponent implements OnInit{

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;

  constructor(private htmltopdfService: HtmltopdfService,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
  }

  saveHtml(): void {
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', imageBlob);

    this.htmltopdfService.transformar(file).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }


}
