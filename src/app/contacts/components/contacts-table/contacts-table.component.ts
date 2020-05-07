import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { contactFields, IKeyLabel, IContact } from 'src/app/shared/models/contacts';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styles: [
  ]
})
export class ContactsTableComponent implements OnInit, OnChanges {
  @Input() contacts: IContact[] = [];
  tableColumnDef: IKeyLabel[] = [
    {
      key: contactFields.ID,
      label: 'ID'
    },
    {
      key: contactFields.FIRST_NAME,
      label: 'First Name'
    },
    {
      key: contactFields.LAST_NAME,
      label: 'Last Name'
    },
    {
      key: contactFields.PHONE_NUMBER,
      label: 'Phone Number'
    },
    {
      key: contactFields.EMAIL,
      label: 'Email'
    }
  ];
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
