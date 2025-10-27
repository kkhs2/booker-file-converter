import ClaimsProductTable from './ClaimsProductTable';
import { getRandomImage } from '../../../utils/mockData';

export default {
  title: 'Components/Claims/Claims Table',
  tags: ['autodocs'],
  component: ClaimsProductTable,
  parameters: {
    layout: 'padded',
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

  argTypes: {
    products: { control: 'object' },
    classname: { control: 'text' },
    onclaimsubmit: { action: 'claim submitted' },
  },
};

/**
 * This component displays products in a table format with checkboxes.
 * When a checkbox is selected, a claim form appears below the product row.
 *
 * The form allows users to select a reason for the claim, specify quantity affected,
 * and add additional comments.
 *
 * When a claim is submitted, the data is passed to the onclaimsubmit callback function.
 */

// Mock data for the stories
const mockProducts = [
  {
    category: 'Wine',
    products: [
      {
        id: 'product-1',
        code: 'WN001',
        name: 'Cabernet Sauvignon',
        image: getRandomImage(),
        itemsPerCase: 6,
        size: '750ml',
        casePrice: 120.0,
        qtw: 2,
        total: 240.0,
      },
      {
        id: 'product-2',
        code: 'WN002',
        name: 'Chardonnay',
        image: getRandomImage(),
        itemsPerCase: 12,
        size: '750ml',
        casePrice: 180.0,
        qtw: 1,
        total: 180.0,
        alreadyclaimed: true,
      },
    ],
  },
  {
    category: 'Spirits',
    products: [
      {
        id: 'product-3',
        code: 'SP001',
        name: 'Premium Vodka',
        image: getRandomImage(),
        itemsPerCase: 6,
        size: '1L',
        casePrice: 210.0,
        qtw: 1,
        total: 210.0,
      },
      {
        id: 'product-4',
        code: 'SP002',
        name: 'Single Malt Whisky',
        image: getRandomImage(),
        itemsPerCase: 6,
        size: '700ml',
        casePrice: 300.0,
        qtw: 1,
        total: 300.0,
      },
    ],
  },
  {
    category: 'Beer',
    products: [
      {
        id: 'product-5',
        code: 'BR001',
        name: 'Craft IPA',
        image: getRandomImage(),
        itemsPerCase: 24,
        size: '330ml',
        casePrice: 72.0,
        qtw: 2,
        total: 144.0,
      },
    ],
  },
];

// Default story
export const Default = {
  args: {
    products: mockProducts,
  },
};

// Single category story
export const SingleCategory = {
  args: {
    products: [mockProducts[0]],
  },
};

// Many products story
export const ManyProducts = {
  args: {
    products: [
      {
        category: 'Wine',
        products: Array(10)
          .fill()
          .map((_, index) => ({
            id: `product-wine-${index + 1}`,
            code: `WN${String(index + 1).padStart(3, '0')}`,
            name: `Wine Product ${index + 1}`,
            image: getRandomImage(),
            itemsPerCase: 6,
            size: '750ml',
            casePrice: 100 + index * 10,
            qtw: 1,
            total: 100 + index * 10,
            alreadyclaimed: index === 2,
          })),
      },
    ],
  },
};

export const ClaimsOpen = {
  args: {
    products: [
      {
        category: 'Wine',
        products: Array(3)
          .fill()
          .map((_, index) => ({
            id: `product-wine-${index + 1}`,
            code: `WN${String(index + 1).padStart(3, '0')}`,
            name: `Wine Product ${index + 1}`,
            image: getRandomImage(),
            itemsPerCase: 6,
            size: '750ml',
            casePrice: 100 + index * 10,
            qtw: 1,
            total: 100 + index * 10,
            claim: {
              reason: 'The product was of poor quality',
              quantity: 1,
              image: 'example-image.jpg',
              description: 'The glass was broken.',
            },
          })),
      },
    ],
  },
};

// Empty state
export const EmptyState = {
  args: {
    products: [],
  },
};
