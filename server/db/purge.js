const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/HTC-Fitness');

mongoose.connection.on('open', async () => {

  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  } catch (error) {
    console.error(`Error on database purge:`, error)
  }
  
})