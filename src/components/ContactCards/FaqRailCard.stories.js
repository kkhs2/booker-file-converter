import FaqRailCard from './FaqRailCard';
import RailSection from '../RailSection/RailSection';

export default {
  title: 'Cards/Faq Rail Card',
  component: FaqRailCard,

  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text for the FAQ card',
    },
    href: {
      control: 'text',
      description: 'URL for the "Continue reading" link',
    },
    children: {
      control: 'text',
      description: 'Text content of the FAQ card',
    },
    classname: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

// Base template for the component stories
const Template = (args) => <FaqRailCard {...args} />;

// Default example
export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  href: '#',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non aliquet risus, tempus mollis est. Quisque iaculis quis ipsum vitae faucibus. Sed at pretium ligula. Quisque iaculis quis ipsum vitae faucibus. Sed at pretium ligula.',
};

// // Example in RailSection
export const FaqCardRailSection = {
  render: () => {
    return (
      <RailSection
        title="Most frequently asked questions"
        cta="View all"
        href="#"
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
              slidesOffsetBefore: 64,
              slidesOffsetAfter: 64,
            },
          },
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <FaqRailCard
            key={index}
            title={`FAQ Title ${index + 1}`}
            href={`#faq${index + 1}`}
            children={`This is the content for FAQ ${index + 1}.`}
          />
        ))}
      </RailSection>
    );
  },
};
