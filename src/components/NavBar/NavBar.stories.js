/**
 * Storybook configuration for the NavBar component
 * Defines how the NavBar component appears in Storybook and its configurable options.
 */

// Import the NavBar component
import NavBar from './NavBar';
import { SearchProducts } from '../../../utils/mockData';
import { faker } from '@faker-js/faker';
import Container from '../Container/Container';
import { useState } from 'preact/hooks';
import { SearchWithList } from './components/SearchWithList';

export default {
  title: 'Global/Navbar',
  component: NavBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{ maxWidth: '1600px', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Container>
          <Story />
        </Container>
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        transform: (source, storyContext) => {
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)

            .map(([key, value]) => {
              // Handle special cases
              if (key === 'menuitems' && Array.isArray(value)) {
                const menuItemsString = JSON.stringify(
                  value,
                  (key, val) => {
                    if (key === 'items') {
                      return val.map((item) => {
                        return {
                          label: item.label,
                          href: item.href,
                        };
                      });
                    }
                    return val;
                  },
                  2,
                );
                return `${key}={${menuItemsString}}`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<NavBar\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
This component implements the main navigation system as defined in the design system.

### Design Figma References
- [Navigation header UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3771-21500&m=dev)
- [Search UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3771-23512&m=dev)
- [Logged-in header UI library](https://www.figma.com/design/Jgv6b7BGHkVg0CqK2R7A4O/Booker-UI-Design-Templates?node-id=1848-145878&m=dev)


### Usage Guidelines
- Keep menu labels clear and concise
- Limit top-level navigation items to 3-5 items
- Ensure sub-menus are logically grouped
- Maintain consistent hierarchy in menu structure
- Consider mobile responsiveness and touch targets
- Use the \`active: true\` property on menu items to show the current page/section
        `,
      },
      story: {
        height: '600px',
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#faf9f5',
        },
      ],
    },
  },

  // Controls for dynamic props
  argTypes: {
    // Menu items
    menuitems: {
      control: 'object',
      description:
        'Array of Level 1 menu items, each with a label, sub menu, href, and optional active flag',
    },

    user: {
      control: 'object',
      description: 'User information object',
    },

    searchresultslist: {
      control: 'object',
      description: 'Search results list component',
    },

    searchwithlist: {
      control: 'boolean',
      description: 'Show search with list component',
    },

    promotionsbanner: {
      control: 'object',
      description: 'Promotional banner properties for search suggestions',
    },
    brandbanner: {
      control: 'object',
      description: 'Brand banner properties for search suggestions',
    },

    barcode: {
      control: 'boolean',
      description: 'Show barcode icon in the navbar',
    },
    onbarcodeclick: {
      action: 'barcode icon clicked',
      description: 'Function to call when the barcode icon is clicked',
    },

    topOffset: {
      control: 'number',
      description: 'Offset of the top of the navbar',
    },
    onsearchinputchange: {
      action: 'search input changed',
      description: 'Function to call when the search input changes',
    },
    onsearchsubmit: {
      action: 'search submitted',
      description: 'Function to call when the search is submitted',
    },
    onsuggestionselect: {
      action: 'suggestion selected',
      description: 'Function to call when a suggestion is selected',
    },
    hasnotification: {
      control: 'boolean',
      description: 'Whether there is a notification or not',
      table: {
        type: { summary: 'boolean' },
      },
      defaultValue: false,
    },
    logourl: {
      control: 'text',
      description: 'site logo URL',
      table: {
        type: { summary: 'string' },
      },
      defaultValue: '/',
    },

    stickyinternalnav: {
      control: 'boolean',
      description: 'Whether the internal navigation should be sticky',
      table: {
        type: { summary: 'boolean' },
        defaultValue: false,
      },
    },
    classname: {
      control: 'text',
      description: 'Additional CSS classes for the navbar',
      table: {
        type: { summary: 'string' },
      },
      defaultValue: '',
    },
  },
};

/**
 * Template for rendering the Footer component with dynamic props.
 * @param {Object} args - Arguments to customize the component.
 * @returns {HTMLElement} Rendered Footer component.
 */
const Template = (args) => NavBar(args);

/**
 * Default story for the NavBar component.
 * Demonstrates a complete nav with level 1 and level 2 menus
 */
export const Default = Template.bind({});
Default.args = {
  logourl: '/',
  promotionsbanner: {
    externalimage: './images/Brand=Carling.png',
    externalimagemobile: './images/Brand=Carling.png',
    externalurl: 'https://www.booker.co.uk',
  },
  menuitems: [
    {
      label: 'Offers',
      subMenu: [
        {
          title: 'Offers',
          items: [
            { label: 'Offer 1', href: '#' },
            { label: 'Offer 2', href: '#' },
            { label: 'Offer 3', href: '#' },
            { label: 'Offer 4', href: '#' },
            { label: 'Offer 5', href: '#' },
            { label: 'Offer 6', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Products',
      subMenu: [
        {
          title: 'Products',
          items: [
            { label: 'Butchery', href: '#' },
            { label: 'Alcohol', href: '#' },
            { label: 'Cleaning', href: '#' },
            { label: 'Groceries', href: '#' },
            { label: 'Bakery', href: '#' },
            { label: 'See all products', href: '#' },
          ],
        },
        {
          title: 'Product Ranges',
          items: [
            { label: 'Marketplace', href: '#' },
            { label: 'Euroshopper', href: '#' },
            { label: "Jack's", href: '#' },
            { label: 'Tuck Shop', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Sectors',
      subMenu: [
        {
          title: 'Sectors',
          items: [
            { label: 'Pubs & Bars', href: '#' },
            { label: 'Restaurants', href: '#' },
            { label: 'Coffee Shops', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Services',
      subMenu: [
        {
          title: 'Services',
          items: [
            { label: 'Delivery & Logistics', href: '#' },
            { label: 'Operations', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Find a branch',
      subMenu: [
        {
          title: 'Find a branch',
          items: [
            { label: 'Branch 1', href: '#' },
            { label: 'Branch 2', href: '#' },
          ],
        },
      ],
    },
  ],

  searchresultslist: SearchProducts,
  searchwithlist: true,
  onsearchwithlist: (value) => {
    console.log('Search with list', value);
  },
  onsearchinputchange: (data) => console.log('Search changed:', data),
  onsearchsubmit: (value) => console.log('Search submitted:', value),
  onsuggestionselect: (suggestion) =>
    console.log('Suggestion selected:', suggestion),
};

/**
 * Single level story for the NavBar component.
 * Demonstrates a complete nav with level 1 menus only
 */
export const SingleLevel = Template.bind({});
SingleLevel.args = {
  searchresultslist: SearchProducts,
  promotionsbanner: {
    externalimage: './images/Brand=Coca-Cola.png',
    externalimagemobile: './images/Brand=Coca-Cola.png',
    externalurl: 'https://www.booker.co.uk',
  },
  menuitems: [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
  ],
};

/**
 * Multiple level story with longer list for the NavBar component.
 * Demonstrates a complete nav with level 1 and 2 menus
 */
export const LongMenu = Template.bind({});
LongMenu.args = {
  searchresultslist: SearchProducts,
  promotionsbanner: {
    externalimage: './images/Brand=Heinz.png',
    externalimagemobile: './images/Brand=Heinz.png',
    externalurl: 'https://www.booker.co.uk',
  },
  menuitems: [
    {
      label: 'Offers',
      subMenu: [
        {
          title: 'Offers',
          items: [
            { label: 'Offer 1', href: '#' },
            { label: 'Offer 2', href: '#' },
            { label: 'Offer 3', href: '#' },
            { label: 'Offer 4', href: '#' },
            { label: 'Offer 5', href: '#' },
            { label: 'Offer 6', href: '#' },
            { label: 'Offer 7', href: '#' },
            { label: 'Offer 8', href: '#' },
            { label: 'Offer 9', href: '#' },
            { label: 'Offer 10', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Products',
      subMenu: [
        {
          title: 'Products',
          items: [
            { label: 'Butchery', href: '#' },
            { label: 'Alcohol', href: '#' },
            { label: 'Cleaning', href: '#' },
            { label: 'Groceries', href: '#' },
            { label: 'Bakery', href: '#' },
            { label: 'See all products', href: '#' },
          ],
        },
        {
          title: 'Product Ranges',
          items: [
            { label: 'Marketplace', href: '#' },
            { label: 'Euroshopper', href: '#' },
            { label: "Jack's", href: '#' },
            { label: 'Tuck Shop', href: '#' },
            { label: 'Organic Range', href: '#' },
            { label: 'Gluten-Free', href: '#' },
            { label: 'Vegan', href: '#' },
            { label: 'Keto-Friendly', href: '#' },
            { label: 'Low-Calorie', href: '#' },
            { label: 'High-Protein', href: '#' },
          ],
        },
        {
          title: 'New Products',
          items: [
            { label: 'New Product 1', href: '#' },
            { label: 'New Product 2', href: '#' },
            { label: 'New Product 3', href: '#' },
            { label: 'New Product 4', href: '#' },
            { label: 'New Product 5', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Sectors',
      subMenu: [
        {
          title: 'Sectors',
          items: [
            { label: 'Pubs & Bars', href: '#' },
            { label: 'Restaurants', href: '#' },
            { label: 'Coffee Shops', href: '#' },
            { label: 'Hotels', href: '#' },
            { label: 'Cafeterias', href: '#' },
            { label: 'Catering Services', href: '#' },
            { label: 'Food Trucks', href: '#' },
            { label: 'Bakeries', href: '#' },
            { label: 'Convenience Stores', href: '#' },
            { label: 'Supermarkets', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Services',
      subMenu: [
        {
          title: 'Services',
          items: [
            { label: 'Delivery & Logistics', href: '#' },
            { label: 'Operations', href: '#' },
            { label: 'Consulting', href: '#' },
            { label: 'Training', href: '#' },
            { label: 'Marketing', href: '#' },
            { label: 'Customer Support', href: '#' },
            { label: 'Technical Support', href: '#' },
            { label: 'Financial Services', href: '#' },
            { label: 'Legal Services', href: '#' },
            { label: 'HR Services', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Find a branch',
      subMenu: [
        {
          title: 'Find a branch',
          items: [
            { label: 'Branch 1', href: '#' },
            { label: 'Branch 2', href: '#' },
            { label: 'Branch 3', href: '#' },
            { label: 'Branch 4', href: '#' },
            { label: 'Branch 5', href: '#' },
            { label: 'Branch 6', href: '#' },
            { label: 'Branch 7', href: '#' },
            { label: 'Branch 8', href: '#' },
            { label: 'Branch 9', href: '#' },
            { label: 'Branch 10', href: '#' },
          ],
        },
      ],
    },
  ],
};

export const WithActiveStates = Template.bind({});
WithActiveStates.args = {
  logourl: '/',
  promotionsbanner: {
    externalimage: './images/Brand=Carling.png',
    externalimagemobile: './images/Brand=Carling.png',
    externalurl: 'https://www.booker.co.uk',
  },
  menuitems: [
    {
      label: 'Offers',
      active: true, // This item will be underlined
      subMenu: [
        {
          title: 'Offers',
          items: [
            { label: 'Offer 1', href: '#' },
            { label: 'Offer 2', href: '#' },
            { label: 'Offer 3', href: '#' },
            { label: 'Offer 4', href: '#' },
            { label: 'Offer 5', href: '#' },
            { label: 'Offer 6', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Products',
      subMenu: [
        {
          title: 'Products',
          items: [
            { label: 'Butchery', href: '#' },
            { label: 'Alcohol', href: '#' },
            { label: 'Cleaning', href: '#' },
            { label: 'Groceries', href: '#' },
            { label: 'Bakery', href: '#' },
            { label: 'See all products', href: '#' },
          ],
        },
        {
          title: 'Product Ranges',
          items: [
            { label: 'Marketplace', href: '#' },
            { label: 'Euroshopper', href: '#' },
            { label: "Jack's", href: '#' },
            { label: 'Tuck Shop', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Sectors',
      subMenu: [
        {
          title: 'Sectors',
          items: [
            { label: 'Pubs & Bars', href: '#' },
            { label: 'Restaurants', href: '#' },
            { label: 'Coffee Shops', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Services',
      subMenu: [
        {
          title: 'Services',
          items: [
            { label: 'Delivery & Logistics', href: '#' },
            { label: 'Operations', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Find a branch',
      subMenu: [
        {
          title: 'Find a branch',
          items: [
            { label: 'Branch 1', href: '#' },
            { label: 'Branch 2', href: '#' },
          ],
        },
      ],
    },
  ],
  searchresultslist: SearchProducts,
  searchwithlist: true,
  onsearchwithlist: (value) => {
    console.log('Search with list', value);
  },
  onsearchinputchange: (data) => console.log('Search changed:', data),
  onsearchsubmit: (value) => console.log('Search submitted:', value),
  onsuggestionselect: (suggestion) =>
    console.log('Suggestion selected:', suggestion),
};

WithActiveStates.parameters = {
  docs: {
    description: {
      story: `
This story demonstrates the active state functionality for navigation menu items.

**Features demonstrated:**
- Menu items with \`active: true\` will be underlined
- Active state works for both desktop and mobile views
- The underline uses the primary color with proper offset
- Active state can be applied to any menu item in the navigation
      `,
    },
  },
};

export const MenuWithBrand = Template.bind({});
MenuWithBrand.args = {
  searchresultslist: SearchProducts,
  promotionsbanner: {
    externalimage: './images/banner-cadbury.png',
    externalimagemobile: './images/banner-cadbury.png',
    externalurl: 'https://www.booker.co.uk',
  },
  brandbanner: {
    image: './images/cadbury.png',
    name: 'Cadbury',
    action: () => {
      confirm('Brand action clicked');
    },
  },

  menuitems: [
    {
      label: 'Offers',
      subMenu: [
        {
          title: 'Offers',
          items: [
            { label: 'Offer 1', href: '#' },
            { label: 'Offer 2', href: '#' },
            { label: 'Offer 3', href: '#' },
            { label: 'Offer 4', href: '#' },
            { label: 'Offer 5', href: '#' },
            { label: 'Offer 6', href: '#' },
            { label: 'Offer 7', href: '#' },
            { label: 'Offer 8', href: '#' },
            { label: 'Offer 9', href: '#' },
            { label: 'Offer 10', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Products',
      subMenu: [
        {
          title: 'Products',
          items: [
            { label: 'Butchery', href: '#' },
            { label: 'Alcohol', href: '#' },
            { label: 'Cleaning', href: '#' },
            { label: 'Groceries', href: '#' },
            { label: 'Bakery', href: '#' },
            { label: 'See all products', href: '#' },
          ],
        },
        {
          title: 'Product Ranges',
          items: [
            { label: 'Marketplace', href: '#' },
            { label: 'Euroshopper', href: '#' },
            { label: "Jack's", href: '#' },
            { label: 'Tuck Shop', href: '#' },
            { label: 'Organic Range', href: '#' },
            { label: 'Gluten-Free', href: '#' },
            { label: 'Vegan', href: '#' },
            { label: 'Keto-Friendly', href: '#' },
            { label: 'Low-Calorie', href: '#' },
            { label: 'High-Protein', href: '#' },
          ],
        },
        {
          title: 'New Products',
          items: [
            { label: 'New Product 1', href: '#' },
            { label: 'New Product 2', href: '#' },
            { label: 'New Product 3', href: '#' },
            { label: 'New Product 4', href: '#' },
            { label: 'New Product 5', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Sectors',
      subMenu: [
        {
          title: 'Sectors',
          items: [
            { label: 'Pubs & Bars', href: '#' },
            { label: 'Restaurants', href: '#' },
            { label: 'Coffee Shops', href: '#' },
            { label: 'Hotels', href: '#' },
            { label: 'Cafeterias', href: '#' },
            { label: 'Catering Services', href: '#' },
            { label: 'Food Trucks', href: '#' },
            { label: 'Bakeries', href: '#' },
            { label: 'Convenience Stores', href: '#' },
            { label: 'Supermarkets', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Services',
      subMenu: [
        {
          title: 'Services',
          items: [
            { label: 'Delivery & Logistics', href: '#' },
            { label: 'Operations', href: '#' },
            { label: 'Consulting', href: '#' },
            { label: 'Training', href: '#' },
            { label: 'Marketing', href: '#' },
            { label: 'Customer Support', href: '#' },
            { label: 'Technical Support', href: '#' },
            { label: 'Financial Services', href: '#' },
            { label: 'Legal Services', href: '#' },
            { label: 'HR Services', href: '#' },
          ],
        },
      ],
    },
    {
      label: 'Find a branch',
      subMenu: [
        {
          title: 'Find a branch',
          items: [
            { label: 'Branch 1', href: '#' },
            { label: 'Branch 2', href: '#' },
            { label: 'Branch 3', href: '#' },
            { label: 'Branch 4', href: '#' },
            { label: 'Branch 5', href: '#' },
            { label: 'Branch 6', href: '#' },
            { label: 'Branch 7', href: '#' },
            { label: 'Branch 8', href: '#' },
            { label: 'Branch 9', href: '#' },
            { label: 'Branch 10', href: '#' },
          ],
        },
      ],
    },
  ],
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  menuitems: [{ label: 'Help & Support', href: '#' }],

  searchresultslist: SearchProducts,

  promotionsbanner: {
    externalimage: './images/Brand=Napolina.png',
    externalimagemobile: './images/Brand=Napolina.png',
    externalurl: 'https://www.booker.co.uk',
  },

  stickyinternalnav: true,
  searchwithlist: true,

  barcode: true,
  onbarcodeclick: () => {
    console.log('Barcode icon clicked');
  },
  onsearchwithlist: (value) => {
    console.log('Search with list', value);
  },
  onOpenSearchWithList: () => {
    console.log('Opening SearchWithList modal from InternalNav');
    // This would normally call the hook's openModal function
    alert('SearchWithList modal should open from InternalNav!');
  },

  onsearchinputchange: (data) => console.log('Search changed:', data),
  onsearchsubmit: (value) => console.log('Search submitted:', value),
  onsuggestionselect: (suggestion) =>
    console.log('Suggestion selected:', suggestion),

  user: {
    accounttype: 'londis', // valid options: londis, budgens, premier, default, custom
    accountlogo: './images/banner-sausage-mobile.jpg',
    accountclassname: 'tw:bg-primary-500',
    name: faker.person.fullName(),
    title: faker.person.prefix(),
    email: faker.internet.email(),
    accounturl: '#',
    manageaccounturl: '#',
    onsignout: () => {
      console.log('User signed out');
    },
    onswitchaccount: (id) => {
      console.log('User switched account', id);
    },

    accounts: [
      {
        name: 'Budgens MFG',
        id: faker.string.numeric({ length: { min: 5, max: 10 } }),
        current: true,
      },
      {
        name: 'Burgular Van Co',
        id: faker.string.numeric({ length: { min: 5, max: 10 } }),
      },
      {
        name: 'Londis Sheffield',
        id: faker.string.numeric({ length: { min: 5, max: 10 } }),
      },
      {
        name: 'Premier Sheffield',
        id: faker.string.numeric({ length: { min: 5, max: 10 } }),
      },
      {
        name: 'Premier Sheffield',
        id: faker.string.numeric({ length: { min: 5, max: 10 } }),
      },
      {
        name: 'The Chosen Bun',
        id: faker.string.numeric({ length: { min: 5, max: 10 } }),
      },
      {
        name: 'Budgens MFG',
        id: faker.string.numeric({ length: { min: 5, max: 10 } }),
        current: true,
      },
      {
        name: 'Burgular Van Co',
        id: faker.string.numeric({ length: { min: 5, max: 10 } }),
      },
      {
        name: 'Londis Sheffield',
        id: faker.string.numeric({ length: { min: 5, max: 10 } }),
      },
      {
        name: 'Premier Sheffield',
        id: faker.string.numeric({ length: { min: 5, max: 10 } }),
      },
      {
        name: 'Premier Sheffield',
        id: faker.string.numeric({ length: { min: 5, max: 10 } }),
      },
      {
        name: 'The Chosen Bun',
        id: faker.string.numeric({ length: { min: 5, max: 10 } }),
      },
    ],
  },

  internalmenuitems: [
    { label: "What's new", href: '#' },
    { label: 'Departments', href: '#', active: true }, // This item will be underlined
    { label: 'Offers', href: '#' },
    {
      label: 'Favorites',
      subMenu: [
        {
          title: '',
          items: [
            { label: 'Previous order', href: '#' },
            { label: 'Frequently bought', href: '#' },
            { label: 'All previous bought', href: '#' },
          ],
        },
      ],
    },
    { label: 'My Account', action: 'my-account' },
    { label: 'Switch Accounts', action: 'switch-account' },
  ],

  accountmenuitems: [
    { label: 'Account details', href: '#' },
    { label: 'Payment details', href: '#' },
    { label: 'Order history', href: '#' },
    { label: 'Issues with your order', href: '#' },
    { label: 'Invoices and statements', href: '#' },
    { label: 'Spend and save', href: '#' },
    { label: 'Resources', href: '#' },
  ],

  favorites: [
    {
      id: '123456',
      label: 'My Wishlist',
      count: 2,
    },
    {
      id: '123457',
      label: 'Shoping List',
      count: 121,
    },
    {
      id: '123458',
      label: 'Christmas List',
      count: 0,
    },
    {
      id: '123459',
      label: 'My Other Other Other Wishlist',
      count: 0,
    },
    {
      id: '123460',
      label: 'Birthday List',
      count: 0,
    },
    {
      id: '123461',
      label: 'Holiday Shopping',
      count: 32,
    },
    {
      id: '123462',
      label: 'Gift Ideas',
      count: 10,
    },
    {
      id: '123463',
      label: 'Back to School',
      count: 30,
    },
    {
      id: '123464',
      label: 'New Arrivals',
      count: 70,
    },
  ],

  deliverytab: {
    collectlabel: 'Click & Collect',
    deliverylabel: 'Delivery',
    collectlocation: 'Sheffield',
    deliverylocation: 'London',
    collectprice: '£16.56',
    deliveryprice: '£3.15',
    collectcount: 5,
    deliverycount: 2,
    onlocationchange: () => {
      console.log('handle location change');
    },
  },
};

/**
 * Story demonstrating the SearchWithList integration
 */
export const SearchWithListDemo = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleOpenSearchWithList = () => {
    console.log('Opening SearchWithList modal from InternalNav');
    setIsSearchModalOpen(true);
  };

  const handleModalStateChange = (isOpen) => {
    setIsSearchModalOpen(isOpen);
  };

  return (
    <div
      style={{ maxWidth: '1600px', marginLeft: 'auto', marginRight: 'auto' }}
    >
      <Container>
        <NavBar
          menuitems={[{ label: 'Help & Support', href: '#' }]}
          searchresultslist={SearchProducts}
          promotionsbanner={{
            externalimage: './images/Brand=Napolina.png',
            externalimagemobile: './images/Brand=Napolina.png',
            externalurl: 'https://www.booker.co.uk',
          }}
          stickyinternalnav={true}
          searchwithlist={true}
          barcode={true}
          onbarcodeclick={() => console.log('Barcode icon clicked')}
          onsearchwithlist={(value) => console.log('Search with list', value)}
          onOpenSearchWithList={handleOpenSearchWithList}
          onsearchinputchange={(data) => console.log('Search changed:', data)}
          onsearchsubmit={(value) => console.log('Search submitted:', value)}
          onsuggestionselect={(suggestion) =>
            console.log('Suggestion selected:', suggestion)
          }
          user={{
            accounttype: 'londis',
            accountlogo: './images/banner-sausage-mobile.jpg',
            accountclassname: 'tw:bg-primary-500',
            name: faker.person.fullName(),
            title: faker.person.prefix(),
            email: faker.internet.email(),
            accounturl: '#',
            manageaccounturl: '#',
            onsignout: () => console.log('User signed out'),
            onswitchaccount: (id) => console.log('User switched account', id),
            accounts: [
              {
                name: 'Budgens MFG',
                id: faker.string.numeric({ length: { min: 5, max: 10 } }),
                current: true,
              },
              {
                name: 'Burgular Van Co',
                id: faker.string.numeric({ length: { min: 5, max: 10 } }),
              },
            ],
          }}
          internalmenuitems={[
            { label: "What's new", href: '#' },
            { label: 'Departments', href: '#' },
            { label: 'Offers', href: '#', active: true }, // This item will be underlined
            {
              label: 'Favorites',
              subMenu: [
                {
                  title: '',
                  items: [
                    { label: 'Previous order', href: '#' },
                    { label: 'Frequently bought', href: '#' },
                    { label: 'All previous bought', href: '#' },
                  ],
                },
              ],
            },
            { label: 'Switch Accounts', action: 'switch-account' },
          ]}
          accountmenuitems={[
            { label: 'Account details', href: '#' },
            { label: 'Payment details', href: '#' },
            { label: 'Order history', href: '#' },
          ]}
          favorites={[
            { id: '123456', label: 'My Wishlist', count: 2 },
            { id: '123457', label: 'Shopping List', count: 121 },
            { id: '123458', label: 'Christmas List', count: 0 },
          ]}
          deliverytab={{
            collectlabel: 'Click & Collect',
            deliverylabel: 'Delivery',
            collectlocation: 'Sheffield',
            deliverylocation: 'London',
            collectprice: '£16.56',
            deliveryprice: '£3.15',
            collectcount: 5,
            deliverycount: 2,
            onlocationchange: () => console.log('handle location change'),
          }}
        />

        {/* Additional SearchWithList component to demonstrate external control */}
        <div className="tw:mt-20 tw:rounded-lg tw:bg-gray-100 tw:p-4">
          <h3 className="tw:mb-4 tw:text-lg tw:font-semibold">
            External SearchWithList Control
          </h3>
          <p className="tw:mb-4 tw:text-sm tw:text-gray-600">
            This demonstrates opening the SearchWithList modal from the
            InternalNav "Favorites" dropdown.
          </p>
          <SearchWithList
            isMobile={false}
            searchterms={['demo', 'items']}
            onsearchwithlist={(items) =>
              alert(`Searching for: ${items.join(', ')}`)
            }
            openModal={isSearchModalOpen}
            onModalStateChange={handleModalStateChange}
          />
        </div>
      </Container>
    </div>
  );
};

SearchWithListDemo.parameters = {
  docs: {
    description: {
      story: `
This story demonstrates the new SearchWithList integration with InternalNav.

**How to test:**
1. Look for the "Favorites" dropdown in the internal navigation (below the main nav)
2. Click on "Favorites" to open the dropdown
3. Click on "Search with list" in the dropdown
4. The SearchWithList modal should open

**Features demonstrated:**
- SearchWithList modal can be opened from InternalNav dropdown
- External control of modal state via props
- Integration with the existing navbar system
      `,
    },
  },
};
