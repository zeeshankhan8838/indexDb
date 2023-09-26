import { DataService } from './../index-db/sevices/data.service';
import { Component } from '@angular/core';
import { IUser } from 'src/index-db/index-db-interfaces/user.interface';
import { DBStores } from 'src/index-db/sevices/idb.store.model';
import { API_ENDPOINTS } from './constants/endpoints';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'indexdb-app';
  constructor(private dataService: DataService) {}
  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let user = (await this.dataService.getListAsync(
      DBStores.User.TableName,
      API_ENDPOINTS.user
    )) as IUser[];
    console.log(user);

    // let unit = (await this.dataService.getListAsync(
    //   DBStores.Unit.TableName,
    //   API_ENDPOINTS.unit
    // )) as IUser[];

    // console.log(unit);
  }
}
