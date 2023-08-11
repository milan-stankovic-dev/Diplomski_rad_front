import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoodsReceivedNote } from '../domain/GoodsReceivedNote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodsReceivedNoteService {
  private readonly apiUrl = "http://localhost:8080/api/v1/goods-received-note"

  constructor(private http:HttpClient){}

  insertNote(note:GoodsReceivedNote):Observable<GoodsReceivedNote>{
    return this.http.post<GoodsReceivedNote>(`${this.apiUrl}`, note)
  }
}
