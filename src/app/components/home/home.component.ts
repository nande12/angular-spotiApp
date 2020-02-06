import { Component, OnInit } from '@angular/core';
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  newSongs: any[] = [];
  errorAlert: boolean;
  errorMessage: string;
  loading: boolean;


  constructor(private spotify: SpotifyService ) {

    this.loading = true;
    this.errorAlert = false;

    this.spotify.getNewReleases()
      .subscribe( (data:any) => {
        this.newSongs = data;
        this.loading = false;
      }, ( error )=> {
          this.errorAlert = true;
          this.loading = false;
          this.errorMessage = error.error.error.message;
      });

  }

  ngOnInit() {
  }

}
