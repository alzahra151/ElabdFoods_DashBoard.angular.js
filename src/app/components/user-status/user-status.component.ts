import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent {
  listOfUsers: User[] = []
  SelectedItem: User = {} as User
  EditItem: User = {} as User
  DeletedItem: User = {} as User
  waiting = true
  UserInfo: any
  activateItem: User = {} as User
  error = false
  Success = false
  text = ''

  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.Setwaiting()
    this.GetAllUsers()
    this.GetAllUserInfo()

  }

  GetAllUsers() {
    this.api.get('User').subscribe({
      next: (data) => {
        const arr: any = data
        this.listOfUsers = arr
        console.log(this.listOfUsers);

      },
      error: (err) => {
        this.error = true
      }
    })
  }
  GetAllUserInfo() {
    this.api.get('User/UserInfo').subscribe({
      next: (data) => {
        this.UserInfo = data
      },
      error: (err) => {
        this.error = true
      }
    })
  }
  Edit(FirstName: string, LastName: string, Email: string) {
    const UpdateObj = { FirstName, LastName, Email }
    this.api.put(`User/${this.EditItem._id}`, UpdateObj).subscribe({
      next: (data) => {
        this.ngOnInit()
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'SubCategorie Edited Successfully',
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect Data Try Again',
        })
      }
    })
  }
  Delete() {
    this.api.delete(`User/${this.DeletedItem._id}`).subscribe({
      next: (data) => {
        this.ngOnInit()
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'SubCategorie Deleted Successfully',
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect Data Try Again',
        })
      }
    })
  }

  Setwaiting() {
    setTimeout(() => {
      this.waiting = false
    }, 1000)
  }

  Diactivate() {
    this.api.put('User/Active/' + this.activateItem._id, {}).subscribe({
      next: (data) => {

        if (data.toString() == "Can't DiActivate Admin") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Incorrect Data Try Again',
          })
        }
        else {
          this.ngOnInit()
          Swal.fire({
            icon: 'success',
            title: 'Done...',
            text: data.toString(),
          })
        }

      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect Data Try Again',
        })
      }
    })
  }
}
