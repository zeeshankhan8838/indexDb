import { TestBed } from '@angular/core/testing';

import { DexieCrudService } from './dexie-crud.service';

describe('DexieCrudService', () => {
  let service: DexieCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DexieCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
