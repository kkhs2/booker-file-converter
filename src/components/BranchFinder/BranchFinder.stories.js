/**
 * Storybook configuration for the BranchFinder component
 * This defines how the BranchFinder component will appear in Storybook and what controls/options are available.
 */

// Import the component
import NavBar from '../NavBar/NavBar';
import { LoggedIn as LoggedInNavBar } from '../NavBar/NavBar.stories';
import { Error as ErrorNotification } from '../NotificationBar/NotificationBar.stories';
import NotificationBar from '../NotificationBar/NotificationBar';
import BranchFinder from './BranchFinder';
import { getRandomImage, SearchProducts } from '../../../utils/mockData';
import { useMediaQuery } from '../../../utils/helpers';
import { useOverlay } from '../../../hooks/useOverlay';
import RailSection from '../RailSection/RailSection';
import ProductCard from '../ProductCard/ProductCard';
import { DefaultArgs as ProductCardArgs } from '../ProductCard/ProductCard.stories';

export default {
  title: 'Components/Branch Finder',
  // Tags used by Storybook for organisational purposes
  tags: ['autodocs'],

  // Define controls (props) for the component
  argTypes: {
    product: {
      control: 'object',
      description:
        'Product information to check stock for. This is an object containing product details.',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '-' },
      },
    },
    onclose: {
      control: 'function',
      description:
        'Callback function to close the BranchFinder component. This function is called when the user closes the overlay.',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '-' },
      },
    },
    title: {
      control: 'text',
      description: 'The title to display at the top of the branch finder',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Choose a branch to Click & Collect' },
      },
    },
    showresults: {
      control: 'boolean',
      description: 'Whether to show search results initially',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    branchselect: {
      control: 'boolean',
      description: 'Whether to allow branch selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    enablemapview: {
      control: 'boolean',
      description: 'Whether to enable the map view option',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  // Added to override default story height if needed for this component
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
    docs: {
      story: {
        height: '300px',
      },
      source: {
        transform: () => {
          return `// Use the custom hook to manage the overlay state
const { showOverlay, hideOverlay, portalNode } = useOverlay();

const handleOpenBranchFinder = (product) => {
  // Show the overlay when the button is clicked
  showOverlay(BranchFinder, { product, onclose: hideOverlay });

  return <div>
  ...

  {/* Add this somewhere in the page */}
  {/* Branch Finder overlay node */}
    {portalNode}
  </div>
  ...
};`;
        },
      },
      description: {
        component: `
The BranchFinder component is a part of the Booker UI Design Library. It is used to find branches based on user input.

### Design Figma References
- [Branch Finder Overlay](https://www.figma.com/design/Jgv6b7BGHkVg0CqK2R7A4O/Booker-UI-Design-Templates?node-id=3986-79164&t=He83eR8mc5GSkuwX-4)
        `,
      },
    },
  },
};

export const Default = {
  render: () => {
    const isMobile = useMediaQuery('(max-width: 1023px)');

    // Use the custom hook to manage the overlay state
    const { showOverlay, hideOverlay, portalNode } = useOverlay();

    const handleOpenBranchFinder = () => {
      showOverlay(BranchFinder, {
        onclose: hideOverlay,
        enablemapview: false, // Default view without map
      });
    };

    return (
      <div className="tw:bg-secondary-1000">
        {/* notification bar */}
        <NotificationBar {...ErrorNotification.args} />

        <div className="tw-container-full tw:mb-12 tw:space-y-12 tw:pt-9 tw:lg:mb-[100px] tw:lg:space-y-[100px] tw:lg:pt-11">
          <div className="tw-container">
            {/* nav bar */}
            <NavBar
              {...LoggedInNavBar.args}
              deliverytab={{
                ...LoggedInNavBar.args.deliverytab,
                onlocationchange: handleOpenBranchFinder,
              }}
              searchresultslist={SearchProducts}
              classname="tw:top-[49px] tw:lg:top-[100px]"
              topOffset={isMobile ? 49 : 45}
            />
          </div>
        </div>

        <div className="tw-container-full tw:bg-beige-1000 tw:py-12 tw:lg:py-[100px]">
          {/* feature products carousel */}
          <RailSection
            title="Perfect pairings"
            description="10 suggestions"
            carouseloptions={{
              slidesPerView: 1.25,
              slidesOffsetBefore: 20,
              slidesOffsetAfter: 20,
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
                  slidesPerView: 4.4,
                },
                1312: {
                  slidesPerView: 4.4,
                  slidesOffsetBefore: 64,
                  slidesOffsetAfter: 64,
                },
              },
            }}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <ProductCard
                {...ProductCardArgs}
                key={index}
                image={getRandomImage()}
                availability={{ status: 'lowStock' }}
                onfindanotherbranchclick={handleOpenBranchFinder}
              />
            ))}
          </RailSection>
        </div>

        {/* Branch Finder overlay node */}
        {portalNode}
      </div>
    );
  },
};

