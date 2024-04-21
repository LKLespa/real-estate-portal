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
                name: 'For Sale',
                selected: false,
            },
            {
                name: 'For Rent',
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
                name: 'Less than 500 sqft',
                selected: false,
            },
            {
                name: '500 - 1000 sqft',
                selected: false,
            },
            {
                name: '1000 - 1500 sqft',
                selected: false,
            }
        ]
    },
    {
        type: 'Price',
        categories: [
            {
                name: 'Less than $500',
                selected: false,
            },
            {
                name: '$500 - $1000',
                selected: false,
            },
            {
                name: '$1000 - $1500',
                selected: false,
            }
        ]
    }
]

export default categories;