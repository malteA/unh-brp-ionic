import { Injectable } from '@angular/core';
import { DirectionForecast } from "../models/direction-forecast";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class DirectionForecastService {

  private forecastURL = "http://localhost:3000/forecast";

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getForecastData(): Observable<DirectionForecast> {
    return this.http.get<DirectionForecast>(this.forecastURL)
      .pipe(
        tap(forecast => this.log("fetched forecast")),
        catchError(this.handleError("getForecastData", null))
      );
  }

  private log(message: string) {
    this.messageService.add(`DirectionForecastService: ${message}`);
  }

  private handleError<T> (operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
