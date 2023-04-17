import { AppService } from '../application/app.service';
import { ConfigService } from '../config/config.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService(new ConfigService());
  });

  describe('generateMatrix', () => {
    it('should generate a 5x5 matrix', () => {
      const matrix = appService.generateMatrix(5);

      expect(matrix.length).toBe(5);
      expect(matrix[0].length).toBe(5);
    });

    it('should generate a 10x10 matrix', () => {
      const matrix = appService.generateMatrix(10);

      expect(matrix.length).toBe(10);
      expect(matrix[0].length).toBe(10);
    });

    it('should generate a 20x20 matrix', () => {
      const matrix = appService.generateMatrix(20);

      expect(matrix.length).toBe(20);
      expect(matrix[0].length).toBe(20);
    });
  });

  describe('isValidCoord', () => {
    it('should return true for valid coordinates', () => {
      const matrix = appService.generateMatrix(5);
      const visited = appService
        .generateMatrix(5)
        .map(() => new Array(5).fill(false));

      expect(appService.isValidCoord(0, 0, matrix, visited)).toBe(true);
      expect(appService.isValidCoord(4, 4, matrix, visited)).toBe(true);
    });

    it('should return false for out-of-bounds coordinates', () => {
      const matrix = appService.generateMatrix(5);
      const visited = appService
        .generateMatrix(5)
        .map(() => new Array(5).fill(false));

      expect(appService.isValidCoord(-1, 0, matrix, visited)).toBe(false);
      expect(appService.isValidCoord(0, -1, matrix, visited)).toBe(false);
      expect(appService.isValidCoord(5, 0, matrix, visited)).toBe(false);
      expect(appService.isValidCoord(0, 5, matrix, visited)).toBe(false);
    });

    it('should return false for visited coordinates', () => {
      const matrix = appService.generateMatrix(5);
      const visited = appService
        .generateMatrix(5)
        .map(() => new Array(5).fill(true));

      expect(appService.isValidCoord(0, 0, matrix, visited)).toBe(false);
      expect(appService.isValidCoord(4, 4, matrix, visited)).toBe(false);
    });
  });

  describe('findPath', () => {
    it('should find a path through the 5x5 matrix with 1 blocking object', () => {
      const configService = new ConfigService();
      configService.set('MATRIX_SIZE', '5');
      configService.set('NUM_OF_BO', '1');
      const appService = new AppService(configService);

      const result = appService.findPath();

      expect(result).toHaveProperty('result');
      expect(result).toHaveProperty('execution_time');
      expect(result.result[0].movingObjectCoordinate).toHaveLength(1);
      expect(result.result[0].blockingObjectCoordinates).toHaveLength(1);
      expect(result.result[0]).toHaveProperty('movingObjectCoordinate');
      expect(result.result[0]).toHaveProperty('blockingObjectCoordinates');
    });

    it('should find a path through the 5x5 matrix with 2 blocking object', () => {
      const configService = new ConfigService();
      configService.set('MATRIX_SIZE', '5');
      configService.set('NUM_OF_BO', '2');

      const appService = new AppService(configService);

      const result = appService.findPath();

      expect(result).toHaveProperty('result');
      expect(result).toHaveProperty('execution_time');
      expect(result.result[0].movingObjectCoordinate).toHaveLength(1);
      expect(result.result[0].blockingObjectCoordinates).toHaveLength(2);
      expect(result.result[0]).toHaveProperty('movingObjectCoordinate');
      expect(result.result[0]).toHaveProperty('blockingObjectCoordinates');
    });

    it('should find a path through the 5x5 matrix with 3 blocking object', () => {
      const configService = new ConfigService();
      configService.set('MATRIX_SIZE', '5');
      configService.set('NUM_OF_BO', '3');

      const appService = new AppService(configService);

      const result = appService.findPath();

      expect(result).toHaveProperty('result');
      expect(result).toHaveProperty('execution_time');
      expect(result.result[0].movingObjectCoordinate).toHaveLength(1);
      expect(result.result[0].blockingObjectCoordinates).toHaveLength(3);
      expect(result.result[0]).toHaveProperty('movingObjectCoordinate');
      expect(result.result[0]).toHaveProperty('blockingObjectCoordinates');
    });

    it('should find a path through the 10x10 matrix with 2 blocking object', () => {
      const configService = new ConfigService();
      configService.set('MATRIX_SIZE', '10');
      configService.set('NUM_OF_BO', '2');

      const appService = new AppService(configService);

      const result = appService.findPath();

      expect(result).toHaveProperty('result');
      expect(result).toHaveProperty('execution_time');
      expect(result.result[0].movingObjectCoordinate).toHaveLength(1);
      expect(result.result[0].blockingObjectCoordinates).toHaveLength(2);
      expect(result.result[0]).toHaveProperty('movingObjectCoordinate');
      expect(result.result[0]).toHaveProperty('blockingObjectCoordinates');
    });

    it('should find a path through the 10x10 matrix with 3 blocking object', () => {
      const configService = new ConfigService();
      configService.set('MATRIX_SIZE', '10');
      configService.set('NUM_OF_BO', '3');

      const appService = new AppService(configService);

      const result = appService.findPath();

      expect(result).toHaveProperty('result');
      expect(result).toHaveProperty('execution_time');
      expect(result.result[0].movingObjectCoordinate).toHaveLength(1);
      expect(result.result[0].blockingObjectCoordinates).toHaveLength(3);
      expect(result.result[0]).toHaveProperty('movingObjectCoordinate');
      expect(result.result[0]).toHaveProperty('blockingObjectCoordinates');
    });

    it('should find a path through the 10x10 matrix with 4 blocking object', () => {
      const configService = new ConfigService();
      configService.set('MATRIX_SIZE', '10');
      configService.set('NUM_OF_BO', '4');

      const appService = new AppService(configService);

      const result = appService.findPath();

      expect(result).toHaveProperty('result');
      expect(result).toHaveProperty('execution_time');
      expect(result.result[0].movingObjectCoordinate).toHaveLength(1);
      expect(result.result[0].blockingObjectCoordinates).toHaveLength(4);
      expect(result.result[0]).toHaveProperty('movingObjectCoordinate');
      expect(result.result[0]).toHaveProperty('blockingObjectCoordinates');
    });

    it('should find a path through the 20x20 matrix with 3 blocking object', () => {
      const configService = new ConfigService();
      configService.set('MATRIX_SIZE', '20');
      configService.set('NUM_OF_BO', '3');

      const appService = new AppService(configService);

      const result = appService.findPath();

      expect(result).toHaveProperty('result');
      expect(result).toHaveProperty('execution_time');
      expect(result.result[0].movingObjectCoordinate).toHaveLength(1);
      expect(result.result[0].blockingObjectCoordinates).toHaveLength(3);
      expect(result.result[0]).toHaveProperty('movingObjectCoordinate');
      expect(result.result[0]).toHaveProperty('blockingObjectCoordinates');
    });

    it('should find a path through the 20x20 matrix with 4 blocking object', () => {
      const configService = new ConfigService();
      configService.set('MATRIX_SIZE', '20');
      configService.set('NUM_OF_BO', '4');

      const appService = new AppService(configService);

      const result = appService.findPath();

      expect(result).toHaveProperty('result');
      expect(result).toHaveProperty('execution_time');
      expect(result.result[0].movingObjectCoordinate).toHaveLength(1);
      expect(result.result[0].blockingObjectCoordinates).toHaveLength(4);
      expect(result.result[0]).toHaveProperty('movingObjectCoordinate');
      expect(result.result[0]).toHaveProperty('blockingObjectCoordinates');
    });

    it('should find a path through the 20x20 matrix with 5 blocking object', () => {
      const configService = new ConfigService();
      configService.set('MATRIX_SIZE', '20');
      configService.set('NUM_OF_BO', '5');

      const appService = new AppService(configService);

      const result = appService.findPath();

      expect(result).toHaveProperty('result');
      expect(result).toHaveProperty('execution_time');
      expect(result.result[0].movingObjectCoordinate).toHaveLength(1);
      expect(result.result[0].blockingObjectCoordinates).toHaveLength(5);
      expect(result.result[0]).toHaveProperty('movingObjectCoordinate');
      expect(result.result[0]).toHaveProperty('blockingObjectCoordinates');
    });
  });
});
