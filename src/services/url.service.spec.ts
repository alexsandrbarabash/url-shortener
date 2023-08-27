import { UrlService } from './url.service';
import { UrlRepository } from '../models/url/url.repository';

const baseUrl = 'http://localhost:3000';

jest.mock('../config', () => ({
  appConfig: {
    ...jest.requireActual('../config').appConfig,
    baseUrl,
  },
}));

jest.mock('../models/url/url.repository');

describe('UrlService', () => {
  let getByNanoidSpy: jest.SpyInstance;

  beforeEach(() => {
    getByNanoidSpy = jest.spyOn(UrlService, 'getByNanoid');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUrl', () => {
    it('should return existing short URL if the URL already exists', async () => {
      const mockUrl = 'http://example.com';
      const mockNanoId = 'mockedId';

      (UrlRepository.findOne as jest.Mock).mockResolvedValueOnce({
        url: mockUrl,
        nanoId: mockNanoId,
      });

      const result = await UrlService.createUrl({ url: mockUrl });
      expect(result).toBe(`${baseUrl}/${mockNanoId}`);
    });

    it('should create new short URL if the URL does not exist', async () => {
      const mockUrl = 'http://newexample.com';

      (UrlRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

      const result = await UrlService.createUrl({ url: mockUrl });
      expect(UrlRepository.create).toHaveBeenCalled();
      expect(result).toContain(baseUrl);
    });
  });

  describe('getUrlByShort', () => {
    it('should return the original URL by the short one', async () => {
      const mockNanoId = 'mockedId';
      const mockUrl = 'http://example.com';

      (UrlService.getByNanoid as jest.Mock).mockResolvedValueOnce({
        url: mockUrl,
      });

      const result = await UrlService.getUrlByShort(
        `${baseUrl}/${mockNanoId}`,
      );
      expect(result).toBe(mockUrl);
    });
  });

  describe('getByNanoid', () => {
    it('should throw an error if URL is not found', async () => {
      const mockNanoId = 'notExistingId';

      (UrlRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

      await expect(UrlService.getByNanoid(mockNanoId)).rejects.toThrow(
        'Url not found',
      );
    });

    it('should return the URL if it exists', async () => {
      const mockNanoId = 'existingId';
      const mockUrl = 'http://example.com';

      (UrlRepository.findOne as jest.Mock).mockResolvedValueOnce({
        url: mockUrl,
      });

      const result = await UrlService.getByNanoid(mockNanoId);
      expect(result.url).toBe(mockUrl);
    });
  });
});
