import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto prose max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
          About Us, Privacy Policy & Terms of Service
        </h1>

        {/* About Us Section */}
        <div id="about-us" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg">
            Welcome to MultiTools, your go-to destination for professional-grade utility tools. We are Ace Candar and Remar Rasonable, two Filipino developers with a shared vision: to provide powerful, free, and accessible tools to a global audience.
          </p>
          <p className="mt-4 text-lg">
            We created this platform because we believe that everyone should have access to the tools they need to be productive, without any cost barriers. By leveraging Google AdSense, we can offer our services completely free of charge, ensuring that our tools remain accessible to all.
          </p>
          <p className="mt-4 text-lg">
            Our mission is to continually expand our toolkit, bringing you new and innovative solutions to common tasks. We are passionate about technology and dedicated to making a positive impact by simplifying your daily digital needs. Thank you for being a part of our journey.
          </p>
        </div>

        {/* Privacy Policy Section */}
        <div id="privacy-policy" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Privacy Policy</h2>
          <p>
            At MultiTools, your privacy is a priority. This Privacy Policy explains what information we collect, how we use it, and your rights concerning that information.
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h3>
          <p>
            We collect information primarily through the use of Google AdSense and Vercel Analytics. This includes non-personal, aggregated data such as page views, traffic sources, and tool usage statistics. We do not collect personally identifiable information such as your name, email address, or phone number unless you voluntarily provide it for a specific service (e.g., support requests).
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Information</h3>
          <p>
            The information we collect is used to:
            <ul className="list-disc ml-8 mt-2">
              <li>Analyze website traffic and user behavior to improve our services.</li>
              <li>Provide personalized and relevant advertisements through Google AdSense.</li>
              <li>Monitor the performance and stability of our website.</li>
            </ul>
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-2">3. Third-Party Services</h3>
          <p>
            We use Google AdSense to serve ads on our site. Google may use cookies to serve ads based on your visit to this site and other sites on the Internet. You can read more about how Google uses data on their <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">partner sites policy</a>.
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-2">4. Your Consent</h3>
          <p>
            By using our website, you consent to our collection and use of information as described in this Privacy Policy. We may update this policy from time to time, and any changes will be posted on this page.
          </p>
        </div>

        {/* Terms of Service Section */}
        <div id="terms-of-service" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Terms of Service</h2>
          <p>
            Welcome to MultiTools. By accessing and using this website, you agree to be bound by the following Terms of Service.
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h3>
          <p>
            By using our services, you agree to these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-2">2. Use of Services</h3>
          <p>
            Our tools are provided for personal and professional use. You agree not to use our services for any illegal or unauthorized purpose. We reserve the right to suspend or terminate your access to our services at any time, without notice, for any reason.
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-2">3. Intellectual Property</h3>
          <p>
            The content, design, and functionality of this website are the property of MultiTools and are protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without our explicit permission.
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-2">4. Disclaimers</h3>
          <p>
            The tools and services on this website are provided "as is" and without warranties of any kind, either express or implied. We do not guarantee that the services will be uninterrupted, error-free, or secure.
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-2">5. Limitation of Liability</h3>
          <p>
            In no event shall MultiTools or its founders be liable for any damages arising from the use or inability to use the materials on our website.
          </p>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-12">
          <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
