import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'ns96vt4n',
  dataset: 'production',
  apiVersion: '2026-09-12',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function main() {
  if (!process.env.SANITY_API_TOKEN) throw new Error('Set SANITY_API_TOKEN before repairing Home content details.')

  const contactSteps = [
    {step: 'start', heading: 'Have a project in mind?', description: "Tell us what you're building. We'll reply with next steps, not a sales script.", buttonLabel: 'Start your project'},
    {step: 'name', heading: "What's your name?", placeholder: 'Jane Doe', buttonLabel: 'Continue', errorMessage: 'Please add your name.'},
    {step: 'email', heading: "What's your email?", placeholder: 'jane@company.com', buttonLabel: 'Continue', errorMessage: 'Please add a valid email.'},
    {step: 'project', heading: 'What describes your project?'},
    {step: 'message', heading: 'Tell us a bit more', alternateHeading: 'Which service do you need?', placeholder: 'A few lines about your idea, timeline or budget...', alternatePlaceholder: 'Write the service you need...', buttonLabel: 'Review enquiry'},
    {step: 'review', heading: "Here's what we'll receive", completionDescription: "Choose where you'd like to send your enquiry.", whatsappLabel: 'WhatsApp us', emailLabel: 'Email us'},
  ]
  const summaryLabels = {
    name: 'Name:', email: 'Email:', service: 'Service:', message: 'Message:',
    defaultRecipient: 'there', notSpecified: 'Not specified', subjectPrefix: 'Project enquiry from',
  }

  await client.patch('homeContact').setIfMissing({
    otherServiceLabel: 'Other',
    emailAddress: 'hello@berrysols.com',
    steps: contactSteps,
    summaryLabels,
  }).commit()

  await client.patch('homeAbout').setIfMissing({
    descriptionPrefix: 'We bring clarity to complex challenges through technology built around ',
    descriptionEmphasis: 'your',
    descriptionSuffix: ' business.',
  }).commit()

  console.log('Added missing Contact Flow copy and Why Berry emphasis fields without overwriting existing content.')
}

main().catch((error) => {console.error(error); process.exitCode = 1})
