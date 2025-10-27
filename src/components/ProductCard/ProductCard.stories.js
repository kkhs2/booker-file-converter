/**
 * Storybook configuration for the ProductCard component
 * This defines how the ProductCard component will appear in Storybook and what controls/options are available.
 */

// Import the component
import { cloneElement } from 'preact/compat';
import { action } from '@storybook/addon-actions';
import { faker } from '@faker-js/faker';
import { getRandomImage } from '../../../utils/mockData';
import ProductCard from './ProductCard';
import RailSection from '../RailSection/RailSection';

// Define the story configuration
export default {
  // The title under which the ProductCard component will appear in Storybook's navigation
  title: 'Product/Product Card',

  component: ProductCard,

  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    // Basic product information
    id: {
      control: {
        type: 'text',
      },
      description: 'Unique identifier for the product',
      table: {
        category: 'Basic Information',
      },
    },
    name: {
      control: {
        type: 'text',
      },
      description: 'Name of the product',
      table: {
        category: 'Basic Information',
      },
    },
    image: {
      control: {
        type: 'text',
      },
      description: 'URL of the product image',
      table: {
        category: 'Basic Information',
      },
    },
    url: {
      control: {
        type: 'text',
      },
      description: 'URL to the product page',
      table: {
        category: 'Basic Information',
      },
    },

    // Pricing
    price: {
      control: {
        type: 'text',
      },
      description: 'Main price of the product',
      table: {
        category: 'Pricing',
      },
    },
    pricewithvat: {
      control: {
        type: 'text',
      },
      description: 'Price of the product with VAT',
      table: {
        category: 'Pricing',
      },
    },
    priceperunit: {
      control: {
        type: 'text',
      },
      description: 'Price per unit',
      table: {
        category: 'Pricing',
      },
    },
    pricerpp: {
      control: {
        type: 'object',
      },
      description: 'Recommended retail price',
      table: {
        category: 'Pricing',
      },
    },
    pricepor: {
      control: {
        type: 'object',
      },
      description: 'Price POR (Percentage Of Revenue)',
      table: {
        category: 'Pricing',
      },
    },

    // Product tags and info
    tags: {
      control: {
        type: 'array',
      },
      description: 'List of product tags. Examples: new, bestseller, etc.',
      table: {
        category: 'Product Information',
      },
    },

    cardindex: {
      control: {
        type: 'number',
      },
      description: 'Index of the product in the grid',
      table: {
        category: 'Product Information',
      },
    },

    dietaryinfo: {
      control: {
        type: 'array',
      },
      description: 'Dietary information for the product',
      table: {
        category: 'Product Information',
      },
    },
    servings: {
      control: {
        type: 'array',
      },
      description: 'Serving information for the product',
      table: {
        category: 'Product Information',
      },
    },
    storageinfo: {
      control: {
        type: 'select',
      },
      options: ['frozen', 'chilled'],
      description: 'Storage requirements. Options: frozen, chilled',
      table: {
        category: 'Product Information',
      },
    },
    deliveryinfo: {
      control: {
        type: 'select',
      },
      options: [
        'ambient-delivery',
        'chilled-delivery',
        'grocery-delivery',
        'fresh-delivery',
      ],
      description: 'Delivery information for the product',
      table: {
        category: 'Product Information',
      },
    },
    butchersnote: {
      control: {
        type: 'object',
      },
      description: 'Additional note about the product',
      table: {
        category: 'Product Information',
      },
    },

    // Availability and stock
    availability: {
      control: {
        type: 'object',
      },
      description: 'Availability status of the product',
      table: {
        category: 'Availability',
      },
    },

    // Card state and controls
    mode: {
      control: {
        type: 'select',
      },
      options: ['grid', 'list'],
      description: 'Display mode for the product card',
      table: {
        category: 'Display',
        defaultValue: { summary: 'grid' },
      },
    },
    mobileimagesize: {
      control: {
        type: 'select',
      },
      options: ['default', 'large'],
      description:
        'Size of the product image on mobile. `large` is used for rails.',
      table: {
        category: 'Display',
        defaultValue: { summary: 'default' },
      },
    },
    quantity: {
      control: {
        type: 'number',
      },
      description: 'Current quantity in cart',
      table: {
        category: 'Cart',
        defaultValue: { summary: 0 },
      },
    },
    maxquantity: {
      control: {
        type: 'number',
      },
      description: 'Maximum allowed quantity',
      table: {
        category: 'Cart',
        defaultValue: { summary: 999 },
      },
    },

    showmaxquantity: {
      control: {
        type: 'boolean',
      },
      description: 'Flag to show the maximum quantity in the UI',
      table: {
        category: 'Cart',
        defaultValue: { summary: false },
      },
    },

    // Special states
    offer: {
      control: {
        type: 'object',
      },
      description: 'Details about any offer for the product',
      table: {
        category: 'Promotions',
      },
    },
    hasmessage: {
      control: {
        type: 'object',
      },
      description: 'Message to display with the product (warning/info)',
      table: {
        category: 'Promotions',
      },
    },
    selectable: {
      control: {
        type: 'object',
      },
      description: 'Makes the product card selectable with checkbox',
      table: {
        category: 'Interactive Features',
      },
    },
    wishlist: {
      control: {
        type: 'object',
      },
      description: 'Wishlist information for the product',
      table: {
        category: 'Interactive Features',
      },
    },
    addedtowishlist: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the product is in wishlist',
      table: {
        category: 'Interactive Features',
        defaultValue: { summary: false },
      },
    },

    // Special display flags
    isfeaturedproduct: {
      control: {
        type: 'boolean',
      },
      description: 'Indicates if this is a featured product',
      table: {
        category: 'Display',
        defaultValue: { summary: false },
      },
    },
    loggedout: {
      control: {
        type: 'boolean',
      },
      description: 'Whether the user is logged out (shows member CTA)',
      table: {
        category: 'Display',
        defaultValue: { summary: false },
      },
    },

    // Event handlers
    onaddtocart: {
      action: 'added to cart',
      description: 'Called when product is added to cart',
      table: {
        category: 'Events',
      },
    },
    onaddtowishlist: {
      action: 'added to wishlist',
      description: 'Called when product is added to wishlist',
      table: {
        category: 'Events',
      },
    },
    onbecomeamember: {
      action: 'become a member clicked',
      description: 'Called when "become a member" is clicked',
      table: {
        category: 'Events',
      },
    },
    onfindanotherbranchclick: {
      action: 'find another branch clicked',
      description: 'Called when find another branch is clicked',
      table: {
        category: 'Events',
      },
    },
    onalternativeaction: {
      action: 'alternative action clicked',
      description: 'Called when alternative action is clicked',
      table: {
        category: 'Events',
      },
    },
    onsavenote: {
      action: 'note saved',
      description: 'Called when butchers note is saved',
      table: {
        category: 'Events',
      },
    },
  },

  // Added to override default story height if needed for this component
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#F5F4F0',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
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

              if (typeof value === 'boolean') {
                return value ? key : null;
              }
              if (typeof value === 'string') {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .filter(Boolean)
            .join('\n  ');

          return `<ProductCard\n  ${props}\n/>`;
        },
      },
      description: {
        component: `
### Description
A Product Card component displays product information in a card format that can be used in grids, lists or rails. It is used to display product details such as name, price, availability, and other relevant information.

### Design Figma References
- [Product Cards UI library](https://www.figma.com/design/Ny08zhO5c4Y4FAsXMx7O41/Booker-UI-Design-Library?node-id=3651-92373&m=dev)
        `,
      },
      story: {
        height: '300px',
      },
    },
  },
  // Add this to exclude PRODUCT_CARDS from showing as a story
  excludeStories: ['PRODUCT_CARDS', 'DefaultArgs'],
};

