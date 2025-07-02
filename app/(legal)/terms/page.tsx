// app/terms/page.tsx

import { Card, CardContent } from "@/components/ui/card";
import Header from "@/app/components/header";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <Header showAuthArea={false} showNavLinks={false} />
        <main className="flex-1 flex flex-col items-center w-full">
          <div className="w-full max-w-5xl px-6 sm:px-8 md:px-12 py-12 mt-12">
            <h1 className="text-4xl font-bold mb-8 text-center">
              Terms &amp; Conditions
            </h1>
            <Card className="shadow-lg border border-muted-foreground/10">
              <CardContent className="p-6 sm:p-8 md:p-10">
                {/* 1. Introduction */}
                <h2 className="text-2xl font-semibold mt-6">1. Introduction</h2>
                <p className="mt-2">
                  These Terms &amp; Conditions (“Terms”)
                  govern your access to and use of our website, application, and
                  services (collectively, the “Platform”). By accessing,
                  browsing, registering, or otherwise using any part of the
                  Platform, you (“User” or “you”) agree to be bound by these
                  Terms. Please read them carefully before proceeding. If you do
                  not agree to any part of these Terms, you must immediately
                  discontinue use of the Platform. Your continued use
                  constitutes acceptance of all current and future revisions.
                </p>

                {/* 2. Definitions */}
                <h2 className="text-2xl font-semibold mt-6">2. Definitions</h2>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Platform:</strong> Refers to the Skillpix website,
                    mobile application, APIs, and all related services,
                    features, and content provided by Skillpix, whether accessed
                    via desktop, mobile, or any other device or interface.
                  </li>
                  <li>
                    <strong>User:</strong> Any individual or entity who
                    accesses, registers, or otherwise interacts with the
                    Platform, including but not limited to students, educators,
                    institutions, and visitors.
                  </li>
                  <li>
                    <strong>Content:</strong> All forms of text, images, videos,
                    code, questions, answers, comments, feedback, and any other
                    materials or information submitted, uploaded, posted, or
                    otherwise made available by Users on or through the
                    Platform.
                  </li>
                  <li>
                    <strong>Services:</strong> Includes but is not limited to
                    educational modules, practice challenges, projects,
                    placement preparation resources, interactive features, and
                    any other tools or services offered by Skillpix as part of
                    the Platform.
                  </li>
                </ul>

                {/* 3. Eligibility & Account */}
                <h2 className="text-2xl font-semibold mt-6">
                  3. Eligibility &amp; Account Registration
                </h2>
                <p className="mt-2">
                  <strong>3.1</strong> You must be at least 18 years old or the
                  age of majority as defined in your jurisdiction to register
                  for or use the Platform independently. If you are a minor, you
                  may only use the Platform with the express consent and
                  supervision of a parent or legal guardian, who will be
                  responsible for your actions and compliance with these Terms.
                </p>
                <p className="mt-2">
                  <strong>3.2</strong> You agree to provide true, accurate,
                  current, and complete information during registration and to
                  keep such information updated at all times. You are solely
                  responsible for maintaining the confidentiality of your
                  account credentials and for all activities that occur under
                  your account. You must promptly notify Skillpix of any
                  unauthorized use or suspected breach of security.
                </p>

                {/* 4. Subscriptions & Payments */}
                <h2 className="text-2xl font-semibold mt-6">
                  4. Subscriptions, Payments &amp; Refunds
                </h2>
                <p className="mt-2">
                  <strong>4.1</strong> Details of available subscription plans,
                  features, and pricing are provided on our pricing page. All
                  fees for paid plans or services must be paid in advance,
                  unless otherwise specified. By subscribing, you agree to pay
                  all applicable charges in accordance with the selected plan
                  and billing cycle.
                </p>
                <p className="mt-2">
                  <strong>4.2</strong> Payments are processed securely via
                  third-party payment processors. By providing your payment
                  information, you authorize Skillpix and its payment partners
                  to charge your account for recurring subscription fees, if you
                  opt-in to such plans. You are responsible for ensuring your
                  payment information is accurate and up to date.
                </p>
                <p className="mt-2">
                  <strong>4.3</strong> All fees and charges are non-refundable
                  except as required by applicable law or at the sole discretion
                  of Skillpix. Refund requests, if any, will be considered on a
                  case-by-case basis and must be submitted in writing to our
                  support team.
                </p>

                {/* 5. User Content & License */}
                <h2 className="text-2xl font-semibold mt-6">
                  5. User Content &amp; Licensing
                </h2>
                <p className="mt-2">
                  <strong>5.1</strong> You retain ownership of all Content you
                  submit, post, or upload to the Platform. By doing so, you
                  grant Skillpix a worldwide, royalty-free, non-exclusive,
                  transferable license to use, reproduce, modify, adapt,
                  publish, translate, distribute, publicly perform, and display
                  such Content in connection with the operation, promotion, and
                  improvement of the Platform and Skillpix’s business.
                </p>
                <p className="mt-2">
                  <strong>5.2</strong> You represent and warrant that you have
                  all necessary rights, licenses, and permissions to submit your
                  Content and that it does not infringe, misappropriate, or
                  violate any third-party intellectual property rights, privacy
                  rights, or any applicable laws or regulations.
                </p>

                {/* 6. Acceptable Use */}
                <h2 className="text-2xl font-semibold mt-6">
                  6. Acceptable Use &amp; Prohibited Conduct
                </h2>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    Engaging in harassment, threats, hate speech, or any conduct
                    that is abusive, discriminatory, or otherwise harmful to
                    others.
                  </li>
                  <li>
                    Posting, sharing, or distributing adult, violent, illegal,
                    or infringing content, including but not limited to
                    copyrighted materials without authorization.
                  </li>
                  <li>
                    Cheating, hacking, attempting to gain unauthorized access,
                    circumventing security measures, or interfering with the
                    normal operation of the Platform.
                  </li>
                  <li>
                    Scraping, harvesting, or collecting data from the Platform
                    without express written permission from Skillpix.
                  </li>
                </ul>

                {/* 7. Intellectual Property */}
                <h2 className="text-2xl font-semibold mt-6">
                  7. Intellectual Property
                </h2>
                <p className="mt-2">
                  <strong>7.1</strong> All intellectual property rights in the
                  Platform, including but not limited to software, design,
                  graphics, logos, trademarks, and all content (excluding User
                  Content), are owned by Skillpix or its licensors. These rights
                  are protected by copyright, trademark, and other applicable
                  laws.
                </p>
                <p className="mt-2">
                  <strong>7.2</strong> You may not copy, reproduce, distribute,
                  modify, create derivative works of, publicly display, or
                  otherwise exploit any part of the Platform except as expressly
                  permitted by these Terms or with prior written consent from
                  Skillpix.
                </p>

                {/* 8. Disclaimers & Warranties */}
                <h2 className="text-2xl font-semibold mt-6">
                  8. Disclaimers &amp; Warranties
                </h2>
                <p className="mt-2">
                  <strong>8.1</strong> The Platform and all related services are
                  provided on an “as is” and “as available” basis, without any
                  warranties of any kind, either express or implied. Skillpix
                  expressly disclaims all warranties, including but not limited
                  to merchantability, fitness for a particular purpose,
                  non-infringement, accuracy, reliability, or availability of
                  the Platform.
                </p>
                <p className="mt-2">
                  <strong>8.2</strong> Skillpix does not guarantee that use of
                  the Platform will result in any specific learning outcomes,
                  job placements, or other results. Your use of the Platform and
                  reliance on any content or services is at your own risk.
                </p>

                {/* 9. Limitation of Liability */}
                <h2 className="text-2xl font-semibold mt-6">
                  9. Limitation of Liability
                </h2>
                <p className="mt-2">
                  <strong>9.1</strong> To the fullest extent permitted by law,
                  Skillpix’s total aggregate liability for any claims arising
                  out of or relating to these Terms or your use of the Platform
                  shall not exceed the total fees paid by you to Skillpix in the
                  twelve (12) months preceding the event giving rise to the
                  claim.
                </p>
                <p className="mt-2">
                  <strong>9.2</strong> In no event shall Skillpix be liable for
                  any indirect, incidental, special, consequential, or punitive
                  damages, or for any loss of profits, data, or goodwill,
                  arising out of or in connection with your use of the Platform.
                  The above limitations do not apply to liability for death or
                  personal injury caused by negligence, or for gross negligence
                  or willful misconduct.
                </p>

                {/* 10. Indemnification */}
                <h2 className="text-2xl font-semibold mt-6">
                  10. Indemnification
                </h2>
                <p className="mt-2">
                  You agree to indemnify, defend, and hold harmless Skillpix,
                  its affiliates, officers, directors, employees, agents, and
                  licensors from and against any and all claims, damages,
                  losses, liabilities, costs, and expenses (including reasonable
                  attorneys’ fees) arising out of or related to your use of the
                  Platform, your Content, your violation of these Terms, or your
                  violation of any rights of another party.
                </p>

                {/* 11. Termination */}
                <h2 className="text-2xl font-semibold mt-6">11. Termination</h2>
                <p className="mt-2">
                  <strong>11.1</strong> You may deactivate your account at any
                  time by following the instructions provided in your account
                  settings. Upon deactivation, your access to the Platform will
                  be terminated, and you will not be entitled to any refunds
                  except as required by applicable law. Certain data may be
                  retained as required by law or for legitimate business
                  purposes.
                </p>
                <p className="mt-2">
                  <strong>11.2</strong> Skillpix reserves the right to suspend
                  or terminate your access to the Platform at any time, with or
                  without notice, for violations of these Terms, suspected
                  fraudulent or illegal activity, or as required by law. Upon
                  termination, your right to use the Platform will immediately
                  cease.
                </p>

                {/* 12. Governing Law */}
                <h2 className="text-2xl font-semibold mt-6">
                  12. Governing Law &amp; Dispute Resolution
                </h2>
                <p className="mt-2">
                  <strong>12.1</strong> These Terms shall be governed by and
                  construed in accordance with the laws of India, without regard
                  to its conflict of law principles. Any claims, disputes, or
                  controversies arising out of or relating to these Terms or the
                  Platform must first be submitted in writing to{" "}
                  <em>legal@skillpix.com</em>. The parties agree to attempt in
                  good faith to resolve any such disputes within a sixty (60)
                  day cure period before pursuing other remedies.
                </p>
                <p className="mt-2">
                  <strong>12.2</strong> If a dispute remains unresolved after
                  the cure period, it shall be finally resolved by binding
                  arbitration conducted in Chennai, India, in accordance with
                  the Arbitration and Conciliation Act, 1996. The language of
                  arbitration shall be English, and the decision of the
                  arbitrator(s) shall be final and binding on both parties.
                </p>

                {/* 13. Severability & Waiver */}
                <h2 className="text-2xl font-semibold mt-6">
                  13. Severability &amp; Waiver
                </h2>
                <p className="mt-2">
                  <strong>13.1</strong> If any provision of these Terms is found
                  to be invalid, illegal, or unenforceable by a court or other
                  tribunal of competent jurisdiction, such provision shall be
                  severed from the Terms, and the remaining provisions shall
                  remain in full force and effect.
                </p>
                <p className="mt-2">
                  <strong>13.2</strong> The failure of Skillpix to enforce any
                  right or provision of these Terms shall not constitute a
                  waiver of such right or provision. Any waiver must be in
                  writing and signed by an authorized representative of
                  Skillpix.
                </p>

                {/* 14. Entire Agreement */}
                <h2 className="text-2xl font-semibold mt-6">
                  14. Entire Agreement{" "}
                </h2>
                <p className="mt-2">
                  These Terms, together with the Privacy Policy and any
                  additional terms and conditions expressly incorporated by
                  reference, constitute the entire agreement between you and
                  Skillpix regarding your use of the Platform. They supersede
                  all prior or contemporaneous agreements, communications, and
                  proposals, whether oral or written, between you and Skillpix
                  with respect to the Platform.
                </p>

                {/* 15. Force Majeure */}
                <h2 className="text-2xl font-semibold mt-6">
                  15. Force Majeure
                </h2>
                <p className="mt-2">
                  Neither Skillpix nor you shall be liable for any delay or
                  failure to perform obligations under these Terms if such delay
                  or failure results from events beyond reasonable control,
                  including but not limited to natural disasters, acts of
                  government, war, terrorism, labor disputes, internet or power
                  outages, or other force majeure events. The affected party
                  shall notify the other party as soon as practicable.
                </p>

                {/* 16. Export Controls & Compliance */}
                <h2 className="text-2xl font-semibold mt-6">
                  16. Export Controls &amp; Compliance
                </h2>
                <p className="mt-2">
                  You agree to comply with all applicable export control and
                  sanctions laws and regulations. You may not use, export,
                  re-export, or transfer any part of the Platform in violation
                  of such laws, including to any country, entity, or person
                  subject to restrictions under Indian or international law.
                </p>

                {/* 17. Data Protection */}
                <h2 className="text-2xl font-semibold mt-6">
                  17. Data Protection &amp; Privacy Policy
                </h2>
                <p className="mt-2">
                  Your use of personal data and privacy rights are governed by
                  our Privacy Policy, which is available at
                  <a href="/privacy" className="text-blue-600 underline">
                    /privacy
                  </a>
                  . Please review the Privacy Policy to understand how we
                  collect, use, store, and protect your personal information, as
                  well as your rights and choices regarding your data.
                </p>

                {/* 18. Injunctive Relief */}
                <h2 className="text-2xl font-semibold mt-6">
                  18. Injunctive Relief
                </h2>
                <p className="mt-2">
                  Skillpix may seek immediate injunctive or other equitable
                  relief in any court of competent jurisdiction to prevent or
                  stop unauthorized use, disclosure, or infringement of its
                  intellectual property or confidential information, without the
                  necessity of posting bond or proving actual damages.
                </p>

                {/* 19. Audit Rights */}
                <h2 className="text-2xl font-semibold mt-6">
                  19. Audit Rights
                </h2>
                <p className="mt-2">
                  Skillpix reserves the right to audit enterprise,
                  institutional, or college accounts at any time, upon providing
                  reasonable notice, to ensure compliance with license terms,
                  usage restrictions, and other applicable agreements. Failure
                  to cooperate with an audit may result in suspension or
                  termination of access.
                </p>

                {/* 20. Versioning & Last Updated */}
                <h2 className="text-2xl font-semibold mt-6">
                  20. Versioning &amp; Last Updated
                </h2>
                <p className="mt-2">
                  These Terms were last updated on July 2, 2025. Skillpix may
                  update or modify these Terms from time to time, and such
                  changes will be effective upon posting on the Platform. We
                  track acceptance version per user. It is your responsibility
                  to review the Terms periodically. Continued use of the
                  Platform after changes constitutes acceptance of the revised
                  Terms.
                </p>

                {/* Contact */}
                <h2 className="text-2xl font-semibold mt-6">
                  Contact Information
                </h2>
                <p className="mt-2">
                  For any questions, concerns, or legal notices regarding these
                  Terms or your use of the Platform, please contact Skillpix
                  Legal at <Link href="mailto:legal@skillpix.com">legal@skillpix.com</Link>. We strive to respond to
                  all inquiries in a timely manner.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
