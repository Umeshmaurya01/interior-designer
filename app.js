app.post("/send", (req, res) => {
  // Debug log
  console.log('Received data:', req.body);
  
  const { name, email, phone, message } = req.body;

  // Debug log
  console.log('Extracted phone:', phone);

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: "New Contact Form Submission",
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
    text: `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `
  };

  // Debug log
  console.log('Mail options:', mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).json({ 
        success: false, 
        message: "Error while sending email.",
        error: error.message 
      });
    }
    console.log('Email sent:', info);
    res.status(200).json({ 
      success: true, 
      message: "Email sent successfully!" 
    });
  });
});