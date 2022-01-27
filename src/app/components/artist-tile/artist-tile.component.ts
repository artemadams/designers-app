import { Component, OnInit, Input } from '@angular/core';
import { Artist } from 'src/app/models/Artist';
import { JoinedNetwork } from 'src/app/models/JoinedNetwork';

@Component({
  selector: 'app-artist-tile',
  templateUrl: './artist-tile.component.html',
  styleUrls: ['./artist-tile.component.scss'],
})
export class ArtistTileComponent implements OnInit {
  @Input() artists: Artist[] = [];
  @Input() noresults: boolean = false;
  @Input() artist?: Artist;
  @Input() isMultiple: boolean = false;
  @Input() ratingAvg: number;

  joindate: any;

  constructor() {}

  convertDate(date: JoinedNetwork) {
    return date.toString().split('T').shift();
  }

  artistImage(artist: Artist) {
    return artist.image.split('?')[0];
  }

  getDate(date: string) {
    const newdate = date.match(/\/Date\((\d+)\)\//);
    return (this.joindate = newdate
      ? new Date(+newdate[1]).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
        })
      : date);
  }

  ngOnInit(): void {}
}
