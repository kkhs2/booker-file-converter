import { useState } from 'preact/hooks';
import RepOrderProductList from './RepOrderProductList';
import { getRandomDrinksImage } from '../../../utils/mockData';

// Mock data for the stories
const mockProducts = [
  {
    id: '332051',
    code: '332051',
    name: 'Oyster Bay Pinot Noir 750ml',
    itemsPerCase: 6,
    size: '75cl',
    wsp: 130.59,
    rrp: 16.55,
    por: 5.3,
    vat: 20,
    qty: 1,
    isLowStock: true,
    image: getRandomDrinksImage(),
  },
  {
    id: '332052',
    code: '332052',
    name: 'Chardonnay Reserve 750ml',
    itemsPerCase: 12,
    size: '75cl',
    wsp: 89.99,
    rrp: 12.99,
    por: 4.2,
    vat: 20,
    qty: 1,
    isLowStock: false,
    image: getRandomDrinksImage(),
  },
  {
    id: '445123',
    code: '445123',
    name: 'Stella Artois Lager 330ml',
    itemsPerCase: 24,
    size: '330ml',
    wsp: 28.5,
    rrp: 2.85,
    por: 6.1,
    vat: 20,
    qty: 1,
    isLowStock: false,
    image: getRandomDrinksImage(),
  },
  {
    id: '445124',
    code: '445124',
    name: 'Corona Extra 355ml',
    itemsPerCase: 24,
    size: '355ml',
    wsp: 32.4,
    rrp: 3.2,
    por: 5.8,
    vat: 20,
    qty: 1,
    isLowStock: true,
    image: getRandomDrinksImage(),
  },
  {
    id: '556789',
    code: '556789',
    name: 'Jameson Irish Whiskey 700ml',
    itemsPerCase: 6,
    size: '70cl',
    wsp: 180.0,
    rrp: 35.0,
    por: 7.2,
    vat: 20,
    qty: 1,
    isLowStock: false,
    image: getRandomDrinksImage(),
  },
  {
    id: '556790',
    code: '556790',
    name: 'Grey Goose Vodka 700ml',
    itemsPerCase: 6,
    size: '70cl',
    wsp: 250.0,
    rrp: 45.0,
    por: 8.5,
    vat: 20,
    qty: 1,
    isLowStock: false,
    image: getRandomDrinksImage(),
  },
];

export default {
  title: 'Components/Tables/Rep Order Product List',
  tags: ['autodocs'],
  component: RepOrderProductList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        transform: (source, storyContext) => {
          // Get the story args
          const { args } = storyContext;
          if (!args) return source;

          // Convert args to JSX props string
          const props = Object.entries(args)

            .map(([key, value]) => {
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

          return `<RepOrderProductList\n  ${props}\n/>`;
        },
      },
      description: {
        component:
          'A product table component for rep ordering with quantity controls and stock indicators.',
      },
    },
  },
  argTypes: {
    products: {
      control: 'object',
      description: 'Array of products to display (with qty property)',
    },
    onQuantityChange: {
      action: 'quantityChanged',
      description: 'Callback function when quantity changes',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the product list is in readonly mode',
    },
  },
};

const Template = (args) => <RepOrderProductList {...args} />;

export const Default = Template.bind({});
Default.args = {
  products: mockProducts,
};

// Example showing how to handle quantity changes
export const Interactive = () => {
  const [products, setProducts] = useState(mockProducts);

  const handleQuantityChange = (
    productCode,
    newQuantity,
    updatedProduct,
    allProducts,
  ) => {
    console.log(`Product ${productCode} quantity changed to ${newQuantity}`);
    console.log('Updated product:', updatedProduct);
    setProducts(allProducts);
  };

  const quantities = {};
  products.forEach((product) => {
    if (product.qty > 0) {
      quantities[product.code] = product.qty;
    }
  });

  return (
    <div>
      <div className="tw:mb-4 tw:rounded tw:bg-gray-100 tw:p-4">
        <h3 className="tw:mb-2 tw:text-lg tw:font-semibold">
          Current Order Summary
        </h3>
        <p className="tw:text-sm">
          Total items:{' '}
          {products.reduce((sum, product) => sum + (product.qty || 0), 0)}
        </p>
        <pre className="tw:mt-2 tw:rounded tw:bg-white tw:p-2 tw:text-xs">
          {JSON.stringify(quantities, null, 2)}
        </pre>
      </div>
      <RepOrderProductList
        products={products}
        onQuantityChange={handleQuantityChange}
      />
    </div>
  );
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  products: mockProducts,
  readonly: true,
};
