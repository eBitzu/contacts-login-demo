import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IContact } from 'src/app/shared/models/contacts';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { contactModel } from '@contacts/models/contact-labels';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styles: [
  ]
})
export class ContactsTableComponent implements OnInit, OnChanges {
  @Input() contacts: IContact[] = [];
  tableColumnDef = [...contactModel];
  displayedColumns: string[] = this.tableColumnDef.map(({key}) => key);
  dataSource = new MatTableDataSource<IContact>([]);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.contacts;
    this.dataSource.sort = this.sort;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.contacts) {
      this.dataSource.data = this.contacts;
    }
  }

}
