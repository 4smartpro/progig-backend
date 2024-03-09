import { Test, TestingModule } from '@nestjs/testing';
import { GigResolver } from './gig.resolver';
import { GigService } from './gig.service';

describe('GigResolver', () => {
  let resolver: GigResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GigResolver, GigService],
    }).compile();

    resolver = module.get<GigResolver>(GigResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
