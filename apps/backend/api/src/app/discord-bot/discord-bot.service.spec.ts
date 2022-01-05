import { Test } from '@nestjs/testing';
import { DiscordBotService } from './discord-bot.service';

describe('DiscordBotService', () => {
  let service: DiscordBotService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DiscordBotService],
    }).compile();

    service = module.get(DiscordBotService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it("Should return bot instance", () => {
    const bot = service.getBot();

    expect(bot).toBeDefined();
  });
});
