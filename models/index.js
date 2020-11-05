const Auto = require('./Auto');
const Owner = require('./Owner');
const Driver = require('./Driver');

Auto.belongsTo(Owner, {
    foreignKey: 'owner_id'
})

Auto.belongsTo(Driver, {
    foreignKey: 'auto_id'
})

module.exports = { Auto, Owner, Driver };