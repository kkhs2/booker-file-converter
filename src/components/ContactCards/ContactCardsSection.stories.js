/**
 * Storybook configuration for the Contact Cards component
 * This defines how the Contact Cards component will appear in Storybook and what controls/options are available.
 */

// Import the component
import ContactCard from './ContactCard';
import ContactSection from './ContactSection';

// Define the story configuration
export default {
  // The title under which the Contact Cards component will appear in Storybook's navigation
  title: 'Cards/Contact Cards',

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    title: {
      name: 'Title',
      type: { name: 'string' },
      description: 'Title of the contact cards section',
      control: {
        type: 'text',
      },
    },
    description: {
      name: 'Description',
      type: { name: 'string' },
      description: 'Description of the contact cards section',
      control: {
        type: 'text',
      },
    },

    icon: {
      name: 'Icon',
      type: { name: 'select' },
      description: 'Icon to display on the contact card',
      control: {
        type: 'select',
        options: ['talk-to-team', 'view-faq', 'join-booker'],
      },
    },

    href: {
      name: 'URL',
      type: { name: 'string' },
      description: 'URL for the contact card',
      control: {
        type: 'text',
      },
    },

    label: {
      name: 'Label',
      type: { name: 'string' },
      description: 'Label for the contact card',
      control: {
        type: 'text',
      },
    },

    children: {
      name: 'Contact cards',
      type: { name: 'ReactNode' },
      description: 'Contact cards to display',
      control: {
        type: 'object',
      },
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    backgrounds: {
      default: 'primary',
      values: [
        {
          name: 'primary',
          value: '#f5f5f5',
        },
      ],
    },

    docs: {
      source: {
        transform: (source, storyContext) => {
          if (storyContext?.args?.title === 'Get in touch') {
            return source.replace(/ContactCardsSection/g, 'ContactCards');
          }
          // return contact card
          return source;
        },
      },

      description: {
        component: `
A component that displays a section of contact cards

### Design Figma References
- [Contact cards UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2764-23134&m=dev)
        `,
      },
    },
  },
};

/**
 * Default story.
 * Demonstrates basic usage with default settings.
 */
export const DefaultContactCard = {
  render: () => (
    <div className="tw:max-w-md">
      <ContactCard
        title="Talk to 
the team."
        icon="talk-to-team"
        href="#"
        label="Get in touch"
      />
    </div>
  ),
};

/**
 * Secondary story.
 * Demonstrates usage with a secondary variant.
 */
export const SecondaryContactCard = {
  render: () => (
    <div className="tw:max-w-md">
      <ContactCard
        title="Join the family."
        variant="secondary"
        icon="join-booker"
        href="#"
        label="Join Booker"
      />
    </div>
  ),
};

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const ContactCardsSection = {
  render: () => {
    return (
      <div className="tw-container tw:space-y-12">
        <ContactSection title="Get in touch">
          <ContactCard
            title="Talk to the team."
            variant="primary"
            icon="talk-to-team"
            href="#"
            label="Get in touch"
          />
          <ContactCard
            title="View our FAQs."
            icon="view-faq"
            variant="primary"
            href="#"
            label="Explore FAQs"
          />
          <ContactCard
            title="Join the family."
            variant="secondary"
            icon="join-booker"
            href="#"
            label="Join Booker"
          />
        </ContactSection>

        <ContactSection title="Get in touch">
          <ContactCard
            title="Talk to the team."
            variant="primary"
            icon="talk-to-team"
            href="#"
            label="Get in touch"
          />

          <ContactCard
            title="Join the family."
            variant="secondary"
            icon="join-booker"
            href="#"
            label="Join Booker"
          />
        </ContactSection>

        <ContactSection title="Get in touch">
          <ContactCard
            title="Talk to the team."
            variant="primary"
            icon="talk-to-team"
            href="#"
            label="Get in touch"
          />

          <ContactCard
            title="View our FAQs."
            icon="view-faq"
            variant="primary"
            href="#"
            label="Explore FAQs"
          />
          <ContactCard
            title="Account support."
            variant="primary"
            icon="join-booker"
            href="#"
            label="Join Booker"
          />
        </ContactSection>
      </div>
    );
  },
};
