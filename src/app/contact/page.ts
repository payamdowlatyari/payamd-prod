import { Metadata } from "next";

import Contact from "~/lib/pages/contact/index";

export const metadata: Metadata = {
  title: "Contact",
  description: `
    Payam Dowlatyari's contact page. 
    This page has a contact form that allows users to send messages directly to Payam.
    The form includes fields for the user's name, email address, and message content.
    Users can fill out the form and submit it to get in touch with Payam.`,
};

export default Contact;
