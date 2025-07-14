export interface IStorageStrategy {
  /**
   * Загружает файл в хранилище.
   * @param file - Файл, полученный от Multer.
   * @param path - Путь или префикс для сохранения файла в хранилище.
   * @returns Объект с URL и ключом загруженного файла.
   */
  upload(
    file: Express.Multer.File,
    path: string,
  ): Promise<{ url: string; key: string }>;

  /**
   * Удаляет файл из хранилища.
   * @param key - Уникальный ключ файла в хранилище.
   */
  delete(key: string): Promise<void>;
} 