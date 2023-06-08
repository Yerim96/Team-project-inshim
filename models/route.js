const route = function (Sequelize, DataTypes) {
    const Route = Sequelize.define(
        'route',
        {
            route_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            route_city: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            route_day: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            route_start: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        },
        {
            tableName: 'route',
            freezeTableName: true,
            timestamps: false
        }
    );

    return Route;
};

module.exports = route;