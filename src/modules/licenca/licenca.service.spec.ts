import { Test, TestingModule } from '@nestjs/testing';
import { LicencaService } from './licenca.service';

describe('LicencaService', () => {
  let service: LicencaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicencaService],
    }).compile();

    service = module.get<LicencaService>(LicencaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
