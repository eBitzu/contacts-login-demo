import { of } from 'rxjs';

export class MatDialogRefMock {
  close() {
    return of(false);
  }
}
