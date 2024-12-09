import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  async createPaymentIntent(amount: number, userId: number): Promise<{ data: { clientSecret: string } }> {
    return firstValueFrom(
      this.http.post<{ data: { clientSecret: string } }>(`${this.apiUrl}/create-intent`, {
        amount,
        userId,
      })
    );
  }
}
