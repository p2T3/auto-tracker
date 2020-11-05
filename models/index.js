const Auto = require('./Auto');
const Owner = require('./Owner');
const Driver = require('./Driver');

Auto.belongsTo(Owner, {
    foreignKey: 'owner_id'
})

Auto.belongsTo(Driver, {
    foreignKey: 'driver_id'
})

Owner.hasMany (Auto, {
    foreignKey: 'owner_id'
})

Driver.hasMany (Auto, {
    foreignKey: 'driver_id'
})

module.exports = { Auto, Owner, Driver };