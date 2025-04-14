"use client";
import { Modal, Box } from "@mui/material";
import "../../styles/modals.css";

const PrivacyModal = ({ modal, closeAction = () => {} }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      modal.handleClose();
      closeAction();
    }
  };
  return (
    <Modal
      open={modal.open}
      onClose={modal.handleClose}
      aria-labelledby="terms-of-service-modal"
      onKeyDown={handleKeyDown}
      BackdropProps={{
        onClick: () => {
          modal.handleClose();
          closeAction();
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
        }}
        className="modalType1"
      >
        <div className="modal-container terms-modal">
          <button className="modal-close" onClick={modal.handleClose}>
            ×
          </button>

          <div className="modal-header">
            <h2 className="modal-title">Privacy Policy</h2>
            <p className="modal-subtitle">Last Updated: April 6, 2025</p>
          </div>

          <div className="modal-content terms-content">
            <p>
              At LoveSet ("LoveSet"), we take your privacy seriously. We have
              prepared this privacy policy to explain how we collect, use, and
              disclose personal information through our mobile application, web
              application, and website{" "}
              <a href="https://loveset.platle.com">
                https://loveset.platle.com
              </a>{" "}
              (collectively, the "Services"), or otherwise interact with you.
            </p>
            <p>
              It is important to remember that you must either be a permitted
              user of an organization or other third party that is a customer
              ("Organization Customer") or a customer yourself in order to use
              the Services...
            </p>
            <h2>Collection & Use of Personal Information</h2>
            <p>We may collect personal information when you:</p>
            <ul>
              <li>Create an account on the Services.</li>
              <li>Use the Services.</li>
              <li>Sign up to receive marketing communications.</li>
              <li>Connect your social media account.</li>
              <li>Provide us with additional information.</li>
            </ul>
            <h3>Create an Account</h3>
            <h4>Setup Information</h4>
            <p>
              You have to create an account to use the Services. To do so, we
              require certain information: your first and last name, email
              address and a password that you create. We use this information to
              create and administer your account. We strongly recommend that you
              do not disclose your password to anyone. We will never ask you for
              your password in any unsolicited communication (such as letters,
              phone calls or email messages). If you become aware of any
              unauthorized access to or use of your account, you must notify us
              immediately.
            </p>
            <h3>Purchase a Subscription</h3>
            <p>
              If you sign up for a paid account, we (or our authorized
              third-party payment processor) may collect payment information
              (including billing address, credit card number, expiry data and
              CVV code) in order to process the transaction. In such an event,
              it is our policy to redirect you to a payment processing portal
              hosted by a third-party payment processor. Please read the privacy
              policy on our payment processor’s website regarding the use,
              storage and protection of your credit card information before
              submitting any payment information.
            </p>
            <h4>Use of Service</h4>
            <h3>Push Notifications</h3>
            <p>
              If you consent to receive push notifications, we may display push
              notifications on your mobile device such as welcome messages,
              meeting reminders, and product features. If you wish to stop
              receiving push notifications from us, you can turn off push
              notifications for the mobile application in the settings of your
              mobile device.
            </p>
            <h3>Technical and Usage Information</h3>
            <p>
              We also collect certain technical and usage information when you
              use the Services, such as the type of device, browser, and
              operating system you are using, your Internet service provider or
              mobile carrier, unique device identifier, IDFA or IDFV, MAC
              address, IP address, device and browser settings, the webpages and
              mobile apps you use, advertisements you see and interact with, and
              certain usage information.
            </p>
            <h3>Sign Up to Receive Marketing Communications</h3>
            <p>
              If you sign-up to receive email marketing communications such as
              newsletters or blog posts, we collect your email address. You can
              unsubscribe at any time by clicking the “unsubscribe” link
              included at the bottom of each email. Alternatively, you can
              opt-out of receiving email marketing communications by contacting
              us at the contact information provided in the “Contact Us” section
              below. Please note that you may continue to receive transactional
              or account-related communications from us. If you engage with our
              marketing campaigns on social media websites, we may collect
              information (e.g. likes, shares, and comments) for the purposes of
              evaluating the effectiveness of our marketing campaign. We may
              also use services provided by third-party platforms (such as
              social media and other websites) to serve targeted advertisements
              on such platforms to you or others, and we may provide a hashed
              version of your email address or other information to the platform
              provider for such purposes. To opt-out of the use of your
              information for such purposes, please send a request using any of
              the methods set forth in the Contact Us section below.
            </p>
            <h3>Connect Your Social Media Accounts</h3>
            <p>
              If you choose to connect one of your social media accounts to
              LoveSet, we will collect your username. If you connect your social
              media account, you authorize us to access certain account
              information (consistent with your social media account privacy
              settings), including your name and email address as well as any
              public messages you post on your timeline. We do not have access
              to or collect any information contained in the direct messages of
              your social media account. You may disconnect your social media
              accounts at any time in your account settings. We do not have
              control over the manner in which your personal information is
              treated on these social media websites. Please review the privacy
              policies that apply to those social media accounts for more
              information.
            </p>
            <h3>Provide Us With Additional Information</h3>
            <p>Contact us</p>
            <br />
            <p>
              When you contact us with a comment, question or complaint, you may
              be asked for information that identifies you, such as your name,
              email address or phone number, along with additional information
              we need to help us promptly answer your question or respond to
              your comment. We may retain this information to assist you in the
              future and to improve our customer service and service offerings.
            </p>
            <br />
            <p>Careers</p>
            <br />
            <p>
              If you apply for a job with us, you may provide us with certain
              personal information about yourself, such as information contained
              in a resume, cover letter, or similar employment-related
              materials.We use this information for the purpose of processing
              and responding to your application for current and future career
              opportunities.
            </p>
            <h2>Sharing of Personal Information</h2>
            <p>
              We do not sell, rent or disclose your personal information to
              third parties without your consent, except as described below or
              as required or permitted by applicable law.
            </p>
            <h2> Service Providers</h2>
            <p>
              Your personal information may be transferred (or otherwise made
              available) to third parties that provide services on our behalf.
              We use service providers to provide services such as hosting the
              Services. Our service providers are only provided with the
              information they need to perform their designated functions and
              are not authorized to use or disclose personal information for
              their own marketing or other purposes. Our service providers may
              be located in the U.S., Canada or other foreign jurisdictions. In
              the event personal information is transferred to the US or other
              foreign jurisdiction, it will be subject to the laws of that
              jurisdiction and may be disclosed to or accessed by the courts,
              law enforcement and governmental authorities in accordance with
              those laws. Our service providers are given the information they
              need to perform their designated functions, and are not authorized
              to use or disclose personal information for their own marketing or
              other purposes.
            </p>
            <h2>Legal and Compliance</h2>
            <p>
              We and our Canadian, US and other foreign service providers may
              disclose your personal information in response to a search warrant
              or other legally valid inquiry or order, or to another
              organization for the purposes of investigating a breach of an
              agreement or contravention of law or detecting, suppressing or
              preventing fraud, or as otherwise may be required or permitted by
              applicable Canadian, U.S. or other law or legal process, which may
              include lawful access by US or foreign courts, law enforcement or
              other government authorities. Your personal information may also
              be disclosed where necessary for the establishment, exercise or
              defence of legal claims and to investigate or prevent actual or
              suspected loss or harm to persons or property.
            </p>
            <h2>Sale of Business</h2>
            <p>
              We may transfer any information we have about you as an asset in
              connection with a proposed or completed merger, acquisition or
              sale (including transfers made as part of insolvency or bankruptcy
              proceedings) involving all or part of the or as part of a
              corporate reorganization or other change in corporate control.
            </p>
            <h2>Information About The Services</h2>
            <h2> Visiting Our Website</h2>
            <p>
              In general, you can visit our website without telling us who you
              are or submitting any personal information. However, we collect
              the IP (Internet protocol) addresses of all visitors to our
              website and other related information such as page requests,
              browser type, operating system and average time spent on our
              website. We use this information to help us understand our website
              activity and to monitor and improve our website.
            </p>
            <h2>Cookies</h2>
            <p>
              Our website uses a technology called "cookies". A cookie is a tiny
              element of data that our website sends to a user's browser, which
              may then be stored on the user's hard drive so that we can
              recognize the user's computer or device when they return. You may
              set your browser to notify you when you receive a cookie or to not
              accept certain cookies. However, if you decide not to accept
              cookies from our website, you may not be able to take advantage of
              all of the website features. See "Managing Cookies and Other
              Technologies" below for more information.
            </p>
            <h2>Website Analytics</h2>
            <p>
              We may use a third party such as Google Analytics to help us
              gather and analyze information about your use of our website (such
              as the areas visited, as the pages most read, time spent, search
              terms and other engagement data) in order to evaluate and improve
              the user experience and the website. For more information or to
              opt-out using the Google Analytics opt-out browser add-on, see
              "How Google uses data when you use our partners' sites or apps"
              and "Google Analytics and Privacy". We may also use tracer tags
              and web beacons, which allow us to understand which pages you
              visit on the website. These tracer tags are used to help us
              optimize and tailor the website for you and other future visitors
              to the website.
            </p>
            <h2>Third Party Links; Third Party Services</h2>
            <p>
              The Services may contain links to other websites or apps that does
              not own or operate. We provide links to third party websites as a
              convenience to the user. These links are not intended as an
              endorsement of or referral to the linked websites. The linked
              websites have separate and independent privacy policies, notices
              and terms of use. We do not have any control over such websites,
              and therefore we have no responsibility or liability for the
              manner in which the organizations that operate such linked
              websites may collect, use or disclose, secure and otherwise treat
              personal information. We encourage you to read the privacy policy
              of every website you visit.
            </p>
            <h2>Third-Party Services and Linked/Embedded Content</h2>
            <p>
              Certain features and functionalities within the Services may allow
              you and your Authorized Users to interface or interact with,
              access and/or use compatible third-party services, products, AI or
              ML tools, or other technology and content (collectively,
              “Third-Party Services”) through the Services. LoveSet does not
              provide any aspect of the Third-Party Services or the media or
              content generated thereby (the “Output”). LoveSet is also not
              responsible for any compatibility issues, errors or bugs in the
              Services or Third-Party Services caused in whole or in part by the
              Third-Party Services or any update or upgrade thereto. The
              Third-Party Service’s terms will govern the relationship between
              you and the vendor of such Third-Party Service, including without
              limitation, on allocating intellectual property rights and
              specific use requirements, and as between LoveSet and you, you are
              solely responsible for complying therewith. For example, some
              license terms and contractual provisions may limit the manner in
              which you are permitted to use your User Story, such as to provide
              medical advice, medical results interpretation, financial advice
              or legal advice or opinion and other license terms and contractual
              provisions may require you to license back the prompt you crafted
              to generate the Output. You acknowledge sole responsibility for
              and assume all risk arising from, your use of any Third Party
              Services and the Output, including maintaining the Third-Party
              Services and obtaining any associated licenses and consents
              necessary for you and your Authorized Users to use the Third-Party
              Services and Output. LoveSet is not responsible or liable for the
              Third-Party Service’s terms or actions taken under the Third-Party
              Service’s terms. Further, by using the Services, you acknowledge
              and agree that LoveSet is not responsible for examining or
              evaluating the content, quality, accuracy, completeness,
              availability, timeliness, reliability, validity, copyright
              compliance, legality, decency, or any other aspect of such
              Third-Party Services or Output. We do not warrant or endorse and
              do not assume and will not have any liability or responsibility to
              you or any other person for any Third-Party Services or Output.
            </p>
            <h2>Mobile Analytics</h2>
            <p>
              As with many applications, certain limited data is required for
              our mobile application to function on your device. We use mobile
              analytics software to allow us to better understand the
              functionality of our mobile software on your phone, to monitor and
              improve our application, and to tailor your in-app experience.
              This software may record information such as how often you use the
              application, the events that occur within the application,
              aggregated usage, performance data, and where the application was
              downloaded from. We do not link the information we store within
              the analytics software to any personally identifiable information
              you submit within the mobile application.
            </p>
            <h2>Safeguards & Retention</h2>
            <p>
              We have implemented reasonable administrative, technical and
              physical measures in an effort to safeguard the personal
              information in our custody and control against theft, loss and
              unauthorized access, use, modification and disclosure. We restrict
              access to personal information on a need-to-know basis to
              employees and authorized service providers who require access to
              fulfil their job requirements. We have record retention processes
              designed to retain personal information for no longer than
              necessary for the purposes set out herein or as otherwise required
              to meet legal or business requirements.
            </p>
            <h2>Managing Cookies & Other Technology</h2>
            <p>
              Cookies can either be persistent (i.e., they remain on your
              computer until you delete them) or temporary (i.e., they last only
              until you close your browser). Check your browser settings to
              learn how to delete cookies. You may adjust your browser to reject
              cookies from us or from any other website. Controlling cookies via
              browser controls may not limit our use of other technologies.
              Please consult your browser's settings for more information.
              However, blocking cookies or similar technology might prevent you
              from accessing some of our content website features.
            </p>
            <h2>Mobile & Web Applications</h2>
            <p>
              We will use commercially reasonable efforts, given the limitations
              imposed upon us by third party providers such as Apple, Inc. and
              Google, Inc., to clearly disclose what, if any information is
              collected by the particular app, how it is used, and with whom it
              is shared. Please note, certain practices are outside of our
              control, for example, tracking by Google, Inc., Apple, Inc., or
              your third party telecommunications carrier. We are not
              responsible for the actions of such third parties. You should
              always read and understand the policies of any third party
              provider, such as Google with respect to Android apps and Apple
              with respect to IOS apps, and your wireless carrier, before making
              any purchase or downloading any app.
            </p>
            <h2>Updates to Privacy Policy</h2>
            <p>
              We may update this privacy policy periodically to reflect changes
              to our privacy practices. We encourage you to periodically review
              this page to ensure you are familiar with those changes. We will
              indicate at the top of this privacy policy when it was most
              recently updated.
            </p>
            <h2>Contact Us</h2>
            <p>
              If you have any questions or comments about this privacy policy or
              the manner in which we or our service providers treat your
              personal information, or to request access to your personal
              information in our records, please contact us at:
            </p>
            <br />
            <p>LoveSet </p>
            <p>+234 901 587 1166</p>
            <p>platle059@gmail.com</p>
            {/*  */}
          </div>

          <div className="modal-footer">
            <button className="accept-button" onClick={modal.handleClose}>
              I Accept
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default PrivacyModal;
