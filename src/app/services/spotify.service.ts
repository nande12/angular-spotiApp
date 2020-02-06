import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log('Spotify service listo');
  }

  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDCEltqKAcilz6Jw-ShGUppxVY2CzOH-P7EIw-XE3zCPRSVWKO6Zr9C6begFcuxolEhNW0VLVjNofWKZ_8'
    });

    return this.http.get(url, { headers })

  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map((data: any) => {
        return data.albums.items;
      }));
  }

  getArtists(term:string) {

    return this.getQuery(`search?q=${ term }&type=artist&limit=16`)
      .pipe(map((data: any) => {
        return data.artists.items;
      }));

  }

  getArtist(id: string) {

    return this.getQuery(`artists/${ id }`);
      // .pipe(map((data: any) => {
      //   return data.artists.items;
      // }));

  }
}
