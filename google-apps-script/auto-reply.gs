/**
 * Google Apps Script — Auto-acknowledgment email for Tim Stafford Tattoos
 *
 * SETUP:
 * 1. Open the Google Form linked to the contact form
 * 2. Click the three-dot menu → Script editor
 * 3. Paste this code, replacing any default content
 * 4. Update STUDIO_EMAIL below with Tim's confirmed studio email
 * 5. Save the project (Ctrl+S)
 * 6. Run → Run function → "installTrigger" (one-time setup)
 * 7. Authorize the script when prompted
 * 8. Test by submitting the form — the submitter should receive the acknowledgment
 *
 * FIELD MAPPING (update these if Google Form question titles differ):
 *   "First & Last Name"  → maps to "Your name"
 *   "Email Address"      → maps to "Email"
 *   "Description of tattoo" → maps to "Your tattoo idea"
 */

var STUDIO_EMAIL = 'timstaffordtattoos@gmail.com';

function installTrigger() {
  var form = FormApp.getActiveForm();
  ScriptApp.newTrigger('onFormSubmit')
    .forForm(form)
    .onFormSubmit()
    .create();
}

function onFormSubmit(e) {
  var responses = e.response.getItemResponses();
  var data = {};

  for (var i = 0; i < responses.length; i++) {
    var title = responses[i].getItem().getTitle();
    data[title] = responses[i].getResponse();
  }

  var email = data['Email Address'] || '';
  var name  = data['First & Last Name'] || '';
  var idea  = data['Description of tattoo'] || '';

  if (!email) return;

  var subject = 'Got your tattoo idea — Tim Stafford Tattoos';

  var body = 'Hey' + (name ? ' ' + name.split(' ')[0] : ' there') + '—\n\n'
    + 'Thanks for sending your idea. I read every inquiry myself and typically reply within 3 business days.\n\n'
    + 'If you have reference images—characters, artwork, or photos of where you\'d like the tattoo—just reply to this email and attach them here.\n\n'
    + 'I\'ll review your idea and get back to you with next steps. If it feels like a good fit, we\'ll arrange a free consultation at my Austin studio or over video to talk it through.\n\n'
    + 'Talk soon,\nTim\nTim Stafford Tattoos\n\n'
    + '—\n\n'
    + 'Your submitted idea:\n'
    + idea;

  MailApp.sendEmail({
    to: email,
    replyTo: STUDIO_EMAIL,
    name: 'Tim Stafford Tattoos',
    subject: subject,
    body: body
  });
}
