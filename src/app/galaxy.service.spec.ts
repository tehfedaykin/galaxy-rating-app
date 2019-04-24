import { TestBed } from '@angular/core/testing';

import { GalaxyService } from './galaxy.service';

describe('GalaxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalaxyService = TestBed.get(GalaxyService);
    expect(service).toBeTruthy();
  });
});
