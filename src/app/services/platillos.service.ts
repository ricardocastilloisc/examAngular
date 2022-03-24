import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Meal } from '../interfaces/platillos/platilloRandom.interface';


@Injectable({
  providedIn: 'root',
})
export class PlatillosService {
  private host: string = environment.apiPrueba;

  constructor(private http: HttpClient) {}

  getMealRandom = ():Observable<Meal[]> => {
    return this.http
      .get(`${this.host}/random.php`)
      .pipe(map(({ meals }: any) => meals));
  };
}
