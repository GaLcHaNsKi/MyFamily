import { defineConfig } from 'prisma-merge';

export default defineConfig({
  schema: {
    input: './prisma/models',   // Папка, где лежат все .prisma модули
    output: './prisma/schema.prisma', // Основной файл, который будет собираться
    noBase: true,
  },
});
