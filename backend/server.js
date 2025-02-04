const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/event', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the event schema
const eventSchema = new mongoose.Schema({
  name: String,
  nature: String,
  date: String,
  introduction: String,
  objective: String,
  beneficiaries: String,
  guests: String,
  description: String,
  photographs: String,
  brochure: String,
  schedule: String,
  attendance: String,
  newsPublication: String,
  feedback: String,
  websiteLink: String,
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

// Handle form submission
app.post('/submit', async (req, res) => {
  console.log('Form data received:', req.body); // Log the form data
  const event = new Event(req.body);
  try {
    await event.save();

    // Generate PDF
    const doc = new PDFDocument();
    const filePath = `./pdfs/${event._id}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(14).text('MUJ/Q&C/24/F/1.02 Event Report Format', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`FACULTY OF …………………`);
    doc.text(`NAME OF SCHOOL`);
    doc.text(`NAME OF DEPARTMENT and details of other unit if the event is in association with.`);
    doc.moveDown();
    doc.fontSize(14).text(`NAME OF EVENT: ${event.name}`);
    doc.fontSize(12).text(`Nature of Event: ${event.nature}`);
    doc.text(`Date of Event: ${event.date}`);
    doc.moveDown();
    doc.text(`Introduction of the Event: ${event.introduction}`);
    doc.text(`Objective of the Event: ${event.objective}`);
    doc.text(`Beneficiaries of the Event: ${event.beneficiaries}`);
    doc.text(`Details of the Guests: ${event.guests}`);
    doc.text(`Brief Description of the Event: ${event.description}`);
    doc.text(`Geo-tagged Photographs: ${event.photographs}`);
    doc.text(`Brochure or Creative of the Event: ${event.brochure}`);
    doc.text(`Schedule of the Event: ${event.schedule}`);
    doc.text(`Attendance of the Event: ${event.attendance}`);
    doc.text(`News Publication: ${event.newsPublication}`);
    doc.text(`Feedback of the Event: ${event.feedback}`);
    doc.text(`Link of MUJ Website: ${event.websiteLink}`);

    doc.end();

    res.status(200).send('Event submitted successfully');
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).send('Failed to submit event');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});