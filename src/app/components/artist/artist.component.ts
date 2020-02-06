import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent implements OnInit {

  theArtist: any = {};
  loadingArtist: boolean = true;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService ) {
    this.router.params.subscribe(params => {

      this.getArtist( params['id'] );

    });
  }

  getArtist( id:string ) {

    this.spotify.getArtist( id )
      .subscribe( artist => {
        console.log(artist);
        this.theArtist = artist;
        this.loadingArtist = false;
      });
  }

  ngOnInit() {
  }


}
