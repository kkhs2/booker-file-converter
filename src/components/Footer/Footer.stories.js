/**
 * Storybook configuration for the Footer component
 * Defines how the Footer component appears in Storybook and its configurable options.
 */

import Footer from './Footer';
import Icons from '../Icons/Icons';

export default {
  title: 'Global/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (source, storyContext) => {
          // Get the story args
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)
            .map(([key, value]) => {
              // Handle special cases
              if (key === 'sections' && Array.isArray(value)) {
                const sectionsString = JSON.stringify(
                  value,
                  (key, val) => {
                    if (key === 'links') {
                      return val.map((link) => {
                        return {
                          label: link.label,
                          href: link.href,
                        };
                      });
                    }
                    return val;
                  },
                  2,
                );
                return `${key}={${sectionsString}}`;
              }

              if (key === 'sociallinks' && Array.isArray(value)) {
                const socialLinksString = JSON.stringify(
                  value,
                  (key, val) => {
                    if (key === 'icon') {
                      return '<Icons.twitter classname="tw:w-6 tw:h-6" />';
                    }
                    return val;
                  },
                  2,
                );
                return `${key}={${socialLinksString}}`;
              }

              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<Footer\n  ${props}\n/>`;
        },
      },

      description: {
        component: `
This component implements the site footer as defined in the design system.

### Design Figma References
- [Footer UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=2026-41798&m=dev)

### Usage Guidelines
- Group links logically into sections
- Keep section titles clear and concise
- Maintain consistent hierarchy across sections
- Include essential legal links and copyright notice
        `,
      },
    },
    layout: 'fullscreen',
  },

  // Controls for the component
  argTypes: {
    // Sections
    sections: {
      control: 'object',
      description:
        'Array of arrays representing footer columns. Each inner array contains section objects with titles and links',
    },

    // Social Links
    sociallinks: {
      control: 'object',
      description: 'Array of social link objects with href and icon',
    },

    // Copyright
    copyright: {
      control: 'text',
      description: 'Footer copyright text',
    },
  },
};

/**
 * Template for rendering the Footer component with dynamic props.
 * @param {Object} args - Arguments to customize the component.
 * @returns {JSX.Element} Rendered Footer component.
 */
const Template = (args) => <Footer {...args} />;

/**
 * Default story for the Footer component.
 * Demonstrates a complete footer with sections, social links, and copyright text.
 */
export const Default = Template.bind({});
Default.args = {
  classname: 'tw-container',
  sections: [
    [
      {
        title: 'Offers',
        links: [{ label: 'All offers', href: '#' }],
      },
      {
        title: 'Products',
        links: [
          { label: 'Butchery', href: '#' },
          { label: 'Alcohol', href: '#' },
          { label: 'Cleaning', href: '#' },
          { label: 'Fresh', href: '#' },
        ],
      },
      {
        title: 'Product Ranges',
        links: [
          { label: 'Euroshopper', href: '#' },
          { label: "Jack's", href: '#' },
          { label: "Chef's Larder", href: '#' },
          { label: "Chef's Essentials", href: '#' },
          { label: "Chef's Premium", href: '#' },
          { label: 'Blackgate', href: '#' },
          { label: 'Clean Pro+', href: '#' },
          { label: 'Farm Fresh', href: '#' },
          { label: 'Litchfield', href: '#' },
          { label: "Chef's Central", href: '#' },
        ],
      },
    ],

    [
      {
        title: 'Catering Sectors',
        links: [
          { label: 'Pubs & Bars', href: '#' },
          { label: 'Restaurants', href: '#' },
          { label: 'Coffee Shops & Cafes', href: '#' },
          { label: 'Events', href: '#' },
          { label: 'Takeaways', href: '#' },
          { label: 'Hotels', href: '#' },
          { label: 'Care & Education', href: '#' },
        ],
      },
      {
        title: 'Retail Sectors',
        links: [
          { label: 'Londis', href: '#' },
          { label: 'Budgens', href: '#' },
          { label: 'Premier', href: '#' },
          { label: 'Convenience Retailing', href: '#' },
        ],
      },
    ],
    [
      {
        title: 'Services',
        links: [
          { label: 'Delivery and Click & Collect', href: '#' },
          { label: 'Recycling & used oil collections', href: '#' },
          { label: 'Cashback at Tesco', href: '#' },
          { label: 'Central Bulling', href: '#' },
          { label: 'Add Value Services', href: '#' },
          { label: 'Energy switching', href: '#' },
          { label: 'Spend & Save', href: '#' },
          { label: 'On Trade Club', href: '#' },
          { label: 'Fast Food Club', href: '#' },
          { label: 'Just Eat Club', href: '#' },
          { label: 'Uber Eats Club', href: '#' },
        ],
      },
    ],
    [
      {
        title: 'Legal',
        links: [
          { label: 'Terms & Conditions', href: '#' },
          { label: 'Product Terms & Conditions', href: '#' },
          { label: 'Privacy & Cookies', href: '#' },
          { label: 'Legal', href: '#' },
          { label: 'Modern Slavery', href: '#' },
          { label: 'Investor Relations', href: '#' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Find a branch', href: '#' },
          { label: 'Contact us', href: '#' },
        ],
      },
    ],
  ],
  sociallinks: [
    {
      href: 'https://twitter.com',
      icon: () => <Icons.twitter classname="tw:h-6 tw:w-6" />,
    },
    {
      href: 'https://facebook.com',
      icon: () => <Icons.facebook classname="tw:h-6 tw:w-6" />,
    },
    {
      href: 'https://instagram.com',
      icon: () => <Icons.instagram classname="tw:h-6 tw:w-6" />,
    },
  ],
  copyright: '© Booker 2025',
};

/**
 * Minimal section configuration for the Footer component.
 * Shows how the Footer can work with just a few simple sections.
 */
export const Minimal = Template.bind({});
Minimal.args = {
  classname: 'tw-container',
  sections: [
    [
      {
        title: 'Products',
        links: [
          { label: 'Butchery', href: '#' },
          { label: 'Alcohol', href: '#' },
          { label: 'Fresh', href: '#' },
        ],
      },
    ],
    [
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: '#' },
          { label: 'Find a Branch', href: '#' },
          { label: 'Contact Us', href: '#' },
        ],
      },
    ],
    [
      {
        title: 'Legal',
        links: [
          { label: 'Terms & Conditions', href: '#' },
          { label: 'Privacy Policy', href: '#' },
        ],
      },
    ],
  ],
  sociallinks: [
    {
      href: 'https://twitter.com',
      icon: () => <Icons.twitter classname="tw:h-6 tw:w-6" />,
    },
    {
      href: 'https://facebook.com',
      icon: () => <Icons.facebook classname="tw:h-6 tw:w-6" />,
    },
  ],
  copyright: '© Booker 2025',
};

/**
 * Custom section distribution for the Footer component.
 * Demonstrates how the Footer can handle an uneven number of sections
 * and still maintain a balanced layout.
 */
export const CustomSections = Template.bind({});
CustomSections.args = {
  classname: 'tw-container',
  sections: [
    [
      {
        title: 'Customer Service',
        links: [
          { label: 'Help & Support', href: '#' },
          { label: 'Contact Us', href: '#' },
          { label: 'Delivery Information', href: '#' },
          { label: 'Returns & Refunds', href: '#' },
        ],
      },
    ],
    [
      {
        title: 'Popular Categories',
        links: [
          { label: 'Alcoholic Drinks', href: '#' },
          { label: 'Chilled Foods', href: '#' },
          { label: 'Confectionery', href: '#' },
          { label: 'Frozen Foods', href: '#' },
          { label: 'Soft Drinks', href: '#' },
        ],
      },
    ],
    [
      {
        title: 'About Booker',
        links: [
          { label: 'Our Story', href: '#' },
          { label: 'Careers', href: '#' },
          { label: 'Press', href: '#' },
          { label: 'Sustainability', href: '#' },
        ],
      },
      {
        title: 'Partners',
        links: [
          { label: 'Become a Partner', href: '#' },
          { label: 'Partner Portal', href: '#' },
        ],
      },
    ],
    [
      {
        title: 'Resources',
        links: [
          { label: 'Blog', href: '#' },
          { label: 'Guides', href: '#' },
          { label: 'Tools', href: '#' },
        ],
      },
    ],
  ],
  sociallinks: [
    {
      href: 'https://twitter.com',
      icon: () => <Icons.twitter classname="tw:h-6 tw:w-6" />,
    },
    {
      href: 'https://facebook.com',
      icon: () => <Icons.facebook classname="tw:h-6 tw:w-6" />,
    },
    {
      href: 'https://instagram.com',
      icon: () => <Icons.instagram classname="tw:h-6 tw:w-6" />,
    },
  ],
  copyright: '© Booker Group 2025. All rights reserved.',
};

/**
 * Example without sections
 * Shows how the Footer can work without sections.
 */
export const NoSections = Template.bind({});
NoSections.args = {
  classname: 'tw-container',
  sociallinks: [
    {
      href: 'https://twitter.com',
      icon: () => <Icons.twitter classname="tw:h-6 tw:w-6" />,
    },
    {
      href: 'https://facebook.com',
      icon: () => <Icons.facebook classname="tw:h-6 tw:w-6" />,
    },
    {
      href: 'https://instagram.com',
      icon: () => <Icons.instagram classname="tw:h-6 tw:w-6" />,
    },
  ],
  copyright: '© Booker Group 2025. All rights reserved.',
};
