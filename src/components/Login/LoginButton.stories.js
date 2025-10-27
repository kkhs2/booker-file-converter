import { Carousel as HeroCarousel } from '../Hero/Hero.stories';
import NavBar from '../NavBar/NavBar';
import { LongMenu } from '../NavBar/NavBar.stories';
import MenuCard from '../../components/MenuCard/MenuCard';
import { AwardRail } from '../AwardCard/AwardCard.stories';
import { ExternalImage } from '../PromotionsBanner/PromotionsBanner.stories';
import PromotionsBanner from '../PromotionsBanner/PromotionsBanner';
import { Default as Footer } from '../Footer/Footer.stories';
import { FeatureCardRail } from '../FeatureCard/FeatureCard.stories';
import { WithBackgroundImage } from '../PromotionsBanner/PromotionsBanner.stories';
import { AllBenefitCards } from '../BenefitCard/BenefitCard.stories';
import FeatureCard from '../FeatureCard/FeatureCard';
import RailSection from '../RailSection/RailSection';
import ArticleCard from '../ArticleCard/ArticleCard';
import { faker } from '@faker-js/faker';
import {
  QuoteLeft,
  QuoteCenter,
  QuoteRight,
} from '../QuoteCard/QuoteCard.stories';
import QuoteCarousel from '../QuoteCard/components/QuoteCarousel';
import QuoteCard from '../QuoteCard/QuoteCard';
import { ProductCardRailSection } from '../ProductCard/ProductCard.stories';
import ContactSection from '../ContactCards/ContactSection';
import ContactCard from '../ContactCards/ContactCard';
import Hero from '../Hero/Hero';
import { SearchProducts } from '../../../utils/mockData';
import Container from '../../components/Container/Container';

// Define the story configuration
export default {
  // The title under which the Login component will appear in Storybook's navigation
  title: 'Pages/Login',
  parameters: {
    layout: 'fullscreen',

    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FAF9F5',
        },
      ],
    },
  },
};

