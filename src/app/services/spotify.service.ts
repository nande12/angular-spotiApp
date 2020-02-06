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
      'Authorization': 'Bearer BQA6kN6ZT25Jv6E5yh76LIrvKqljQjBxxAeAQI3AD7_ZysALF4RGadsNpzV4wybQaD51BiDaMbIZGp0XbEc'
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

  getTopTracks(id: string) {

    return this.getQuery(`artists/${id}/top-tracks?country=US`)
      .pipe(map((data: any) => {
        return data.tracks;
      }));

  }
}