const generateUniqueName = () => {
  return `${faker.commerce.productAdjective()} ${faker.commerce.product()} ${faker.commerce.productName()} ${faker.commerce.productMaterial()} ${faker.commerce.product()} ${faker.commerce.productName()}`;
};

const dietaryinfoOptions = [
  'vegan',
  'gluten-free',
  'dairy-free',
  'halal',
  'vegetarian',
  'kosher',
];

const storageinfoOptions = ['frozen', 'chilled'];

const deliveryinfoOptions = [
  'ambient-delivery',
  'chilled-delivery',
  'grocery-delivery',
  'fresh-delivery',
];

const DefaultArgs = {
  id: '123456',
  url: 'https://www.booker.co.uk',
  image: getRandomImage(),
  name: generateUniqueName(),
  price: faker.commerce.price({
    min: 1,
    max: 100,
    dec: 2,
  }),
  pricewithvat: faker.commerce.price({
    min: 1,
    max: 100,
    dec: 2,
  }),
  priceperunit:
    faker.commerce.price({
      min: 1,
      max: 100,
      dec: 2,
    }) + ' per unit',

  pricerpp: {
    value:
      faker.commerce.price({
        min: 1,
        max: 100,
        dec: 2,
      }) + ' RPP',
    locked: Math.random() > 0.5, // Randomly lock the RPP
  },

  pricepor: {
    value:
      faker.commerce.price({
        min: 1,
        max: 100,
        dec: 2,
      }) + ' POR',
    locked: Math.random() > 0.5, // Randomly lock the POR
  },

  tags: ['new'],
  availability: {
    status: 'inStock',
    outofstocknotice: null,
    alternativeaction: action('alternative-url-clicked'),
  },
  offer: {
    label: 'Discount Offer',
    date: 'until 28th Feb',
    prevText: 'Was £6.50',
    discountText: 'Save £1.60',
  },
  servings: ['Case of 4 x 2L', 'Serves 10'],
  storageinfo: storageinfoOptions[0],
  deliveryinfo: deliveryinfoOptions[0],
  dietaryinfo: dietaryinfoOptions.slice(0, 3),

  wishlist: {
    lists: [
      {
        id: '123456',
        name: 'My Wishlist',
        selected: true,
        count: 2,
      },
      {
        id: '123457',
        name: 'My Other Wishlist',
        selected: false,
        count: 121,
      },
    ],
  },

  addedtowishlist: false,

  butchersnote: {
    hasnote: true,
    note: 'some note',
  },

  mode: 'grid',
  quantity: 0,
  isfeaturedproduct: false,

  // if the user is logged out, show the become a member CTA
  loggedout: false,

  // actions
  onaddtocart: (id, qty) => {
    console.log('added to cart', id, qty);
  },
  onaddtowishlist: (id, list) => {
    console.log('added to wishlist', id, list);
  },
  onbecomeamember: () => {
    console.log('become a member clicked');
  },
  onfindanotherbranchclick: () => {
    console.log('find another branch clicked');
  },
  onsavenote: (note) => {
    console.log('note saved', note);
  },
};

