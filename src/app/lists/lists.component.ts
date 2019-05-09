import { Component, OnInit } from "@angular/core";
import { CrudService } from "../crud.service";
import { Contact } from "../contact";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CONTACTS } from "../fake-datas";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.css"]
})
export class ListsComponent implements OnInit {
  contacts: Contact[];
  btnflag: boolean = true;
  changingID;
  constructor(private formBuilder: FormBuilder, private service: CrudService) {}
  addForm: FormGroup;
  ngOnInit() {
    this.service.getContact().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
    this.addForm = this.formBuilder.group({
      name: ["", Validators.required],
      tel: ["", [Validators.required, Validators.pattern("^[0-9]+$")]]
    });
  }

  deleteContact(contact: Contact): void {
    this.service.deleteContact(contact.id).subscribe(data => {
      this.contacts = this.contacts.filter(u => u !== contact);
    });
  }
  editContact(contact: Contact): void {
    this.addForm = this.formBuilder.group({
      name: [contact.name, Validators.required],
      tel: [contact.tel, [Validators.required, Validators.pattern("^[0-9]+$")]]
    });
    this.btnflag = false;
    this.changingID = contact.id;
    this.deleteContact(contact);

    // this.router.navigate(["add-emp"]);
  }
  onSubmit() {
    this.service.createContact(this.addForm.value).subscribe(
      data => {
        window.scrollTo(0, 0);
        this.contacts.push(data as Contact);
      },
      error => {
        alert(error);
      }
    );
  }
  onUpdate() {
    this.service
      .createContact({
        id: this.changingID,
        name: this.addForm.value.name,
        tel: this.addForm.value.tel
      } as Contact)
      .subscribe(
        data => {
          window.scrollTo(0, 0);
          this.contacts.push(data as Contact);
          this.btnflag = true;
          this.addForm = this.formBuilder.group({
            name: ["", Validators.required],
            tel: ["", [Validators.required, Validators.pattern("^[0-9]+$")]]
          });
        },
        error => {
          alert(error);
        }
      );
  }
}
