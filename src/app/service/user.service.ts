import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IUser } from '../interface/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient);
  baseUrl: string = "https://peticiones.online/api/users";


  constructor() { }

  // getAll(): Promise<IUser[]> {
  //   return lastValueFrom(
  //     this.httpClient.get<{results: IUser[]}>(this.baseUrl)
  //   ).then(response => response.results ); 
  // }

  // getTotalUsers(): Observable<number> {
  //   return this.httpClient.get<number>(this.baseUrl + "/total");
  // }

    //Page empieza en 0
    getAllUsers(page: number, itemPerPage: number): Observable<IUser[]> {
      console.log(this.baseUrl + "?page=" + page + "&size=" + itemPerPage);
      return this.httpClient.get<IUser[]>(this.baseUrl + "?page=" + page + "&size=" + itemPerPage);
    }





  getById(_id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`));
  }

  deleteById(_id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${_id}`));
  }

  insertUsuario(usuario: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, usuario));
  }

  updateUsuario(usuario: IUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${usuario._id}`, usuario));
  }
}
