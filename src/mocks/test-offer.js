export const testOffer = {
  id: 1,
  isPremium: true,
  isFavourite: false,
  previewImage: `img/apartment-03.jpg`,
  pictures: [
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
    `img/apartment-03.jpg`,
    `img/room.jpg`,
    `img/studio-01.jpg`,
    `img/studio-photos.jpg`],
  amenities: [`Wifi`, `Heating`, `Kitchen`, `Cable TV`],
  bedrooms: 4,
  maxGuestsNumber: 5,
  description: `This cozy and complete apartment in the heart of New York is a typical, traditional and authentic feel for how New Yorkers live. I welcome all guests to stay at this place during their stay and visit of New York. 
  Please note that this apartment is on the sixth floor and there is no lift (elevator).
  The apartment is convenient for all guests, fitted with a kitchen, small dining area and two bedrooms – couples and groups of friends will find this accommodation most optimal.`,
  host: {
    photo: `img/avatar-angelina.jpg`,
    name: `Angelina Jonson`,
    super: true
  },
  price: 180,
  rating: 5,
  cardTitle: `Beautiful & luxurious apartment at great location`,
  offerType: `House`,
  coordinates: [48.856663, 2.351556],
  city: {
    zoom: 8,
    coordinates: [48.856663, 2.351556],
  },
  location: {
    zoom: 8,
  },
  reviews: [
    {
      id: 1,
      author: {
        photo: `img/avatar-angelina.jpg`,
        name: `Strange jober`
      },
      description: `small dining area and two bedrooms – couples and groups of friends will find this accommodation`,
      date: 1593095836000,
      rating: 3
    },
    {
      id: 2,
      author: {
        photo: ``,
        name: `Slava`
      },
      description: `dining area and five bedrooms – couples and groups of friends will find this accommodation`,
      date: 1593095936000,
      rating: 4.7
    },
  ],

};
