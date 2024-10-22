const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const { transcode } = require('buffer');


mongoose.connect('mongodb://localhost:27017/yelp-camp')
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error.bind(console, "connection error:"));


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      author: '6715420939b602d010a9f694',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus rerum odit doloremque nemo fugit tempore molestiae consectetur harum! ',
      price,
      images: [
        {
          url: 'https://console.cloudinary.com/pm/c-f41094f65f8c8e7171c4ccea89b170/media-explorer?assetId=22882b3014c9e0a58611f235b3bc56f2',
          filename: 'xogqwuqndb4a9jwnufsh'
        },
        {
          url: 'https://console.cloudinary.com/pm/c-f41094f65f8c8e7171c4ccea89b170/media-explorer?assetId=f3eaa25c1e861cc11ab67164110fc599',
          filename: 'cld-sample-5'
        }
      ]
    })
    await camp.save()
  }
}
seedDB().then(() => {

  mongoose.connection.close();
  console.log('We are closed! ')
})