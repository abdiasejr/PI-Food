const { DataTypes, Model } = require('sequelize');


module.exports = (sequelize) => {

    class Diet extends Model {}

    Diet.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        dietName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        sequelize,
        tableName: "diets",
    }); 
}