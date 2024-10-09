import { Test, TestingModule } from '@nestjs/testing';
import { PasswordServiceService } from './password-service.service';

describe('PasswordServiceService', () => {
  let service: PasswordServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordServiceService],
    }).compile();

    service = module.get<PasswordServiceService>(PasswordServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
