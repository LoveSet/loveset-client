import * as React from "react";
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
} from "@react-email/components";

const WelcomeEmail = () => {
  return (
    <Html>
      <Tailwind>
        <Head>
          <title>Welcome to LoveSet - Tinder for Movies</title>
        </Head>
        <Preview>Welcome to LoveSet - Find your perfect movie match!</Preview>
        <Body className="bg-[#f5f5f5] font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto my-0 p-[20px]">
            <Section>
              <Heading className="text-[24px] font-bold text-[#5891ff] text-center mb-[24px]">
                Welcome to LoveSet!
              </Heading>

              <Text className="text-[16px] text-[#333333] mb-[16px]">
                Hi there,
              </Text>

              <Text className="text-[16px] text-[#333333] mb-[16px]">
                We're excited to have you join LoveSet - the app that helps you
                find your perfect movie match without wasting time scrolling
                through endless options.
              </Text>

              <Section className="bg-[#f0f7ff] p-[16px] rounded-[8px] mb-[24px]">
                <Text className="text-[16px] text-[#333333] font-bold mb-[8px]">
                  Here's how LoveSet works:
                </Text>
                <Text className="text-[16px] text-[#333333] m-0">
                  1. Swipe right on movies you love
                </Text>
                <Text className="text-[16px] text-[#333333] m-0">
                  2. Swipe left on ones you don't
                </Text>
                <Text className="text-[16px] text-[#333333] m-0">
                  3. Get personalized recommendations that actually match your
                  taste
                </Text>
              </Section>

              <Text className="text-[16px] text-[#333333] mb-[24px]">
                No more wasting time on misleading reviews or platform-limited
                suggestions. Our algorithm learns your unique preferences to
                recommend movies, TV shows, anime, and animations you'll truly
                enjoy.
              </Text>

              <Section className="text-center mb-[24px]">
                <Button
                  className="bg-[#5891ff] text-white font-bold py-[12px] px-[24px] rounded-[8px] no-underline text-center box-border"
                  href="https://LoveSet.example.com/start"
                >
                  Start Swiping Now
                </Button>
              </Section>

              <Text className="text-[16px] text-[#333333] mb-[16px]">
                Ready to discover your next favorite show? Open the app and
                start swiping!
              </Text>

              <Text className="text-[16px] text-[#333333] mb-[24px]">
                Happy swiping!
                <br />
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
                    <a
                      href="https://loveset.platle.com"
                      className="text-[#5891ff]"
                    >
                      Unsubscribe
                    </a>
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

export default WelcomeEmail;
