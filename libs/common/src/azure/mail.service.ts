import { Injectable } from '@nestjs/common';

import { EmailClient } from '@azure/communication-email';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private client;
  private from =
    'DoNotReply@301efaea-ee86-472d-b76d-ae37192c6572.azurecomm.net';
  constructor(private readonly configService: ConfigService) {
    const connectionString = this.configService.get(
      'COMMUNICATION_SERVICES_CONNECTION_STRING',
    );
    this.client = new EmailClient(connectionString);
  }
  async sendMail(payload: { to: string; subject: string; html: string }) {
    const emailMessage = {
      senderAddress: this.from,
      content: {
        subject: payload.subject,
        html: payload.html,
      },
      recipients: {
        to: [{ address: payload.to }],
      },
    };

    const poller = await this.client.beginSend(emailMessage);
    const result = await poller.pollUntilDone();
    return result;
  }
}
