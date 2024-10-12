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

      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus rerum odit doloremque nemo fugit tempore molestiae consectetur harum! ',
      price
    })
    await camp.save()
  }
}
seedDB().then(() => {

  mongoose.connection.close();
  console.log('We are closed! ')
})