export const WithMapView = {
  render: () => {
    const isMobile = useMediaQuery('(max-width: 1023px)');

    // Use the custom hook to manage the overlay state
    const { showOverlay, hideOverlay, portalNode } = useOverlay();

    const handleOpenBranchFinder = () => {
      showOverlay(BranchFinder, {
        onclose: hideOverlay,
        enablemapview: true, // Enable map view
      });
    };

    return (
      <div className="tw:bg-secondary-1000">
        {/* notification bar */}
        <NotificationBar {...ErrorNotification.args} />

        <div className="tw-container-full tw:mb-12 tw:space-y-12 tw:pt-9 tw:lg:mb-[100px] tw:lg:space-y-[100px] tw:lg:pt-11">
          <div className="tw-container">
            {/* nav bar */}
            <NavBar
              {...LoggedInNavBar.args}
              deliverytab={{
                ...LoggedInNavBar.args.deliverytab,
                onlocationchange: handleOpenBranchFinder,
              }}
              searchresultslist={SearchProducts}
              classname="tw:top-[49px] tw:lg:top-[100px]"
              topOffset={isMobile ? 49 : 45}
            />
          </div>
        </div>

        <div className="tw-container-full tw:bg-beige-1000 tw:py-12 tw:lg:py-[100px]">
          {/* feature products carousel */}
          <RailSection
            title="Perfect pairings"
            description="10 suggestions"
            carouseloptions={{
              slidesPerView: 1.25,
              slidesOffsetBefore: 20,
              slidesOffsetAfter: 20,
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
                  slidesPerView: 4.4,
                },
                1312: {
                  slidesPerView: 4.4,
                  slidesOffsetBefore: 64,
                  slidesOffsetAfter: 64,
                },
              },
            }}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <ProductCard
                {...ProductCardArgs}
                key={index}
                image={getRandomImage()}
                availability={{ status: 'lowStock' }}
                onfindanotherbranchclick={handleOpenBranchFinder}
              />
            ))}
          </RailSection>
        </div>

        {/* Branch Finder overlay node */}
        {portalNode}
      </div>
    );
  },
};

export const ProductSpecific = {
  render: () => {
    const { showOverlay, hideOverlay, portalNode } = useOverlay();

    const mockProduct = {
      name: 'Johnnie Walker Black Label',
      image: getRandomImage(),
      availability: { status: 'lowStock' },
    };

    const handleOpenBranchFinder = () => {
      showOverlay(BranchFinder, {
        product: mockProduct,
        showresults: true,
        onclose: hideOverlay,
        title: `Find ${mockProduct.name} in store`,
        branchselect: false,
        enablemapview: false,
      });
    };

    return (
      <div className="tw:bg-secondary-1000">
        <div className="tw-container tw:py-8">
          <ProductCard
            {...ProductCardArgs}
            {...mockProduct}
            onfindanotherbranchclick={handleOpenBranchFinder}
          />
        </div>

        {/* Branch Finder overlay node */}
        {portalNode}
      </div>
    );
  },
};
