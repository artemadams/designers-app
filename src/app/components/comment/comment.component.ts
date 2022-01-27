import { Component, OnInit, Input } from '@angular/core';
import { Opinion } from 'src/app/models/Opinion';
import { Artist } from 'src/app/models/Artist';
import { ArtistId } from 'src/app/models/ArtistId';
import { Rating } from 'src/app/models/Rating';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() artist: Artist;
  @Input() comments: Opinion[];
  rating: Rating

  constructor() { }

  ngOnInit(): void {
  }
}
