import { Injectable } from '@nestjs/common';

// Services
import { ConfigService } from '../config/config.service';

// Contracts
import { SearchResult } from './app.contracts';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  /**
   * Generates matrix.
   * @param matrixSize - Matrix size.
   * @returns Generated matrix.
   */
  generateMatrix(matrixSize: number): number[][] {
    return new Array(matrixSize)
      .fill(0)
      .map(() => new Array(matrixSize).fill(0));
  }

  /**
   * Checks is cell valid (cell is in matrix or cell is visited)
   * @param row - Current row.
   * @param col - Current col.
   * @param matrix - Matrix
   * @param visited - Visited matrix.
   * @returns Bool of truth.
   */
  isValidCoord(
    row: number,
    col: number,
    matrix: number[][],
    visited: boolean[][],
  ): boolean {
    return (
      row >= 0 &&
      row < matrix.length &&
      col >= 0 &&
      col < matrix[0].length &&
      !visited[row][col]
    );
  }

  /**
   * Finds path thought matrix.
   * @returns Array of objects.
   */
  findPath(): SearchResult[] {
    const matrixSize = Number(this.configService.get('MATRIX_SIZE'));
    const matrix = this.generateMatrix(matrixSize);

    const startRow = Number(this.configService.get('START_ROW'));
    const startCol = Number(this.configService.get('START_COL'));
    const numberOfBlockingObjects = Number(this.configService.get('NUM_OF_BO'));

    matrix[startRow][startCol] = 2; // Mark the start cell with the value 2

    const visited: boolean[][] = new Array(matrix.length)
      .fill(false)
      .map(() => new Array(matrix[0].length).fill(false));

    const path: number[][] = [];

    // Initialize the blocking object coordinates
    const blockingObjectsCoordinates: number[][][] = [];
    const blockingObjectsCoordinatesTemp: number[][] = [];
    const result: SearchResult[] = [];

    this.dfs(
      matrix,
      visited,
      startRow,
      startCol,
      matrix.length - 1,
      matrix[0].length - 1,
      numberOfBlockingObjects,
      path,
      blockingObjectsCoordinates,
      blockingObjectsCoordinatesTemp,
      result,
    );

    return result;
  }

  /**
   * DFS algorithm
   * @param matrix - Matrix.
   * @param visited - Matrix with visited cells.
   * @param startRow - Start row.
   * @param startCol - Start col.
   * @param destRow - Destination row.
   * @param destCol - Destination col.
   * @param numberOfBlockingObjects - Number of blocking objects.
   * @param path - Path from start to end.
   * @param blockingObjectsCoordinates - Blocking object coordinates.
   * @param blockingObjectsCoordinatesTemp - Blocking object coordinates - Temp variable
   * @param result - Result
   * @returns Boolean of truth
   */
  dfs(
    matrix: number[][],
    visited: boolean[][],
    startRow: number,
    startCol: number,
    destRow: number,
    destCol: number,
    numberOfBlockingObjects: number,
    path: number[][],
    blockingObjectsCoordinates: number[][][],
    blockingObjectsCoordinatesTemp: number[][],
    result: SearchResult[],
  ): boolean {
    // If the current cell is out of bounds or has already been visited, return false
    if (!this.isValidCoord(startRow, startCol, matrix, visited)) {
      return false;
    }

    // If the current cell is a blocking object, return false
    if (matrix[startRow][startCol] === 1) {
      return false;
    }

    // If the current cell is the destination, add it to the path and return true
    if (startRow === destRow && startCol === destCol) {
      path.push([startRow, startCol]);
      return true;
    }

    // Mark the current cell as visited and add it to the path
    visited[startRow][startCol] = true;
    path.push([startRow, startCol]);

    for (const blockingObject of blockingObjectsCoordinatesTemp) {
      matrix[blockingObject[0]][blockingObject[1]] = 0;
      visited[blockingObject[0]][blockingObject[1]] = false;
    }

    blockingObjectsCoordinatesTemp = [];

    // Generate n blocking objects
    for (let i = 0; i < numberOfBlockingObjects; i++) {
      let blockingObjectRow: number;
      let blockingObjectCol: number;
      do {
        // Randomly select a cell
        blockingObjectRow = Math.floor(Math.random() * matrix.length);
        blockingObjectCol = Math.floor(Math.random() * matrix[0].length);
      } while (
        (blockingObjectRow === startRow && blockingObjectCol === startCol) || // Avoid the current cell
        (blockingObjectRow === destRow && blockingObjectCol === destCol) || // Avoid the destination cell
        (blockingObjectRow === destRow &&
          blockingObjectCol === destCol - 1 &&
          visited[destRow - 1][destCol]) || // Avoid the cell [row,col-1]
        (blockingObjectRow === destRow - 1 &&
          blockingObjectCol === destCol &&
          visited[destRow][destCol - 1]) || //  Avoid the cell [row-1,col]
        visited[blockingObjectRow][blockingObjectCol] // Avoid cells that have already been visited
      );

      // Add the blocking object to the matrix and mark it as visited
      matrix[blockingObjectRow][blockingObjectCol] = 1;
      visited[blockingObjectRow][blockingObjectCol] = true;

      // Add the blocking object to the result
      blockingObjectsCoordinatesTemp.push([
        blockingObjectRow,
        blockingObjectCol,
      ]);
      blockingObjectsCoordinates.push(blockingObjectsCoordinatesTemp);
    }

    // Explore each neighboring cell in the order of up, right, down, left
    const directions: number[][] = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    for (let i = 0; i < directions.length; i++) {
      const [dRow, dCol] = directions[i];
      if (
        this.dfs(
          matrix,
          visited,
          startRow + dRow,
          startCol + dCol,
          destRow,
          destCol,
          numberOfBlockingObjects,
          path,
          blockingObjectsCoordinates,
          blockingObjectsCoordinatesTemp,
          result,
        )
      ) {
        result.push({
          movingObjectCoordinate: path,
          blockingObjectCoordinates: blockingObjectsCoordinatesTemp,
        });
        // If a path is found from the current cell to the destination, return true
        return true;
      }
    }

    // Return false to indicate that no path is found from the current cell to the destination
    path.pop();
    return false;
  }
}
