const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Verdura = db.define('verdura', {
    verduras: {
        type: DataTypes.STRING(20)
    },
    qtde: {
        type: DataTypes.INTEGER()
    },
    preco_un:{
        type: DataTypes.FLOAT
    }
},{
    createdAt: false,
    updatedAt: false
})

// Verdura.sync({force:true})

module.exports = Verdura