const Template = (args) => {
  return (
    <div className="tw:max-w-[320px]">
      <ProductCard {...args} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = DefaultArgs;

// Define the array but don't export it
const PRODUCT_CARDS = [
  <ProductCard {...DefaultArgs} />,
  <ProductCard
    {...DefaultArgs}
    name={generateUniqueName()}
    image={getRandomImage()}
    availability={{
      status: 'outOfStock',
      outofstocknotice: 'Out of stock in all stores',
      alternativeaction: action('alternative-url-clicked'),
      alternativelabel: 'View alternative products',
    }}
    offer={null}
    tags={null}
    butchersnote={null}
    storageinfo={storageinfoOptions[0]}
    deliveryinfo={deliveryinfoOptions[0]}
    pricerpp={null}
    pricepor={null}
  />,
  <ProductCard
    {...DefaultArgs}
    name={generateUniqueName()}
    image={getRandomImage()}
    availability={{
      status: 'partialStock',
    }}
    tags={['sponsored']}
    dietaryinfo={[dietaryinfoOptions[3]]}
    quantity={10}
    butchersnote={null}
    offer={{
      label: 'Low stock',
      date: 'until 28th Feb',
      variant: 'club',
      sublabel:
        'Save £3 on Any 3 products from the Excellence Range Example of a longer sublabel',
    }}
    servings={['2L']}
    selectable={{
      enabled: true,
      onSelected: (id) => {
        console.log('selected product id', id);
      },
      isselected: true,
    }}
    pricerpp={null}
  />,
  <ProductCard
    {...DefaultArgs}
    name={generateUniqueName()}
    image={getRandomImage()}
    availability={{
      status: 'lowStock',
    }}
    dietaryinfo={[dietaryinfoOptions[4], dietaryinfoOptions[5]]}
    offer={null}
    tags={['trending', 'marketplace']}
    butchersnote={{
      hasnote: false,
      note: null,
    }}
    pricerpp={null}
    pricepor={null}
    hasmessage={{
      message: (
        <>
          <span className="tw:font-medium">Important:</span> Product has been
          recalled due to safety concerns
        </>
      ),
      type: 'warning',
    }}
    addedtowishlist={true}
  />,
  <ProductCard
    {...DefaultArgs}
    name={generateUniqueName()}
    image={getRandomImage()}
    servings={['Case of 4 x 2L', 'Serves 10', '2L']}
    offer={null}
    tags={['online-exclusive']}
    dietaryinfo={null}
    pricerpp={null}
    pricepor={null}
  />,

  <ProductCard
    {...DefaultArgs}
    name={generateUniqueName()}
    image={getRandomImage()}
    offer={null}
    tags={null}
    pricerpp={null}
    pricepor={null}
    hasmessage={{
      message: (
        <>
          <span className="tw:font-medium">Important:</span> Product is
          currently in limited supply nationwide
        </>
      ),
      type: 'info',
    }}
  />,

  <ProductCard
    {...DefaultArgs}
    name={generateUniqueName()}
    image={getRandomImage()}
    offer={null}
    tags={['recent-order']}
  />,
  <ProductCard
    {...DefaultArgs}
    name={generateUniqueName()}
    image={getRandomImage()}
    offer={null}
    tags={['previous-order']}
  />,

  <ProductCard
    {...DefaultArgs}
    name={generateUniqueName()}
    image={getRandomImage()}
    offer={null}
    butchersnote={null}
    tags={['new']}
  />,

  <ProductCard
    {...DefaultArgs}
    name={generateUniqueName()}
    image={getRandomImage()}
    availability={{
      status: 'lowStock',
    }}
    tags={['online-exclusive']}
  />,

  <ProductCard
    {...DefaultArgs}
    name={generateUniqueName()}
    image={getRandomImage()}
    offer={{
      label: 'Discount Offer',
      date: 'until 28th Feb',
      prevText: 'Was £6.50',
      discountText: 'Save £1.60',
      variant: 'club',
    }}
    butchersnote={null}
    tags={['bestseller']}
  />,

  <ProductCard
    {...DefaultArgs}
    name={generateUniqueName()}
    image={getRandomImage()}
    offer={{
      label: 'Discount Offer',
      date: 'until 28th Feb',
      prevText: 'Was £6.50',
      discountText: 'Save £1.60',
    }}
    tags={['online-exclusive']}
  />,
];

// Export it separately for use in other stories
export { PRODUCT_CARDS, DefaultArgs };

/**
 * No availability story for the ProductCard component.
 */
export const NoAvailability = () => (
  <div className="tw:max-w-[320px]">
    <ProductCard
      {...DefaultArgs}
      name={generateUniqueName()}
      image={getRandomImage()}
      offer={{
        label: 'Discount Offer',
        date: 'until 28th Feb',
        prevText: 'Was £6.50',
        discountText: 'Save £1.60',
      }}
      butchersnote={null}
      availability={null}
      tags={['online-exclusive']}
    />
  </div>
);

/**
 * With card index story for the ProductCard component.
 */
export const WithCardIndex = () => (
  <div className="tw:grid tw:max-w-5xl tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-3">
    <ProductCard
      {...DefaultArgs}
      name={generateUniqueName()}
      image={getRandomImage()}
      offer={{
        label: 'Discount Offer',
        date: 'until 28th Feb',
        prevText: 'Was £6.50',
        discountText: 'Save £1.60',
      }}
      butchersnote={null}
      availability={null}
      tags={['online-exclusive']}
      cardindex={1}
    />
    <ProductCard
      {...DefaultArgs}
      name={generateUniqueName()}
      image={getRandomImage()}
      offer={null}
      butchersnote={null}
      availability={null}
      tags={['bestseller']}
      cardindex={2}
    />
    <ProductCard
      {...DefaultArgs}
      name={generateUniqueName()}
      image={getRandomImage()}
      offer={null}
      butchersnote={null}
      availability={null}
      tags={['new']}
      cardindex={3}
    />
  </div>
);

/**
 * No price story for the ProductCard component.
 */
export const NoPrice = () => {
  return (
    <div className="tw:max-w-[320px]">
      <ProductCard
        {...DefaultArgs}
        name="No Price Product"
        image={getRandomImage()}
        price={null}
        pricewithvat={null}
        priceperunit={null}
        pricerpp={null}
        pricepor={null}
        tags={['new']}
      />
      ,
    </div>
  );
};

/**
 * Logged out state of the ProductCard component.
 */

export const LoggedOut = () => (
  <div className="tw:max-w-[320px]">
    <ProductCard
      {...DefaultArgs}
      name={generateUniqueName()}
      image={getRandomImage()}
      offer={{
        label: 'Discount Offer',
        date: 'until 28th Feb',
        prevText: 'Was £6.50',
        discountText: 'Save £1.60',
      }}
      loggedout={true}
      onbecomeamember={() => alert('Become a member clicked')}
      tags={['online-exclusive']}
    />
  </div>
);

/**
 * All variations story.
 * Demonstrates different component configurations in a single view.
 */
export const Grid = {
  render: () => {
    return (
      <div className="tw-container">
        <div className="tw:grid tw:grid-cols-1 tw:gap-4 tw:gap-y-8 tw:sm:grid-cols-2 tw:lg:grid-cols-3 tw:2xl:grid-cols-4">
          {PRODUCT_CARDS}
        </div>
      </div>
    );
  },
};

/**
 * List view story.
 * Demonstrates the component in a list format.
 */
export const List = {
  render: () => {
    return (
      <div className="tw:space-y-4">
        {PRODUCT_CARDS.map((card) => {
          return cloneElement(card, { mode: 'list' });
        })}
      </div>
    );
  },
};

/**
 * Rail section story.
 * Demonstrates the component in a horizontal slider.
 * This story uses the Carousel component to display a list of ProductCard components.
 */
export const ProductCardRailSection = {
  render: () => {
    return (
      <div className="tw:h-full">
        <RailSection
          title="Featured Products"
          description="Check out our latest products"
          tag="New"
          cta="View all"
          href="#"
          carouseloptions={{
            slidesPerView: 1.25,
            breakpoints: {
              680: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2.3,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 3.3,
              },
              1312: {
                slidesOffsetBefore: 64,
                slidesOffsetAfter: 64,
                slidesPerView: 4.5,
              },
            },
          }}
        >
          {PRODUCT_CARDS}
        </RailSection>
      </div>
    );
  },
};

/**
 * ProductCard with quantity 1 so it shows the butchers note.
 */
export const ProductCardWithButchersNote = () => {
  return (
    <div className="tw:max-w-[320px]">
      <ProductCard
        {...DefaultArgs}
        name={generateUniqueName()}
        image={getRandomImage()}
        butchersnote={{
          hasnote: false,
        }}
      />
    </div>
  );
};

/**
 * ProductCard with quantity 1 and a note.
 */
export const ProductCardWithButchersNoteAndText = () => {
  return (
    <div className="tw:max-w-[320px]">
      <ProductCard
        {...DefaultArgs}
        name={generateUniqueName()}
        image={getRandomImage()}
        quantity={1}
        butchersnote={{
          hasnote: true,
          note: 'This is a sample butchers note text.',
        }}
      />
    </div>
  );
};

/**
 * ProductCard with unavailable product.
 */
export const ProductCardUnavailable = () => {
  return (
    <div className="tw:max-w-[320px]">
      <ProductCard
        {...DefaultArgs}
        name={generateUniqueName()}
        image={getRandomImage()}
        availability={{
          status: 'outOfStock',
          outofstocknotice: 'Out of stock in all stores',
        }}
      />
    </div>
  );
};

/**
 * ProductCard available at branch only.
 */
export const AvailableAtBranchOnly = () => {
  return (
    <div className="tw:max-w-[320px]">
      <ProductCard {...DefaultArgs} branchonly={true} />
    </div>
  );
};

export const DelistedProductCard = () => {
  return (
    <div className="tw:h-full tw:max-w-[320px]">
      <ProductCard
        {...DefaultArgs}
        name={generateUniqueName()}
        image={getRandomImage()}
        availability={{
          status: 'outOfStock',
          outofstocknotice: 'Out of stock in all stores',
          alternativeaction: action('alternative-url-clicked'),
          alternativelabel: 'View alternative products',
        }}
        offer={null}
        tags={null}
        butchersnote={null}
        storageinfo={storageinfoOptions[0]}
        deliveryinfo={deliveryinfoOptions[0]}
        pricerpp={null}
        pricepor={null}
      />
    </div>
  );
};
