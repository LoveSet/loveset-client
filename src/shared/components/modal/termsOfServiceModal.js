"use client";
import { Modal, Box } from "@mui/material";
import "../../styles/modals.css";

const TermsOfServiceModal = ({ modal, closeAction = () => {} }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      if (!loading) {
        modal.handleClose();
        closeAction();
      }
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
            <h2 className="modal-title">Terms of Service</h2>
            <p className="modal-subtitle">Last Updated: April 14, 2025</p>
          </div>

          <div className="modal-content terms-content">
            <p>
              Welcome to LoveSet. The following terms of service, (the "Terms")
              govern your access to and use of: (a) our website including any
              content, functionality, offered on or through{" "}
              <a href="https://loveset.platle.com">
                https://loveset.platle.com
              </a>{" "}
              (the "LoveSet Website"); (b) our web application (the "LoveSet
              Application"); (c) includes any text, pictures, media, data, text,
              information and other materials or content (collectively, the
              "Content") contained on or provided through (a) and (b); and (d)
              all other Content, products or services provided by us to you, as
              more particularly described on the LoveSet Website (collectively,
              the "Services").
            </p>

            <p>
              These Terms form an agreement between LoveSet, ("LoveSet", "us",
              "we", "our") and you. The term "you", "your" or "User" refers to
              the person or entity browsing, installing, downloading, accessing
              or otherwise using the Services ("use" or "using" in these Terms
              will mean any of the foregoing).
            </p>

            <h3>By clicking to accept the terms of service, you:</h3>
            <ul>
              <li>Represent and warrant that:</li>
              <li>
                You have reached the legal age of majority in your jurisdiction.
              </li>
              <li>You have the capacity to enter into binding obligations.</li>
              <li>
                All information supplied by you to us through the Services is
                true, accurate, current, and complete.
              </li>
              <li>
                Agree to be bound by and comply with these Terms and the
                relevant terms of the Contract (as defined below and as
                applicable), as updated from time to time.
              </li>
              <li>
                Understand that if you do not agree to these Terms you must not
                access or use the Services.
              </li>
              <li>
                If you are using the Services on behalf of another person or
                corporate entity, you represent and warrant that you have the
                authority to bind such person or entity to these Terms.
              </li>
            </ul>

            <h3>We may collect personal information when you:</h3>

            <h2>Who is the User?</h2>
            <p>
              It is important to remember that you must either be a permitted
              user of an organization or other third party that is a LoveSet
              customer (collectively an "Organization Customer") or a LoveSet
              customer yourself in order to use the Services. In both cases, you
              will need to agree to these Terms before using the Services.
            </p>

            <p>
              If you are a permitted user of an Organization Customer, LoveSet
              has entered into a separate agreement ("Contract") with the
              Organization Customer to access and provide its personnel with
              access to the Services. The Contract contains our commitment to
              deliver the Services to the Organization Customer, who may then
              obtain user accounts for each individual permitted user.
            </p>

            <p>
              If you are a permitted user of an Organization Customer, you shall
              not bring or maintain any claim against LoveSet, its partners,
              employees, officers, directors, affiliates, agents, contractors,
              successors, and assigns and those of its affiliates in respect of
              any matter related to or in connection with the subject matter of
              these Terms. These Terms relate to the Services only. These Terms
              do not alter in any way the terms or conditions of any other
              agreement that may apply to your use of the Services, including
              the Contract.
            </p>

            <h2>Will these Terms or the Services change?</h2>
            <p>
              Yes. We are constantly trying to improve our Services, so these
              Terms may need to change along with our Services.
            </p>

            <h3>Changing these Terms</h3>
            <p>
              Except where prohibited by applicable law, we reserve the right,
              in our sole discretion, to change any element of these Terms at
              any time. When we change these Terms, we will: (i) place a notice
              on the LoveSet Website and the LoveSet Application, send you an
              email, and/or notify you by some other means as required by
              applicable law; (ii) post a new version to the LoveSet Website and
              the LoveSet Application; and (iii) update the "Last Updated" date
              at the top of these Terms. We may require you to provide consent
              to the updated Terms in a specified manner before further use of
              the Services is permitted. If you do not agree to any change(s)
              after receiving a notice of such change(s), you will stop using
              the Services. Otherwise, your continued access to or use of the
              Services after any changes to these Terms indicates your
              acceptance of such changes.
            </p>

            <h3>Changing our Service</h3>
            <p>
              We reserve the right to change the Services at any time, without
              notice. We may, at our discretion, suspend your access to or use
              of the Services or any component thereof: (i) for scheduled
              maintenance; (ii) if you violate any provision of these Terms; or
              (iii) to address any emergency security concerns.
            </p>

            <h3>Updating Third-Party Software</h3>
            <p>
              You may need to update third-party software from time to time in
              order to use the Services.
            </p>

            <h2>3. User Account</h2>
            <h3>Creating a Username and Password</h3>
            <p>
              To access certain features of the Services, you may be required to
              successfully sign up for a user account using the available
              interfaces of the services, and select a username and password
              login credentials (the 'User ID').
            </p>

            <h3>Keeping Your Account Secure</h3>
            <p>
              If you select a User ID, you will keep your User ID secure and
              will not grant access to or otherwise share your User ID with any
              other person.
            </p>

            <h3>Providing Accurate Information</h3>
            <p>
              You must provide us with true, accurate, current and complete
              information for your User ID. If we believe or suspect that your
              information is not true, accurate, current or complete, we may
              deny or terminate your access to the Services.
            </p>

            <h3>Disabling Accounts</h3>
            <p>
              We reserve the right to disable any User ID issued to you at any
              time in our sole discretion. If we disable access to a User ID
              issued to you, you may be prevented from accessing the Services
              (or any portion thereof).
            </p>

            <h3>Using Third Party Accounts</h3>
            <p>
              In order to create an Account, you will need to connect your
              calendar(s). You can also access certain parts of features of the
              Services by using your account credentials from other platforms
              (collectively with your calendar(s), the "Third Party Accounts").
              By connecting a Third Party Account and using the Services through
              a Third Party Account, you permit us to access certain information
              from it, consistent with you Third Party Account's settings. You
              can control how much information we have access to by adjusting
              these settings.
            </p>

            <h3>Responsible Use of Your Account</h3>
            <p>
              LoveSet is entitled to act on instructions received through your
              account. LoveSet is not responsible for any actions taken or
              transactions made to or from your account by any other party using
              your User ID. You are solely responsible for any and all use of
              your User ID and all activities that occur under or in connection
              with the User ID. Without limiting any rights which we may
              otherwise have, we reserve the right to take any and all action,
              as we deem necessary or reasonable, to ensure the security of the
              Services and your account, including without limitation
              terminating your account and changing your password. You agree to
              be responsible for any act or omission of any users that access
              the Services under your User ID that, if undertaken by you, would
              be deemed a violation of these Terms.
            </p>

            <h2> 4. Electronic Communications</h2>
            <h3>Communicating Together Electronically</h3>
            <p>
              When you use or view the Services or send emails, texts or other
              electronic messages to us, you are communicating with us
              electronically and you consent to receive communications from us
              electronically. We will communicate with you by email, instant
              messenger services, in the app or by posting notices on the
              Services. You agree that all agreements, notices, disclosures and
              other communications that we provide to you electronically satisfy
              any legal requirement that such communications be in writing.
            </p>

            <h3>Service-Related Emails</h3>
            <p>
              By creating an account to access the Services, you acknowledge and
              agree that LoveSet will send you service-related emails relating
              to your account, including service updates. These communications
              can be managed through user features made available through the
              Services from time to time. Your consent to receive communications
              and do business electronically, and our agreement to do so,
              applies to all of your interactions and transactions with us. You
              may withdraw your consent to receive communications electronically
              by contacting us in the manner described below. If you withdraw
              your consent (excluding consent to receive marketing
              communications), from that time forward, you must stop using the
              Services. The withdrawal of your consent will not affect the legal
              validity and enforceability of any obligations or any electronic
              communications provided, or business transacted between us prior
              to the time you withdraw your consent. Please keep us informed of
              any changes in your email or mailing address so that you continue
              to receive all communications without interruption.
            </p>

            <h3>Marketing Related Emails</h3>
            <p>
              If you are a member of our mailing list you may also receive email
              communications from us regarding our products, services and
              initiatives. If you do not wish to receive these communications,
              you can unsubscribe from such promotional emails at any time by
              clicking on the unsubscribe link in any of our email
              communications.
            </p>

            <h2>5. User Data and User Submission</h2>

            <h3>Privacy</h3>
            <p>
              At LoveSet, we take your privacy seriously. Please review our
              current privacy policy, available at
              loveset.platle.com/privacy-policy, which contains important
              information about our practices in collecting, storing, using and
              disclosing information about identifiable individuals ("Personal
              Information"), and which is hereby incorporated into and forms a
              part of these Terms.
            </p>

            <h3>License for User Submissions and Data</h3>
            <p>
              You grant to us and our service providers, and each of their and
              our respective licensees, successors and assigns, an irrevocable,
              worldwide, non-exclusive, royalty-free, transferable and
              sublicensable licence to access, collect, store and use any data,
              information, records or files that you load, transmit to or enter
              into, or that we collect from, the Services (collectively, "User
              Data"): (i) to develop, enhance and make available the Services;
              and (ii) to produce data, information, or other materials that are
              not identified as relating to a particular individual or company
              (such data, information and materials, the "Aggregated Data").
            </p>

            <h3>Aggregated Data</h3>
            <p>
              We and our service providers, and each of their and our respective
              licensees, successors and assigns are free to create, use and
              disclose Aggregated Data during and after the Term for any purpose
              and without obligations of any kind.
            </p>

            <h3>Granting License to Other Users</h3>
            <p>
              When you as a user post or publish Content that you upload, post,
              email, transmit or otherwise make available on the Services ("User
              Submission"), you grant each user of the Services that you
              identify in the Services in a non-exclusive, perpetual license to
              access the User Submission through the Services, and to use, edit,
              modify, reproduce, distribute, prepare derivative works of,
              display and perform such User Submission including after your
              termination of your account or the Services.
            </p>

            <h3>Restricting Access</h3>
            <p>
              We reserve the right to remove, edit, limit, or block access to
              the User Data and the User Submission at any time and from time to
              time, and to disable or terminate your account, any username,
              password, or other identifier, whether chosen by you or provided
              by us, in our sole discretion for any or no reason, including any
              violation of any provision of these Terms. We have no obligation
              to display or review your User Data or the User Submission.
            </p>

            <h3>Responsibility for User Submissions</h3>
            <p>
              You understand and agree that you, and not the LoveSet Parties (as
              defined below), are fully responsible for all of the User
              Submission, and you are fully responsible and legally liable,
              including to any third party, for such content and its accuracy.
              The LoveSet Parties are not responsible or legally liable to any
              third party for the content or accuracy of any of the User
              Submission or such content uploaded, posted, emailed, transmitted
              or otherwise made publicly available on the Services by any other
              user.
            </p>

            <h3>Loss of User Data</h3>
            <p>
              To the extent permitted by applicable law, LoveSet will not be
              liable for any failure to store, or for loss or corruption of your
              User Data.
            </p>

            <h3>Authority to Submit Data</h3>
            <p>
              You represent and warrant to us that your User Data and the User
              Submission will only contain Personal Information in respect of
              which you have provided all necessary notices and disclosures,
              obtained all applicable third party consents and permissions and
              otherwise have all authority, in each case as required by
              applicable laws, to enable us to make available the Services.
            </p>

            <h3>Rights to Submit Data</h3>
            <p>
              You represent and warrant to us that: (a) you own or control the
              appropriate rights in and to your User Data and the User
              Submission, including any intellectual property owned by third
              parties and including the right to grant the licenses to the User
              Submission contained herein; and (b) you will not submit, upload,
              or otherwise make available via the Services, any User Data that:
              (i) you do not have the rights necessary to use, transmit,
              publish, or to grant us the license as described herein; (ii)
              infringe, misappropriate, or otherwise violate any intellectual
              property, publicity or other rights of any third party; or (iii)
              breach or violate any applicable laws or these Terms.{" "}
            </p>

            <h2> 6. Ownership of Services</h2>
            <h3>Ownership</h3>
            <p>
              Neither these Terms nor your use of the Services grants you
              ownership in the Services or the Content you access through the
              Services. These Terms do not grant you any right to use LoveSet's
              trademarks or other brand elements. All right, title and interest,
              including intellectual property rights, in the Services, the
              source code in the software we use to provide the Services (the
              "Software") and all other materials provided by us hereunder, and
              any updates, adaptation, translation, customization or derivative
              works thereof, will remain the sole property of LoveSet (or our
              third-party suppliers, if applicable).
            </p>

            <h3>Providing Services</h3>
            <p>
              The Services and all materials provided by us hereunder are made
              available and not "sold" to you.
            </p>

            <h3>Copyright</h3>
            <p>
              The Software and all other materials provided by us hereunder,
              including content we make available through or in the Services,
              are protected by copyright in Canada, the United States and
              elsewhere in the world pursuant to the Berne Convention. You are
              prohibited from modifying, copying, reproducing, publishing,
              posting, transmitting, distributing, creating derivative works
              from, decompiling, transferring or selling any of the Services,
              the Software or other materials provided by us hereunder, or
              sharing or granting access in any of the foregoing to any third
              party for any purpose.
            </p>

            <h3>Reserved Rights</h3>
            <p>
              All rights not expressly granted to you in these Terms are
              reserved by LoveSet.
            </p>

            <h2> 7. License to the Services </h2>
            <p>
              Subject to these Terms, we grant you a worldwide, non-exclusive,
              non-transferable, non-sublicensable and revocable licence during
              the Term to use the Services, including to download and display
              local Content solely in connection with using the Services, in
              accordance with these Terms.
            </p>

            <h2>Your Responsibilities</h2>
            <ol>
              <li>
                Use reasonable efforts to prevent unauthorized access to or use
                of the Services.
              </li>
              <li>
                Keep your User IDs and all other login information confidential.
              </li>
              <li>
                Not register for more than one account, register for an account
                on behalf of an individual other than yourself without such
                individual's authorization, or register for an account on behalf
                of any group or entity.
              </li>
              <li>
                Monitor and control all activity conducted through your account
                in connection with the Services.
              </li>
              <li>
                upload and disseminate only data to which you own all required
                rights under law and do so only consistent with applicable law;
              </li>
              <li>
                upload and disseminate only data to which you own all required
                rights under law and do so only consistent with applicable law;
              </li>
              <li>
                keep your email address and, where applicable, your contact
                details associated with your account current and accurate;
              </li>
              <li>
                promptly notify us if you become aware or reasonably suspect any
                illegal or unauthorized activity or a security breach involving
                your account, including any loss, theft, or unauthorized
                disclosure or use of a User ID or account;
              </li>
              <li>
                not use anyone else's User ID at any time, without the
                permission of the User ID holder;
              </li>
              <li>
                not attempt, in any manner, to obtain the password, account, or
                other security information from any other user;
              </li>
              <li>
                comply with all applicable laws and regulations, including, but
                not limited to, all intellectual property, data, and privacy
                laws.
              </li>
            </ol>

            <h2>9. No Unlawful or Prohibited Use</h2>
            <p>
              You will not use the Services in violation of these Terms or of
              any applicable law. You will not, without our prior written
              permission, use the Services for any purpose other than to access
              and use the Services. Without limiting the generality of the
              foregoing, you will not (and will not attempt to) directly or
              indirectly:
            </p>

            <ul></ul>

            <ul>
              <li>
                Disable, overly burden, impair, or otherwise interfere with
                servers or networks connected to the Services (e.g., a
                denial-of-service attack).
              </li>
              <li>
                Attempt to gain unauthorized access to the Services, or bypass
                any measures we may use to prevent or restrict access to the
                Services.
              </li>
              <li>
                send, upload, collect, transmit, store, use, post, publish, or
                otherwise communicate on the Services any data, information,
                pictures, videos, audio or other materials or content that: (i)
                contains any computer viruses, worms, malicious code, or any
                software intended to damage or alter a computer system or data;
                (ii) you do not have the lawful right to send, upload, collect,
                transmit, store, use, post, publish, or otherwise communicate;
                (iii) is false, inaccurate, intentionally misleading, or
                impersonates any other person; (iv) gives the impression that it
                originates from or is endorsed by us or any other person or
                entity, if that is not the case; (v) is defamatory, bullying,
                harassing, abusive, threatening, vulgar, exploitative, obscene,
                harmful, sexually explicit, inflammatory, offensive or
                discriminatory based on race, sex, religion, nationality,
                disability, sexual orientation, or age or other such legally
                prohibited ground, or that contains pornography, nudity, or
                graphic or gratuitous violence, or that promotes violence,
                racism, discrimination, bigotry, hatred, or physical harm of any
                kind against any group or individual, or is otherwise
                objectionable, such determination to be made in LoveSet's sole
                discretion; (vi) is harmful to minors in any way or targeted at
                minors; (vii) infringes, violates or otherwise misappropriates
                the intellectual property or other rights of any third party
                (including any moral right, privacy right or right of
                publicity); (viii) violates, or encourages any conduct that may
                violate, any applicable laws or would give rise to civil or
                criminal liability; or (ix) discloses or provides information
                protected under any law, agreement or fiduciary relationship,
                including proprietary or confidential information of others.
              </li>
              <li>
                use any data mining, robots, or similar data gathering or
                extraction methods, or copy, modify, reverse engineer, reverse
                assemble, disassemble, or decompile the Services or any part
                thereof or otherwise attempt to discover any source code; use
                the Services for the purpose of building a similar or
                competitive product or service;
              </li>
              <li>
                in any manner violate the Terms of any third party website that
                is linked to the Services, including, but not limited to, any
                third party social media website;
              </li>
              <li>
                impersonate or attempt to impersonate the LoveSet, a LoveSet
                employee, another user, or any other person or entity
                (including, without limitation, by using email addresses or
                screen names associated with any of the foregoing);
              </li>
              <li>
                encourage any other conduct that restricts or inhibits anyone's
                use or enjoyment of the Services, or which, as determined by us,
                may harm the LoveSet or users of the Services or expose them to
                liability;
              </li>
              <li>
                promote any illegal activity or advocate, promote, or assist any
                unlawful act;
              </li>
              <li>
                share, transfer or otherwise provide access to an account
                designated for you to another person;
              </li>
              <li>
                use the Services other than for the benefit of the Organization
                Customer that has entered into an agreement to access the
                Services and who has granted you a right of access;
              </li>
              <li>
                cause annoyance, inconvenience, or needless anxiety or use the
                Services in a manner that is likely to upset, embarrass, or
                alarm any other person; or
              </li>
              <li>
                authorize, permit, enable, induce or encourage any third party
                to do any of the above.
              </li>
            </ul>

            <h2>10. Communications</h2>
            <ul>
              <li>
                You are solely responsible for your interactions with other
                users of the Services, including any communications that you
                exchange through the Services.
              </li>
              <li>
                Though we strive to enforce the Terms above with all of our
                users, you may be exposed through the Services to Content that
                violates our policies or is otherwise offensive. You access the
                Services at your own risk. We may, but are not obligated to,
                remove Content from the Services for any reason, including if we
                determine or suspect that such Content violates these Terms. We
                are merely acting as a passive conduit for such distribution and
                we take no responsibility for your exposure to Content on the
                Services whether it violates our content policies or not. To the
                fullest extent permitted by applicable law, you hereby release
                us from all liability for you having acquired or not acquired
                Content through the Services.
              </li>
            </ul>

            <h2>11. Communications Not Confidential</h2>
            <p>
              We do not guarantee the confidentiality of any communications made
              by you through the Services. We do not guarantee the security of
              data transmitted over the Internet or public networks in
              connection with your use of the Services.
            </p>

            <h2> 12. Feedback</h2>
            <p>
              You agree that any suggestion or idea provided by you (such
              suggestions or ideas, "Feedback") will not be treated as
              confidential, and nothing in these Terms will restrict our right
              to use, profit from, disclose, publish or otherwise exploit any
              Feedback, without compensation to you and without any obligation
              to you. You grant to us and our affiliates and service providers,
              and each of their and our respective licensees, successors, and
              assigns, a fully paid up, perpetual, irrevocable, worldwide,
              royalty-free, non-exclusive and fully sublicensable right
              (including any moral rights) and license to use, license,
              distribute, reproduce, modify, adapt, translate, distribute,
              publicly perform, publicly display, import, sell, offer for sale,
              make, have made, derive revenue or other remuneration from, and
              otherwise exploit and disclose to third parties the Feedback in
              any form, media, or technology, whether now known or hereafter
              developed, and to allow others to do the same. This is true
              whether you provide the Feedback on the Services or through any
              other method of communication with us, unless we have entered into
              a separate agreement with you that provides otherwise. You will
              not have any claim, including, without limitation, claims based
              upon invasion of privacy, defamation or right of publicity,
              arising out of any use, alteration, blurring, distortion or use in
              composite form of any Feedback. Except as prohibited by law, you
              hereby waive, and you agree to waive, any moral and author's
              rights (including attribution and integrity) that you may have in
              any Feedback, even if it is altered or changed in a manner not
              agreeable to you.
            </p>

            <h2>13. Malicious Code and Security</h2>
            <p>
              The downloading and viewing of Content is done at your own risk.
              We do not guarantee or warrant that the Services is compatible
              with your computer system or mobile device or that the Services,
              or any links from the Services, will be free of viruses, worms,
              trojan horses or disabling devices or other code that manifests
              contaminating or destructive properties. You are responsible for
              implementing safeguards to protect the security and integrity of
              your computer system and/or mobile device, and you are responsible
              for the entire cost of any service, repairs or connections of and
              to your computer system and/or mobile device that may be necessary
              as a result of your use of the Services.
            </p>

            <h2>14. Disclaimer</h2>
            <p>
              THE LAWS OF CERTAIN JURISDICTIONS, WHICH MAY INCLUDE QUEBEC, DO
              NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN LEGAL WARRANTIES,
              CONDITIONS OR REPRESENTATIONS. IF THESE LAWS APPLY TO YOU, SOME OR
              ALL OF THE EXCLUSIONS OR LIMITATIONS IN THESE TERMS (INCLUDING THE
              FOLLOWING DISCLAIMERS) MAY NOT APPLY AND YOU MAY HAVE ADDITIONAL
              RIGHTS. TO THE EXTENT THAT WE MAY NOT, AS A MATTER OF APPLICABLE
              LAW, DISCLAIM ANY IMPLIED WARRANTY OR CONDITION, THE SCOPE AND
              DURATION OF SUCH WARRANTY OR CONDITION WILL BE THE MINIMUM
              PERMITTED UNDER SUCH APPLICABLE LAW.{" "}
            </p>

            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, YOU
              ACKNOWLEDGE, UNDERSTAND, AND AGREE THAT THE SERVICES ARE PROVIDED
              “AS IS” AND “AS AVAILABLE”, WITH ALL FAULTS AND WITHOUT WARRANTIES
              OR CONDITIONS OF ANY KIND. EXCEPT FOR ANY SPECIFIC WARRANTIES
              PROVIDED OR AS OTHERWISE REQUIRED BY LAW, TO THE FULLEST EXTENT
              PERMITTED BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES,
              REPRESENTATIONS AND CONDITIONS OF ANY KIND WITH RESPECT TO THE
              SERVICES, WHETHER EXPRESS, IMPLIED, STATUTORY OR COLLATERAL,
              INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES AND CONDITIONS OF
              MERCHANTABILITY, QUALITY, DURABILITY, COMPATIBILITY, TITLE,
              SECURITY, RELIABILITY, COMPLETENESS, QUIET ENJOYMENT, ACCURACY,
              CURRENCY, TIMELINESS, INTEGRATION, FITNESS FOR A PARTICULAR OR
              GENERAL PURPOSE AND NON-INFRINGEMENT, AND/OR ANY WARRANTIES OR
              CONDITIONS ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE,
              AND/OR THAT THE SERVICES ARE OR WILL BE ERROR-FREE OR WILL OPERATE
              WITHOUT INTERRUPTION.
            </p>

            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM ALL
              WARRANTIES, REPRESENTATIONS AND CONDITIONS OF ANY KIND WITH
              RESPECT TO THIRD PARTY COMMUNICATIONS AND ANY THIRD PARTY WEBSITES
              OR CONTENT DIRECTLY OR INDIRECTLY ACCESSED THROUGH THE
              SERVICES.{" "}
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
              WILL WE OR OUR AFFILIATES OR OUR OR THEIR RESPECTIVE OFFICERS,
              DIRECTORS, SHAREHOLDERS, EMPLOYEES, CONTRACTORS, AGENTS,
              LICENSORS, LICENSEES AND SERVICES PROVIDERS AND ANY SUCCESSORS AND
              ASSIGNS OF THE FOREGOING (COLLECTIVELY WITH READY, THE "READY
              PARTIES") BE LIABLE, WHETHER BASED ON WARRANTY, CONTRACT, TORT,
              NEGLIGENCE, STRICT LIABILITY OR ANY OTHER LEGAL THEORY, FOR ANY
              INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY OR
              PUNITIVE DAMAGES; OR LOST PROFITS, LOSS OF USE, LOSS OF DATA,
              PERSONAL INJURY, FINES, FEES, PENALTIES OR OTHER LIABILITIES, IN
              EACH CASE, WHETHER OR NOT WE WERE ADVISED OR SHOULD HAVE KNOWN OF
              THE POSSIBILITY OF SUCH DAMAGES, RESULTING FROM OR RELATED TO THE
              SERVICES OR THE INABILITY TO MAKE USE OF THE SERVICES, OR THESE
              TERMS. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SERVICES,
              YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USE OF THE
              SERVICES.
            </p>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
              WILL OUR TOTAL AGGREGATE LIABILITY IN CONNECTION WITH OR UNDER
              THESE TERMS, OR YOUR USE OF, OR INABILITY TO MAKE USE OF, THE
              READY SERVICES, EXCEED $70 USD. FOR GREATER CERTAINTY, THE
              EXISTENCE OF ONE OR MORE CLAIMS UNDER THESE TERMS WILL NOT
              INCREASE THIS MAXIMUM LIABILITY AMOUNT.
            </p>
            <p>
              Without limiting the foregoing, under no circumstances will any of
              the LoveSet Parties be held liable for any delay or failure in
              performance resulting directly or indirectly from acts of nature,
              forces, or causes beyond our or their reasonable control,
              including, without limitation, Internet failures, computer
              equipment failures, telecommunication equipment failures, other
              equipment failures, electrical power failures, strikes, labour
              disputes, riots, insurrections, civil disturbances, shortages of
              labour or materials, fires, floods, storms, explosions, pandemics,
              acts of God, war, governmental actions, orders of domestic or
              foreign courts or tribunals, or non-performance of third parties.
            </p>

            <h2>Payment</h2>

            <h3>Submitting Payment Information</h3>
            <p>
              If you sign up for a paid LoveSet account, you will need to
              provide LoveSet, or if applicable, a third-party payment processor
              (the “Payment Processor”) with the information necessary to
              process a payment from you, including billing information. The
              processing of payments will be subject to the terms, conditions,
              and privacy policies of the Payment Processor, if any, in addition
              to these Terms. We are not responsible for any error by, or other
              acts or omissions of, any Payment Processor.
            </p>

            <p>
              Our order process is conducted by our online reseller Paddle.com.
              Paddle.com is the Merchant of Record for all our orders. Paddle
              provides all customer service inquiries and handles returns.
            </p>

            <h3>Payment Authorization</h3>
            <p>
              By submitting your payment information to us or the Payment
              Processor, you authorize us or the Payment Processor to charge the
              applicable payment method at our or their convenience (but within
              thirty (30) days of credit card authorization). You represent and
              warrant that you will not use any credit card or other form of
              payment unless you have all necessary authorization to do so. The
              terms of your payment will be based on your chosen payment
              provider and may be determined by agreements between you and the
              financial institution, credit card issuer, or other provider of
              your chosen payment method. If we, either through the Payment
              Processor or otherwise, do not receive payment from you, you agree
              to pay all amounts due on your billing account upon demand.
            </p>

            <h3>Accurate and Updated Billing Information</h3>
            <p>
              You must provide current, complete, and accurate information for
              your billing account. You must promptly update all information to
              keep your billing account current, complete, and accurate (such as
              a change in billing address, credit card number, or credit card
              expiration date), and you must promptly notify us or the Payment
              Processor as applicable if your payment method is canceled (e.g.,
              for loss or theft) or if you become aware of a potential breach of
              security, such as the unauthorized disclosure or use of your
              username or password. Changes to such information can be made in
              your account settings. If you fail to provide any of the foregoing
              information, you agree that we may continue charging you for any
              use of paid services under your billing account.
            </p>

            <h3>Changes To Billing Amounts</h3>
            <p>
              If the amount to be charged to your billing account varies from
              the amount you preauthorized (other than due to the imposition or
              change in the amount of applicable sales taxes), you have the
              right to receive, and we will provide, notice of the amount to be
              charged and the date of the charge before the scheduled date of
              the transaction. Any agreement you have with your payment provider
              will govern your use of your payment method of choice. You agree
              that we may accumulate charges incurred and submit them as one or
              more aggregate charges during or at the end of each billing cycle.
            </p>

            <h3>Refund Policy</h3>
            <p>
              All purchases are non-refundable unless required by law. For
              example, users living in the European Union have the right to
              cancel their Paid Account subscriptions and obtain a refund within
              14 days of signing up for, upgrading to, or renewing a Paid
              Account by contacting our support channels. You can cancel your
              subscription at any time by logging into your account. Your
              cancellation will take effect at the end of the current paid term.
              If you have any questions or are unsatisfied with our Services,
              please email us at platle059@gmail.com.
            </p>

            <h2>18. Term and Termination; Survival</h2>
            <h3>Term and Termination</h3>
            <p>
              These Terms will commence on the day you first use the Services
              and will remain in effect until the earlier of (a) termination by
              either party in accordance with the provisions of these Terms or
              (b) the termination or expiration of the Contract (collectively,
              the "Term"). We may terminate these Terms at any time and with
              immediate effect by giving notice to you or the Organization
              Customer, at our discretion, by email or through the Services. You
              may terminate these Terms at any time and with immediate effect by
              contacting us and requesting we do so, or by deleting your account
              in the account settings. . For greater certainty, if you continue
              to use any portion of the Services that is publicly available
              after these Terms have been terminated, these Terms will continue
              to apply to the extent of such use.
            </p>

            <h3>Survival</h3>
            <p>
              The following Sections, together with any other provision of these
              Terms which expressly or by its nature survives termination or
              expiration, or which contemplates performance or observance
              subsequent to termination or expiration of these Terms, will
              survive expiration or termination of these Terms for any reason:
              Sections 5 (User Data and User Submission), 6 (Ownership of the
              Services), 11 (Communications Not Confidential), 13 (Malicious
              Code and Security), 14 (Disclaimer), 15 (Limitation of Liability),
              16 (Indemnification), 18(b) (Survival), and 19 (General
              Provisions).
            </p>

            <h2>19. General Provisions</h2>

            <h3>Choice of Law</h3>
            <p>
              Except as restricted by applicable law, these Terms will be
              governed by the laws of Nigeria without giving effect to any
              principles of conflicts of law, and such laws apply to your access
              to or use of the Services, notwithstanding your domicile,
              residency, or physical location. You will only use the Services in
              jurisdictions where the Services may lawfully be used. Except as
              restricted by applicable law, you hereby consent to the exclusive
              jurisdiction and venue of courts in Nigeria in all disputes
              arising out of or relating to the use of the Services. The U.N.
              Convention on Contracts for the International Sale of Goods will
              not apply to these Terms. This choice of jurisdiction does not
              prevent us from seeking injunctive relief with respect to a
              violation of intellectual property rights or confidentiality
              obligations in any appropriate jurisdiction.
            </p>

            <h3>Entire Agreement</h3>
            <p>
              These Terms constitute the entire agreement between you and us
              pertaining to the subject matter hereof and supersede all prior or
              contemporaneous communications and proposals, whether electronic,
              oral, or written, between you and us with respect to the Services.
              A printed version of these Terms and of any notice given in
              electronic form will be admissible in judicial or administrative
              proceedings based upon or relating to these Terms to the same
              extent and subject to the same conditions as other business
              documents and records originally generated and maintained in
              printed form.
            </p>

            <h3>Waiver</h3>
            <p>
              Our failure to insist upon or enforce strict performance of any
              provision of these Terms will not be construed as a waiver of any
              provision or right. A waiver of any provision of these Terms must
              be in writing and a waiver in one instance will not preclude
              enforcement of such provision on other occasions.
            </p>

            <h3>Severable</h3>
            <p>
              If any of the provisions contained in these Terms are determined
              to be void, invalid, or otherwise unenforceable by a court of
              competent jurisdiction, such provision will be severed from these
              Terms and all other provisions of these Terms will remain in full
              force and effect.
            </p>

            <h3>Assignment</h3>
            <p>
              You will not assign these Terms to any third party without our
              prior written consent. We may assign these Terms or any rights
              under these Terms to any third party without your consent. Any
              attempted assignment, subcontract, delegation, or transfer in
              violation of this Section will be null and void. The terms of
              these Terms will be binding upon permitted assignees. These Terms
              will inure to the benefit of and be binding upon the parties,
              their permitted successors, and permitted assignees.
            </p>

            <h3>Dispute Resolution</h3>
            <p>
              If you believe that LoveSet has not adhered to these Terms, please
              contact LoveSet using the contact information listed below. We
              will do our best to address your concerns. If you feel that your
              complaint has been addressed incompletely, we invite you to let us
              know for further investigation.
            </p>

            <h3>English Language</h3>
            <p>
              It is the express wish of the parties that these Terms and all
              related documents be drawn up in English. C'est la volonté
              expresse des parties que la présente convention ainsi que les
              documents qui s'y rattachent soient rédigés en anglais.
            </p>

            <h2>20. Contact</h2>
            <p>
              If you have any questions or comments regarding these Terms,
              please contact us at platle059@gmail.com.
            </p>
            {/*  */}

            {/*
            <div className="terms-section">
              <h3>Welcome to MovieMatch</h3>
              <p>
                The following terms of service govern your access to and use of:
                (a) our website including any content, functionality, offered on
                or through moviematch.com (the "MovieMatch Website"); (b) our
                web application (the "MovieMatch Application"); (c) includes any
                text, pictures, media, data, text, information and other
                materials or content (collectively, the "Content") contained on
                or provided through (a) and (b); and (d) all other Content,
                products or services provided by us to you.
              </p>
            </div>

            <div className="terms-section">
              <h3>Agreement</h3>
              <p>
                These Terms form an agreement between MovieMatch, ("MovieMatch",
                "us", "we", "our") and you. The term "you", "your" or "User"
                refers to the person or entity browsing, installing,
                downloading, accessing or otherwise using the Services ("use" or
                "using" in these Terms will mean any of the foregoing).
              </p>
            </div>

            <div className="terms-section">
              <h3>By clicking to accept the terms of service, you:</h3>
              <ul>
                <li>
                  Represent and warrant that you have reached the legal age of
                  majority in your jurisdiction.
                </li>
                <li>
                  You have the capacity to enter into binding obligations.
                </li>
                <li>
                  All information supplied by you to us through the Services is
                  true, accurate, current, and complete.
                </li>
                <li>
                  Agree to be bound by and comply with these Terms and the
                  relevant terms of the Contract (as defined below and as
                  applicable).
                </li>
              </ul>
            </div>

            <div className="terms-section">
              <h3>Privacy Policy</h3>
              <p>
                Our Privacy Policy describes how we handle the information you
                provide to us when you use our Services. You understand that
                through your use of the Services you consent to the collection
                and use of this information.
              </p>
            </div>

            <div className="terms-section">
              <h3>Subscription and Billing</h3>
              <p>
                MovieMatch offers both free and premium subscription options. By
                subscribing to MovieMatch Premium, you agree to the recurring
                billing terms. Your subscription will automatically renew at the
                end of each billing period unless you cancel before the renewal
                date.
              </p>
            </div> */}
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

export default TermsOfServiceModal;
