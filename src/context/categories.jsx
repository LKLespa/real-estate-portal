const categories = [
    { 
        type: 'Property Type',
        categories: [
            {
                name: 'House',
                selected: false,
            },
            {
                name: 'Appartment',
                selected: false,
            },
            {
                name: 'Villa',
                selected: false,
            },
            {
                name: 'Commercial',
                selected: false,
            },
            {
                name: 'Land',
                selected: false,
            }
        ]
    },
    {
        type: 'Property Status',
        categories: [
            {
                name: 'Sale',
                selected: false,
            },
            {
                name: 'Rent',
                selected: false,
            },
            {
                name: 'Sold',
                selected: false,
            }
        ]
    },
    {
        type: 'Size',
        categories: [
            {
                name: 'Less than 1000 sq m',
                selected: false,
            },
            {
                name: '1000 - 5000 sq m',
                selected: false,
            },
            {
                name: '5000 - 15000 sq m',
                selected: false,
            },
            {
                name: '15000 + sq m',
                selected: false,
            }
        ]
    },
    {
        type: 'Price',
        categories: [
            {
                name: 'Less than 10,000 FCFA',
                selected: false,
            },
            {
                name: '10,000 FCFA - 25,000 FCFA',
                selected: false,
            },
            {
                name: '25,000 FCFA - 50,000 FCFA',
                selected: false,
            },
            {
                name: '50,000 FCFA - 100,000 FCFA',
                selected: false,
            },
            {
                name: '100,000 FCFA - 250,000 FCFA',
                selected: false,
            },
            {
                name: '250,000 FCFA +',
                selected: false,
            }
        ]
    }
]

export default categories;