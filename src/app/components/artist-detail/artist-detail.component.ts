import { Component, Input, OnInit } from '@angular/core';
import { ArtistsService } from 'src/app/services/artists.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from 'src/app/services/rating.service';
import { CommentsService } from 'src/app/services/comments.service';
import { Opinion } from 'src/app/models/Opinion';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {
  artist: any;
  @Input() isList: boolean = true;
  isMultiple: boolean = false;
  ratingAvg: any;
  artistId: number;
  comments: Opinion[];
  isLoading: boolean = false;
  
  constructor(
    private artistsService: ArtistsService,
    private route: ActivatedRoute,
    private ratingService: RatingService,
    private commentsService: CommentsService
  ) { }

  getAvgRating(id: number) {
    this.ratingService.getRating({_id: id})
    .valueChanges  
    .subscribe(({ data, loading }) => {
      let rating = data.rating;
      this.ratingAvg = rating.ratingAvg;
      console.log(JSON.stringify(data), 'get rating data')
    });
  }

  getComments(id: number) {
    this.commentsService.getComments(id)
    .valueChanges  
    .subscribe(({ data, loading }) => {
      this.isLoading = true;
      this.comments = data.allOpinionsResolver;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    console.log(this.route.params, 'params');
    this.route.params
      .pipe(map(artist => artist.slug))
      .subscribe(slug => {
        this.artistsService.getArtistSlug(slug)
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.artist = data.artist;
          this.artistId = this.artist.artist_id;
          this.getAvgRating(this.artistId);
          this.getComments(this.artistId);
        });
      });
  }
}
