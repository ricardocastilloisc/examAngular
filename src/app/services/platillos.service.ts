import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Meal } from '../interfaces/platillos/platilloRandom.interface';

@Injectable({
  providedIn: 'root',
})
export class PlatillosService {
  private host: string = environment.apiPrueba;

  constructor(private http: HttpClient) {}

  getMealRandom = (): Observable<Meal[]> => {
    return this.http
      .get(`${this.host}/random.php`)
      .pipe(map(({ meals }: any) => meals));
  };
  getMeals = (search = ''): Observable<Meal[]> => {
    let QueryParams = new HttpParams();
    QueryParams = QueryParams.append('s', search ? search : '');

    return this.http
      .get(`${this.host}/search.php`, {
        params: QueryParams,
      })
      .pipe(map(({ meals }: any) => meals));
  };
  getMealId = (id): Observable<Meal[]> => {
    let QueryParams = new HttpParams();
    QueryParams = QueryParams.append('i', id);

    return this.http
      .get(`${this.host}/lookup.php`, {
        params: QueryParams,
      })
      .pipe(map(({ meals }: any) => meals));
  };
}
