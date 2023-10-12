import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ChatBotModule } from './app/chatbot.module';


platformBrowserDynamic().bootstrapModule(ChatBotModule)
  .catch(err => console.error(err));
