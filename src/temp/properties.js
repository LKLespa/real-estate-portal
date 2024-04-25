const properties = [
    {
        id: 1,
        title: 'Minature Room',
        type: 'Apartment',
        status: 'For sale',
        datePosted: new Date().toLocaleDateString(),
        installment: 'Month',
        price: '25000 FCFA',
        country: 'Cameroon',
        region: 'North West',
        city: 'Bamenda',
        address: 'Foncha Street',
        noRooms: 6,
        info: 'Parlour, Kitchen, 2 Rooms and a bathroom',
        amenities: ['Electricity', 'Water', 'Internet Services'],
        coordinates: {
            latitude: 129809823,
            longitude: 983208398,
        },
        postedBy: {
            name: 'Mbah Lesky',
            photo: '',
        }
    }
];

export default properties;