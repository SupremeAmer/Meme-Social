import React from "react";

const Contact = () => (
  <div style={{ padding: "2rem" }}>
    <h1>Contact Us</h1>
    <p>If you have any questions or concerns, feel free to reach out:</p>
    <ul>
      <li>Email: <a href="mailto:support@memesocial.com">support@memesocial.com</a></li>
      <li>Twitter: <a href="https://twitter.com/memesocial" target="_blank" rel="noopener noreferrer">@memesocial</a></li>
    </ul>
    <form>
      <div>
        <label>Your Name:</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label>Your Email:</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label>Your Message:</label>
        <textarea name="message" required />
      </div>
      <button type="submit">Send</button>
    </form>
  </div>
);

export default Contact;