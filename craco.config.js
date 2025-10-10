module.exports = {
  webpack: {
    configure: (config) => {
      // Меняем точку входа — теперь виджет
      config.entry = "./src/widget.js";

      // Название выходного файла
      config.output.filename = "furniture-calculator.js";

      // Делаем глобальную библиотеку
      config.output.library = "FurnitureCalculator";
      config.output.libraryTarget = "umd";

      // 👇 Эта строка нужна, чтобы глобальный объект корректно создавался и в браузере, и в Node
      config.output.globalObject = "this";

      // Чтобы всё было в одном файле
      config.optimization.splitChunks = false;
      config.optimization.runtimeChunk = false;

      return config;
    },
  },
};