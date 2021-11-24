const { DataTypes, Model } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  class Recipe extends Model {}

  Recipe.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      recipeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: DataTypes.STRING,
      summary: {
        type: DataTypes.TEXT,
      }
    },
    {
      sequelize,
      tableName: "recipes",
    }
  );
};
