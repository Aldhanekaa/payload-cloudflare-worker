/**
 * EXAMPLE: Contact Page with Global Settings
 *
 * This example shows how to use WhatsApp contact and schedule consultation
 * link in a contact page.
 */

import { getGlobalSettings } from '@/(payload)/globals/Global_Settings'
import { getWhatsAppUrl } from '@/(payload)/globals/Global_Settings/types'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export default async function ContactPage() {
  const settings = await getGlobalSettings()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

          {/* WhatsApp Contact */}
          {settings?.whatsapp && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">WhatsApp</h3>
              <p className="text-gray-600 mb-4">
                Send us a message on WhatsApp for quick responses
              </p>
              <WhatsAppButton
                whatsapp={settings.whatsapp}
                variant="inline"
                showText={true}
                message="Hi! I'd like to get in touch with your team."
              />
            </div>
          )}

          {/* Schedule Consultation */}
          {settings?.scheduleConsultationLink && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Book a Consultation</h3>
              <p className="text-gray-600 mb-4">
                Schedule a meeting with our team at your convenience
              </p>
              <a
                href={settings.scheduleConsultationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Schedule Now
              </a>
            </div>
          )}
        </div>

        {/* Contact Form or Additional Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Send us a Message</h3>
          {/* Your contact form here */}
        </div>
      </div>

      {/* Display WhatsApp contact info as plain text */}
      {settings?.whatsapp && (
        <div className="mt-8 p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">
            Direct WhatsApp:{' '}
            <a
              href={getWhatsAppUrl(settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline font-medium"
            >
              {settings.whatsapp.countryCode} {settings.whatsapp.number}
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
