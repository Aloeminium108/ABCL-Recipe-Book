'use strict';
import { Model } from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  class Recipe_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User_data, Rating_reviews }: { User_data: any, Rating_reviews: any }) {
        Recipe_data.belongsTo(User_data, {
            foreignKey: 'user_id',
            as: 'author'
        }),
        Recipe_data.hasMany(Rating_reviews, {
            foreignKey: 'recipe_id',
            as: 'reviews'
        })
    }
  }
  Recipe_data.init({
    recipe_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title:{
        type:  DataTypes.TEXT,
        allowNull: false
    },
    pic:{
        type:  DataTypes.TEXT,
        allowNull: true
    },
    description:{
        type:  DataTypes.TEXT,
        allowNull: false
    },
    recipe_content:{
        type:  DataTypes.TEXT,
        allowNull: false
    },
    prep_time_in_minutes:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cook_time_in_minutes:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_time_in_minutes:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    servings:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
    },
    avg_rating:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Recipe_data',
    tableName: 'Recipe_data',
    timestamps: false
  });
  return Recipe_data;
};