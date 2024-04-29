const propertyTypes = [
    {name: 'Family home', type: 'building', id: 'family-house'},
    {name: 'Appartment', type: 'building', id: 'appartment'},
    {name: 'Villa', type: 'building', id: 'villa'},
    {name: 'Commercial', type: 'building', id: 'commercial'},
    {name: 'Land', type: 'land', id: 'land'},
    {name: 'Condo', type: 'building', id: 'condo'},
    {name: 'Warehouse', type: 'building', id: 'warehouse'},
    {name: 'Sports-arena', type: 'land', id: 'sports-arena'},
    {name: 'Resorts', type: 'building', id: 'resorts'},
    {name: 'Church', type: 'building', id: 'church'}
]

const installmentFrequencies = [
    {name: 'hourly'},
    {name: 'daily'},
    {name: 'weekly'},
    {name: 'monthly'},
    {name: 'yearly'},
]

const propertyStatuses = [
    {name: 'Rent', available: true, type: 'rent', text: 'This property is for rent' },
    {name: 'Rented Out', available: false, type: 'rent', text: 'This property has been rented out'},
    {name: 'Sale', available: true, type: 'sale', text: 'This property is for sale'},
    {name: 'Sale Out', available: false, type: 'sale', text: 'This property has been sold out'},
]

export { propertyTypes, installmentFrequencies, propertyStatuses }