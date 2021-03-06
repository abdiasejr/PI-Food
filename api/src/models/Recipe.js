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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: DataTypes.STRING,
      summary: {
        type: DataTypes.TEXT,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isHealthy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        defaultValue: "",
      }
    },
    {
      sequelize,
      tableName: "recipes",
    }
  );
};
