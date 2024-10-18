import { Test, TestingModule } from '@nestjs/testing';
import { LicencaController } from './licenca.controller';

describe('LicencaController', () => {
  let controller: LicencaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicencaController],
    }).compile();

    controller = module.get<LicencaController>(LicencaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
