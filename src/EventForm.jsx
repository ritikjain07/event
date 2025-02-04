import React, { useState } from 'react';

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    nature: '',
    date: '',
    introduction: '',
    objective: '',
    beneficiaries: '',
    guests: '',
    description: '',
    photographs: '',
    brochure: '',
    schedule: '',
    attendance: '',
    newsPublication: '',
    feedback: '',
    websiteLink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Event submitted successfully');
      } else {
        alert('Failed to submit event');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name of Event:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Nature of Event:
        <input type="text" name="nature" value={formData.nature} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Date of Event:
        <input type="text" name="date" value={formData.date} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Introduction of the Event:
        <textarea name="introduction" value={formData.introduction} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Objective of the Event:
        <textarea name="objective" value={formData.objective} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Beneficiaries of the Event:
        <textarea name="beneficiaries" value={formData.beneficiaries} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Details of the Guests:
        <textarea name="guests" value={formData.guests} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Brief Description of the Event:
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Geo-tagged Photographs:
        <textarea name="photographs" value={formData.photographs} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Brochure or Creative of the Event:
        <textarea name="brochure" value={formData.brochure} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Schedule of the Event:
        <textarea name="schedule" value={formData.schedule} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Attendance of the Event:
        <textarea name="attendance" value={formData.attendance} onChange={handleChange} required />
      </label>
      <br />
      <label>
        News Publication:
        <textarea name="newsPublication" value={formData.newsPublication} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Feedback of the Event:
        <textarea name="feedback" value={formData.feedback} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Link of MUJ Website:
        <input type="text" name="websiteLink" value={formData.websiteLink} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventForm;