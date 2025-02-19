const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sendEmail = require('../utils/sendEmail');

const createReferral = async (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

  // Validate required fields
  if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Save referral data to database
    const newReferral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
      },
    });

    // Send referral email
    await sendEmail(referrerName, referrerEmail, refereeName, refereeEmail);

    res.status(201).json({ message: 'Referral submitted successfully!', newReferral });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving referral.' });
  }
};

module.exports = { createReferral };
