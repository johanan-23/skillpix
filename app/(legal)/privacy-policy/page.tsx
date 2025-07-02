import { Card, CardContent } from "@/components/ui/card";
import Header from "@/app/components/header";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header showAuthArea={false} showNavLinks={false} />
      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full max-w-3xl px-6 sm:px-8 md:px-12 py-12 mt-12">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Privacy Policy
          </h1>
          <Card className="shadow-lg border border-muted-foreground/10">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl font-semibold mt-6">1. Introduction</h2>
              <p className="mt-2">
                Skillpix (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is
                committed to protecting your privacy and ensuring the security
                of your personal information. This Privacy Policy explains in
                detail how we collect, use, disclose, and safeguard your
                information when you use our website, application, and services
                (collectively, the &quot;Platform&quot;). By accessing or using
                the Platform, you acknowledge and consent to the practices
                described in this policy. Please read this policy carefully to
                understand our views and practices regarding your personal data
                and how we will treat it. If you do not agree with any part of
                this policy, you should discontinue use of the Platform
                immediately.
              </p>

              <h2 className="text-2xl font-semibold mt-6">
                2. Information We Collect
              </h2>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>Personal Information:</strong> This includes your
                  name, email address, phone number, date of birth, postal
                  address, and any other information you provide during
                  registration, profile updates, or when communicating with us.
                  We may also collect information you provide when you
                  participate in surveys, contests, or promotions.
                </li>
                <li>
                  <strong>Academic & Skill Data:</strong> Information about your
                  educational background, courses taken, quiz results, project
                  submissions, uploaded resumes, certifications, and your
                  learning progress and achievements on the Platform.
                </li>
                <li>
                  <strong>Technical Information:</strong> Details such as your
                  IP address, browser type and version, operating system, device
                  identifiers, referral URLs, usage data, log files, and
                  information about how you interact with the Platform. This may
                  include access times, pages viewed, and links clicked.
                </li>
                <li>
                  <strong>Payment Data:</strong> Billing name, address, payment
                  method, transaction details, and other relevant information
                  required to process payments, collected and processed securely
                  via our third-party payment processor. We do not store your
                  full payment card details on our servers.
                </li>
                <li>
                  <strong>Communications:</strong> Records of your
                  communications with our support team, feedback, survey
                  responses, contact form submissions, and any other
                  correspondence between you and Skillpix.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-6">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  To register, verify, and manage your account, profile, and
                  learning progress on the Platform.
                </li>
                <li>
                  To process transactions, deliver certificates, provide
                  services, and fulfill contractual obligations.
                </li>
                <li>
                  To personalize your experience, including content, project
                  suggestions, recommendations, and targeted communications
                  based on your interests and activity.
                </li>
                <li>
                  To send you important notices, updates, security alerts,
                  administrative messages, and customer support responses.
                </li>
                <li>
                  To conduct research, analytics, and statistical analysis to
                  improve our Platform, develop new features, and enhance user
                  experience.
                </li>
                <li>
                  To comply with legal obligations, resolve disputes, enforce
                  our Terms & Conditions, and protect the rights, property, or
                  safety of Skillpix, our users, or others.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-6">
                4. Legal Bases for Processing
              </h2>
              <p className="mt-2">
                We process personal data based on the following legal grounds:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  Performance of a contract: For example, to deliver paid
                  courses, process your registration, or provide services you
                  have requested.
                </li>
                <li>
                  Consent: Where you have given explicit consent, such as for
                  receiving marketing emails or participating in optional
                  surveys.
                </li>
                <li>
                  Legitimate interests: To pursue our legitimate business
                  interests, such as fraud prevention, product improvement, and
                  ensuring the security and integrity of our Platform, provided
                  these interests are not overridden by your rights and
                  interests.
                </li>
                <li>
                  Legal compliance: To comply with applicable laws, regulations,
                  legal processes, or enforceable governmental requests, such as
                  responding to subpoenas or court orders.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-6">
                5. Sharing of Information
              </h2>
              <p className="mt-2">
                We do not sell your personal data to third parties. We may share
                your data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>Service Providers:</strong> With vetted third-party
                  vendors who assist us in operating the Platform, such as cloud
                  hosting providers, analytics services, customer support, and
                  payment processors. These vendors are contractually obligated
                  to protect your data and use it only for the purposes
                  specified by Skillpix.
                </li>
                <li>
                  <strong>Partner Institutions:</strong> With partner colleges,
                  recruiters, or institutions, but only with your explicit
                  consent, for purposes such as placement opportunities or
                  academic collaborations.
                </li>
                <li>
                  <strong>Legal or Regulatory Authorities:</strong> If required
                  by law, regulation, legal process, or governmental request, or
                  to protect the rights, property, or safety of Skillpix, our
                  users, or others.
                </li>
                <li>
                  <strong>Other Users:</strong> When you choose to make your
                  profile, projects, or certain information public, such data
                  may be visible to other users of the Platform.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mt-6">
                6. Cookies & Tracking
              </h2>
              <p className="mt-2">
                We use cookies, web beacons, and similar tracking technologies
                to analyze usage patterns, remember your preferences, enable
                certain features, and improve your overall user experience.
                Cookies help us understand how you interact with the Platform
                and allow us to provide a more personalized service. You can
                manage your cookie preferences at any time through your browser
                settings or our cookie consent banner. Disabling cookies may
                affect the functionality of some features.
              </p>

              <h2 className="text-2xl font-semibold mt-6">7. Data Retention</h2>
              <p className="mt-2">
                We retain your personal data for as long as your account is
                active or as necessary to fulfill the purposes outlined in this
                policy, comply with our legal obligations, resolve disputes, and
                enforce our agreements. If you request deletion of your account
                and data, we will process your request subject to certain legal
                or regulatory exceptions, such as record-keeping requirements or
                legitimate business interests.
              </p>

              <h2 className="text-2xl font-semibold mt-6">8. Your Rights</h2>
              <p className="mt-2">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  Access, update, or delete your personal data held by Skillpix.
                </li>
                <li>
                  Withdraw your consent for marketing or other communications at
                  any time.
                </li>
                <li>
                  Request a copy of your data in a structured, commonly used,
                  and machine-readable format (data portability).
                </li>
                <li>
                  Object to or restrict certain processing activities, such as
                  direct marketing or profiling.
                </li>
                <li>
                  Lodge a complaint with a supervisory authority if you believe
                  your rights have been violated.
                </li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, please email us at{" "}
                <em>legal@skillpix.com</em>. We will respond to your request in
                accordance with applicable data protection laws.
              </p>

              <h2 className="text-2xl font-semibold mt-6">9. Data Security</h2>
              <p className="mt-2">
                We implement industry-standard security measures, including
                encryption, firewalls, secure servers, and access controls, to
                protect your personal data from unauthorized access, disclosure,
                alteration, or destruction. While we strive to use commercially
                acceptable means to safeguard your information, please be aware
                that no method of transmission over the internet or electronic
                storage is 100% secure. We cannot guarantee absolute security,
                but we are committed to promptly addressing any security
                vulnerabilities or incidents.
              </p>

              <h2 className="text-2xl font-semibold mt-6">
                10. Children’s Privacy
              </h2>
              <p className="mt-2">
                Our services are intended for users who are at least 13 years
                old. We do not knowingly collect or solicit personal data from
                children under 13. If we become aware that we have collected
                personal information from a child under 13 without parental
                consent, we will take steps to promptly delete such data from
                our records. If you believe a child under 13 has provided us
                with personal information, please contact us immediately.
              </p>

              <h2 className="text-2xl font-semibold mt-6">
                11. International Transfers
              </h2>
              <p className="mt-2">
                Your information may be transferred to, stored, and processed on
                servers located outside your country of residence, including in
                countries that may have different data protection laws. We take
                appropriate safeguards, such as contractual clauses and security
                measures, to ensure your data is protected regardless of where
                it is processed. By using the Platform, you consent to such
                international transfers.
              </p>

              <h2 className="text-2xl font-semibold mt-6">
                12. Third-Party Links
              </h2>
              <p className="mt-2">
                Our Platform may contain links to third-party websites,
                services, or applications that are not operated or controlled by
                Skillpix. We are not responsible for the privacy practices or
                content of such third parties. We encourage you to review the
                privacy policies of any third-party sites you visit before
                providing any personal information.
              </p>

              <h2 className="text-2xl font-semibold mt-6">
                13. Changes to This Policy
              </h2>
              <p className="mt-2">
                We may update or revise this Privacy Policy periodically to
                reflect changes in our practices, legal requirements, or for
                other operational reasons. The latest version will always be
                available on our website, along with the “Last Updated” date at
                the end of this policy. If we make significant changes, we will
                notify you via email, in-app alerts, or other appropriate means.
                Your continued use of the Platform after such changes
                constitutes acceptance of the revised policy.
              </p>

              <h2 className="text-2xl font-semibold mt-6">14. Contact Us</h2>
              <p className="mt-2">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact:
                <br />
                <strong>Skillpix Privacy Team</strong>
                <br />
                Email: <em>legal@skillpix.com</em>
                <br />
                We are committed to addressing your inquiries promptly and
                transparently.
              </p>

              <h2 className="text-2xl font-semibold mt-6">15. Last Updated</h2>
              <p className="mt-2">
                This Privacy Policy was last updated on July 2, 2025. We
                encourage you to review this policy regularly to stay informed
                about how we are protecting your information.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
