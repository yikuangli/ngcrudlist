import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Contact } from "./contact";

@Injectable({
  providedIn: "root"
})
export class CrudService {
  private api_url = 'api/contacts';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient) {}

  getContact() {
    return this.http.get<Contact[]>(this.api_url);
  }
  deleteContact(id: number) {
    return this.http.delete<Contact>(`${this.api_url}/${id}`);
  }
  createContact(contact: Contact) {
    return this.http.post(this.api_url, contact);
  }
  updateEmployee(contact: Contact) {
    return this.http.put(this.api_url, contact);
  }
}
