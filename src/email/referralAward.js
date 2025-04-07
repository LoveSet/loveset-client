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
          <title>You've Earned 10 Extra Swipes on LoveSet!</title>
        </Head>
        <Preview>Congratulations! You've earned 10 extra swipes for inviting a friend to LoveSet</Preview>
        <Body className="bg-[#f5f5f5] font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto my-0 p-[20px]">
            <Section>
              <Heading className="text-[24px] font-bold text-[#0066cc] text-center mb-[24px]">
                You've Earned 10 Extra Swipes!
              </Heading>
              
              <Text className="text-[16px] text-[#333333] mb-[16px]">
                Hi there,
              </Text>
              
              <Text className="text-[16px] text-[#333333] mb-[16px]">
                Great news! Your friend has joined LoveSet using your invitation. As a thank you, we've added <span className="font-bold text-[#0066cc]">10 extra swipes</span> to your account.
              </Text>
              
              <Section className="bg-[#f0f7ff] p-[16px] rounded-[8px] mb-[24px] text-center">
                <Text className="text-[24px] text-[#0066cc] font-bold mb-[8px]">
                  +10 SWIPES
                </Text>
                <Text className="text-[16px] text-[#333333] mb-[0px]">
                  Added to your account
                </Text>
              </Section>
              
              <Text className="text-[16px] text-[#333333] mb-[24px]">
                These extra swipes mean more chances to discover your next favorite movie or show.
              </Text>
              
              <Section className="text-center mb-[24px]">
                <Button
                  className="bg-[#0066cc] text-white font-bold py-[12px] px-[24px] rounded-[8px] no-underline text-center box-border"
                  href="https://loveset.platle.com/app/discover"
                >
                  Use Your Swipes Now
                </Button>
              </Section>
              
              <Text className="text-[16px] text-[#333333] mb-[24px]">
                Happy swiping!<br />
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
                    <a href="https://LoveSet.example.com/unsubscribe" className="text-[#0066cc]">Unsubscribe</a>
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