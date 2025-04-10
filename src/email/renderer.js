import React from "react";
import { render } from "@react-email/render";
import WelcomeEmail from "./welcome";
import ReferralAwardEmail from "./referralAward";
import SubscriptionExpiredEmail from "./subscriptionExpired";

function Renderer() {
  async function renderEmails() {
    const welcomeHtml = await render(<WelcomeEmail />, {
      pretty: true,
    });
    console.log("welcomeHtml", welcomeHtml);

    const referralAwardHtml = await render(<ReferralAwardEmail />, {
      pretty: true,
    });
    console.log("referralAwardHtml", referralAwardHtml);

    const subscriptionExpiredHtml = await render(<SubscriptionExpiredEmail />, {
      pretty: true,
    });
    console.log("subscriptionExpiredHtml", subscriptionExpiredHtml);
  }

  renderEmails();
  return (
    <div>
      <h1>Email Renderer</h1>
      <p>Check the console for rendered email HTML.</p>
    </div>
  );
}

export default Renderer;
