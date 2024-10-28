const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB using MongoClient
const client = new MongoClient(mongoURI);

let db;

client.connect()
  .then(() => {
    console.log('MongoDB connected');
    db = client.db(); // Initialize the database

    // Middleware to parse JSON bodies
    app.use(express.json());

    // Enable CORS
    app.use(cors());

    // Route to handle POST request to save machine details
    app.post('/api/machines', async (req, res) => {
      const { hospitalName, machineName, equipmentMake } = req.body;

      try {
        const result = await db.collection('equipmentmakes').insertOne({
          hospitalName,
          machineName,
          equipmentMake,
        });

        if (result.insertedCount === 1) {
          const savedMachine = {
            _id: result.insertedId,
            hospitalName,
            machineName,
            equipmentMake,
          };
          return res.status(201).json(savedMachine);
        } else {
          console.error('Error saving machine:', result);
          return res.status(500).json({ error: 'Error saving machine' });
        }
      } catch (err) {
        console.error('Error saving machine:', err);
        return res.status(500).json({ error: 'Error saving machine' });
      }
    });

    // Route to get all machines
    app.get('/api/machines', async (req, res) => {
      try {
        const machines = await db.collection('equipmentmakes').find({}).toArray();
        res.json(machines);
      } catch (err) {
        console.error('Error fetching machines:', err);
        res.status(500).json({ error: 'Error fetching machines' });
      }
    });

    // Route to delete a machine by ID
    app.delete('/api/machines/:id', async (req, res) => {
      const { id } = req.params;

      try {
        const result = await db.collection('equipmentmakes').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
          return res.status(200).json({ message: 'Machine deleted successfully' });
        } else {
          return res.status(404).json({ error: 'Machine not found' });
        }
      } catch (err) {
        console.error('Error deleting machine:', err);
        return res.status(500).json({ error: 'Error deleting machine' });
      }
    });

    // Route to update a machine by ID
    app.put('/api/machines/:id', async (req, res) => {
      const { id } = req.params;
      const { hospitalName, machineName, equipmentMake } = req.body;

      try {
        const result = await db.collection('equipmentmakes').updateOne(
          { _id: new ObjectId(id) },
          { $set: { hospitalName, machineName, equipmentMake } }
        );

        if (result.modifiedCount === 1) {
          return res.status(200).json({ message: 'Machine updated successfully' });
        } else {
          return res.status(404).json({ error: 'Machine not found' });
        }
      } catch (err) {
        console.error('Error updating machine:', err);
        return res.status(500).json({ error: 'Error updating machine' });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process with failure
  });
