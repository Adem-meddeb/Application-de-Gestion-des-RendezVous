// auth.interceptor.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor
      ]
    });
    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should add authorization header', () => {
    // Mock
    localStorage.setItem('auth_token', 'test-token');
    const mockRequest = new HttpRequest('GET', '/test');
    const mockHandler: HttpHandler = {
      handle: req => {
        expect(req.headers.get('Authorization')).toBe('Bearer test-token');
        return of(null as any);
      }
    };

    // Test
    interceptor.intercept(mockRequest, mockHandler).subscribe();
  });

  it('should not add header when no token', () => {
    // Mock
    localStorage.removeItem('auth_token');
    const mockRequest = new HttpRequest('GET', '/test');
    const mockHandler: HttpHandler = {
      handle: req => {
        expect(req.headers.has('Authorization')).toBeFalse();
        return of(null as any);
      }
    };

    // Test
    interceptor.intercept(mockRequest, mockHandler).subscribe();
  });
});