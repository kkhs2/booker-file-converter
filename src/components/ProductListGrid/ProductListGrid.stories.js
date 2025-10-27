import { useState } from 'preact/hooks';
import ProductListGrid from './ProductListGrid';
import ProductCard from '../ProductCard/ProductCard';
import { DefaultArgs } from '../ProductCard/ProductCard.stories';
import ProductFilters from '../ProductFilters/ProductFilters';
import { Default as ProductFiltersArgs } from '../ProductFilters/ProductFilters.stories';

export default {
  title: 'Sections/Product List Grid',
  component: ProductListGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Description
The Product List Grid component is a reusable component that displays a grid of product cards. It allows users to switch between grid and list views, providing flexibility in how products are presented.

`,
      },
    },
  },
  argTypes: {
    viewMode: {
      control: 'select',
      options: ['grid', 'list'],
      description: 'The current view mode of the product list grid.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'grid' },
      },
    },
  },
};

/**
 * Default story for ProductListGrid component
 */
export const Default = {
  render: () => {
    const [viewMode, setViewMode] = useState('grid');

    const handleViewModeChange = (mode) => {
      setViewMode(mode);
    };

    return (
      <div>
        <div className="tw:mt-12 tw:mb-4 tw:lg:mt-20 tw:lg:mb-10">
          <ProductFilters {...ProductFiltersArgs.args} />
        </div>

        <ProductListGrid viewmode={viewMode}>
          {Array.from({ length: 8 }, (_, index) => (
            <ProductCard key={index} {...DefaultArgs} mode={viewMode} />
          ))}
        </ProductListGrid>
      </div>
    );
  },
};

/**
 * Grid view mode story
 */
export const GridView = {
  args: {
    viewMode: 'grid',
  },
  render: (args) => (
    <ProductListGrid {...args}>
      {Array.from({ length: 8 }, (_, index) => (
        <ProductCard key={index} {...DefaultArgs} mode={args.viewMode} />
      ))}
    </ProductListGrid>
  ),
};

/**
 * List view mode story
 */
export const ListView = {
  args: {
    viewMode: 'list',
  },
  render: (args) => (
    <ProductListGrid {...args}>
      {Array.from({ length: 8 }, (_, index) => (
        <ProductCard key={index} {...DefaultArgs} mode={args.viewMode} />
      ))}
    </ProductListGrid>
  ),
};
