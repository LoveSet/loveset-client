import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Hr,
  Preview,
  Section,
  Text,
  Tailwind,
  Row,
  Column,
} from '@react-email/components';

const Email = () => {
  return (
    <Html>
      <Tailwind>
        <Head>
          <title>Your LoveSet Subscription Has Expired</title>
        </Head>
        <Preview>Your LoveSet subscription has expired. Resubscribe to continue finding your perfect movie matches.</Preview>
        <Body className="bg-[#f5f5f5] font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto my-0 p-[20px]">
            <Section>
              <Heading className="text-[24px] font-bold text-[#0066cc] text-center mb-[24px]">
                Your Subscription Has Expired
              </Heading>
              
              <Text className="text-[16px] text-[#333333] mb-[16px]">
                Hi there,
              </Text>
              
              <Text className="text-[16px] text-[#333333] mb-[16px]">
                We noticed that your LoveSet subscription has expired. This means you'll no longer have access to premium features that help you find your perfect movie matches.
              </Text>
              
              <Section className="bg-[#f0f7ff] p-[16px] rounded-[8px] mb-[24px]">
                <Text className="text-[16px] text-[#333333] mb-[8px]">
                  Without a subscription, you'll miss out on:
                </Text>
                <Text className="text-[16px] text-[#333333] m-0">
                  • Unlimited swipes
                </Text>
                <Text className="text-[16px] text-[#333333] m-0">
                  • Advanced recommendation algorithm
                </Text>
                <Text className="text-[16px] text-[#333333] m-0">
                  • Ad-free experience
                </Text>
                <Text className="text-[16px] text-[#333333] m-0">
                  • Exclusive content
                </Text>
              </Section>
              
              <Text className="text-[16px] text-[#333333] mb-[24px]">
                Don't miss out on discovering your next favorite movies and shows. Resubscribe today to continue enjoying the full LoveSet experience.
              </Text>
              
              <Section className="text-center mb-[24px]">
                <Button
                  className="bg-[#0066cc] text-white font-bold py-[12px] px-[24px] rounded-[8px] no-underline text-center box-border"
                  href="https://loveset.platle.com/app/premium"
                >
                  Resubscribe Now
                </Button>
              </Section>
              
              <Text className="text-[16px] text-[#333333] mb-[24px]">
                If you have any questions about your subscription, please contact our support team.
              </Text>
              
              <Text className="text-[16px] text-[#333333] mb-[24px]">
                Thank you for being part of LoveSet!<br />
                The LoveSet Team
              </Text>
            </Section>
            
            <Hr className="border-[#eeeeee] my-[24px]" />
            
            <Section>
              <Row>
                <Column>
                  <Text className="text-[12px] text-[#666666] m-0">
                    © 2025 LoveSet. All rights reserved.
                  </Text>
                  {/* <Text className="text-[12px] text-[#666666] m-0">
                    123 Movie Lane, Filmville, CA 90210
                  </Text> */}
                </Column>
                <Column className="text-right">
                  <Text className="text-[12px] text-[#666666] m-0">
                    <a href="https://loveset.example.com/unsubscribe" className="text-[#0066cc]">Unsubscribe</a>
                  </Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Email;