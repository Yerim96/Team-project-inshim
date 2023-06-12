const userinfo = function (Sequelize, DataTypes) {
    return Sequelize.define(
        'userinfo',
        {
            userinfo_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            user_pw: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            user_name: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            user_country: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            user_salt: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        {
            tableName: 'userinfo',
            freezeTableName: true,
            timestamps: false
        }
    );
    //return userinfo;
}

module.exports = userinfo;