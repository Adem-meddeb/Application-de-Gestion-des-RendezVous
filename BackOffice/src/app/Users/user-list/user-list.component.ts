import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { User } from '../User.model';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: false,
})
export class UserListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'Status', 'actions'];
  dataSource: MatTableDataSource<User>;
  filters: { [key: string]: string } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) {
    this.dataSource = new MatTableDataSource(this.userService.getUsers());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const filterObject = JSON.parse(filter);
      return Object.keys(filterObject).every(key => {
        if (!filterObject[key]) return true;
        const value = data[key as keyof User]?.toString().toLowerCase();
        return value?.includes(filterObject[key].toLowerCase());
      });
    };
  }

  applyFilter(value: string, column: string): void {
    this.filters[column] = value;
    this.dataSource.filter = JSON.stringify(this.filters);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId);
    this.refreshDataSource();
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '600px',
      data: { user: { ...user } }
    });

    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        this.userService.updateUser(updatedUser);
        this.refreshDataSource();
      }
    });
  }

  private refreshDataSource(): void {
    this.dataSource.data = this.userService.getUsers();
    this.dataSource._updateChangeSubscription();
  }
}