import { TestBed } from '@angular/core/testing';

import { ProfileDoctorService } from './profile-doctor.service';

describe('ProfileDoctorService', () => {
  let service: ProfileDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
