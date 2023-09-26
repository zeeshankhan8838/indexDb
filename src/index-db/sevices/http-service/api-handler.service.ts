import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { flatten } from 'lodash';

import {
  IApiBaseActions,
  IApiBaseResponse,
  ParamsType,
} from 'src/app/interfaces/api-base-action.interface';
import { ResponseMessages } from 'src/app/constants/response-message';
import { ChunkLoadStrategy } from 'src/index-db/index-db-interfaces/api-base-response.interface';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService implements IApiBaseActions {
  constructor(public httpClient: HttpClient) {}

  Get(url: string, params?: ParamsType) {
    return this.httpClient
      .get<IApiBaseResponse>(url, { params: this.createParams(params) })
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  GetAll(url: string, params?: ParamsType) {
    return this.httpClient
      .get<IApiBaseResponse>(url, { params: this.createParams(params) })
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  Post(url: string, data: any, params?: ParamsType) {
    return this.httpClient
      .post<IApiBaseResponse>(url, data, { params: this.createParams(params) })
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  Delete(url: string, data: any, params?: ParamsType) {
    return this.httpClient
      .delete<IApiBaseResponse>(url, { params: this.createParams(params) })
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  Put(url: string, data: any, params?: ParamsType) {
    return this.httpClient
      .put<IApiBaseResponse>(url, data, { params: this.createParams(params) })
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  HandleResponse(response: any) {
    if (response.Status === 500) {
      alert(ResponseMessages.serverError);
    }
  }

  createParams(params?: ParamsType) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.append(key, value);
      });
    }
    return httpParams;
  }

  async GetAllChunks(url: string, chunkLoadStrategy: ChunkLoadStrategy) {
    let totalRecords = (
      await this.httpClient
        .get<IApiBaseResponse>(chunkLoadStrategy.countEndPoint)
        .toPromise()
    )?.response as number;
    if (totalRecords <= chunkLoadStrategy.limit) {
      return this.GetAll(url)?.toPromise();
    } else {
      let apiCalls: Observable<IApiBaseResponse>[] = [];
      let start = 0;
      while (start < totalRecords) {
        apiCalls.push(
          this.httpClient.get<IApiBaseResponse>(
            `${url}?limit=${chunkLoadStrategy.limit}&offset=${start}`
          )
        );
        start += chunkLoadStrategy.limit;
      }
      return {
        success: true,
        status: true,
        response: flatten(
          (await forkJoin(apiCalls)?.toPromise())?.map((x) => x.response)
        ),
      } as IApiBaseResponse;
    }
  }
}
