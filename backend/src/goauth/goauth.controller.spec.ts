import { Test, TestingModule } from '@nestjs/testing';
import { GoauthController } from './goauth.controller';

describe('GoauthController', () => {
  let controller: GoauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoauthController],
    }).compile();

    controller = module.get<GoauthController>(GoauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
