import { Test, TestingModule } from '@nestjs/testing';
import { GoauthService } from './goauth.service';

describe('GoauthService', () => {
  let service: GoauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoauthService],
    }).compile();

    service = module.get<GoauthService>(GoauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