export const Default = {
  render: () => {
    return (
      <div className="tw:bg-secondary-1000">
        <Container classname="tw:mt-[60px] tw:mb-0 tw:lg:mt-[100px] tw:lg:mb-0 tw:px-5 tw:lg:px-16">
          {/* nav bar */}
          <NavBar {...LongMenu.args} searchresultslist={SearchProducts} />
        </Container>

        <Container classname="tw:mt-3 tw:lg:mt-4 tw:mb-4 tw:lg:mb-[68px]">
          {/* hero section */}
          <Hero {...HeroCarousel.args} />
        </Container>

        <Container
          variant="full"
          rail={true}
          classname="tw:mt-8 tw:lg:mt-[54px] tw:mb-0 tw:lg:mb-0 tw:px-0"
        >
          {/* benefit cards section */}
          {AllBenefitCards.render()}
        </Container>

        <Container variant="full" rail={true}>
          {/* menu cards section */}
          <RailSection
            title="Supporting businesses like yours"
            desktopstyle="grid"
            gridcols={4}
            shownavigation={false}
            titleclassname="tw:lg:px-0"
          >
            <MenuCard
              label="Pubs & Bars"
              image="./images/cards/pubs-and-bars.png"
              url="http://booker.co.uk"
              classname="tw:aspect-[5/4]"
            />
            <MenuCard
              label="Restaurants"
              image="./images/cards/pubs-and-bars.png"
              url="http://booker.co.uk"
              classname="tw:aspect-[5/4]"
            />
            <MenuCard
              label="Coffee Shops & Cafes"
              image="./images/cards/pubs-and-bars.png"
              url="http://booker.co.uk"
              classname="tw:aspect-[5/4]"
            />
            <ContactCard
              title="Want to find out how we can help you and your business?"
              variant="primary"
              icon="talk-to-team"
              href="#"
              label="Get in touch"
              classname="tw:text-3xl"
              railversion={true}
            />
            <MenuCard
              label="Events"
              image="./images/cards/pubs-and-bars.png"
              url="http://booker.co.uk"
              classname="tw:aspect-[5/4]"
            />
            <MenuCard
              label="Independent Shops"
              image="./images/cards/pubs-and-bars.png"
              url="http://booker.co.uk"
              classname="tw:aspect-[5/4]"
            />
            <MenuCard
              label="Independent Shops"
              image="./images/cards/pubs-and-bars.png"
              url="http://booker.co.uk"
              classname="tw:aspect-[5/4]"
            />
            <MenuCard
              label="Independent Shops"
              image="./images/cards/pubs-and-bars.png"
              url="http://booker.co.uk"
              classname="tw:aspect-[5/4]"
            />
          </RailSection>
        </Container>

        <Container variant="overflow" rail={true}>
          {/* feature products carousel */}
          {ProductCardRailSection.render()}
        </Container>

        <Container variant="full" rail={true}>
          {/* current offers */}
          {FeatureCardRail.render()}
        </Container>

        <Container>
          {/* promo banner */}
          <PromotionsBanner {...WithBackgroundImage.args} />
        </Container>

        <Container>
          {/* Quote Cards */}
          <QuoteCarousel title="What our customers think.">
            <QuoteCard {...QuoteLeft.args} />
            <QuoteCard {...QuoteCenter.args} />
            <QuoteCard {...QuoteRight.args} />
          </QuoteCarousel>
        </Container>

        <Container variant="full" rail={true}>
          {/* Services for you section */}
          <RailSection
            title="Services for you"
            description="8 suggestions"
            carouseloptions={{
              slidesOffsetBefore: 20,
              slidesOffsetAfter: 20,
              slidesPerView: 1.25,
              spaceBetween: 12,
              breakpoints: {
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1312: {
                  freeMode: false,
                  slidesPerView: 4,
                  slidesOffsetBefore: 0,
                  slidesOffsetAfter: 0,
                },
              },
            }}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <FeatureCard
                key={index}
                image="./images/steak.jpeg"
                title={faker.lorem.words({ min: 2, max: 4 })}
                description={faker.lorem.sentence()}
                cta="Find your local branch"
                variant="primary-inverse"
                border
              />
            ))}
          </RailSection>
        </Container>

        <Container variant="full" background="tw:bg-beige-1000" rail={true}>
          {/* articles section */}
          <RailSection
            title="Insights and inspiration"
            titleclassname="tw:lg:px-0"
            description="Helping your business run more smoothly with insight, guides, and inspiration to help your business thrive."
            descriptionclassname="tw:w-[869px] tw:max-w-full tw:!text-lg tw:lg:!text-lg tw:lg:px-0"
            desktopstyle="grid"
            gridcols={4}
          >
            <ArticleCard
              image="./images/articles/chef.png"
              imageclassname="tw:max-h-[250px] tw:lg:max-h-full"
              title="How serving up the perfect roast is more planning than just the perfect potatoes"
              cta="Read the full article"
              description="Supporting body copy that goes with the headline"
              url="#"
              classname="tw:lg:col-span-2 tw:lg:max-w-none"
            />
            <ArticleCard
              image="./images/articles/restaurant.png"
              imageclassname="tw:max-h-[250px] tw:lg:max-h-full"
              title="Booker helps boosts Brighton restaurant revenue by 8%."
              cta="Find out more"
              description="Supporting body copy that goes with the headline"
              category="recipe"
              url="#"
            />
            <ArticleCard
              image="./images/articles/butchery.png"
              imageclassname="tw:max-h-[250px] tw:lg:max-h-full"
              title="Insights"
              cta="Find out more"
              description="Supporting body copy that goes with the headline"
              category="insights"
              url="#"
            />
          </RailSection>
        </Container>

        <Container variant="full" rail={true}>
          {/* awards section */}
          {AwardRail.render()}
        </Container>

        <Container>
          {/* contact us section */}
          <ContactSection title="Get in touch">
            <ContactCard
              title="Talk to the team"
              variant="primary"
              icon="talk-to-team"
              href="#"
              label="Get in touch"
            />
            <ContactCard
              title="View FAQ"
              icon="view-faq"
              variant="primary"
              href="#"
              label="View FAQ"
            />
            <ContactCard
              title="Join the family."
              variant="secondary"
              icon="join-booker"
              href="#"
              label="Join Booker"
            />
          </ContactSection>
        </Container>

        <Container>
          {/* external image banner */}
          <PromotionsBanner {...ExternalImage.args} />
        </Container>

        {/* footer */}
        <div className="tw:bg-black">
          <Footer {...Footer.args} />
        </div>
      </div>
    );
  },
};
