import {
  Component,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { IContact } from 'src/app/shared/models/contacts';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { contactModel } from '@contacts/models/contact-labels';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styles: [
    `
    .table-container {
      max-height: 400px;
      overflow: auto;
    }
    `,
  ],
})
export class ContactsTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() contacts: IContact[] = [];
  tableColumnDef = [...contactModel];
  displayedColumns: string[] = [
    ...this.tableColumnDef.map(({ key }) => key),
    'actions',
  ];

  headerWidth = `${Math.ceil(100 / this.displayedColumns.length)}%`;
  dataSource = new MatTableDataSource<IContact>([]);

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  // set to false because under ng-if

  @Output()
  readonly deleteContact = new EventEmitter<IContact>();
  @Output()
  readonly editContact = new EventEmitter<IContact>();
  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.contacts;
    this.dataSource.sort = this.sort;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.contacts) {
      this.dataSource.data = this.contacts;
    }
  }
}
