import BarcodeTable from './BarcodeTable';

export default {
  title: 'Components/Tables/BarcodeTable',
  component: BarcodeTable,
  argTypes: {
    categories: { control: 'object' },
  },
};

const Template = (args) => <BarcodeTable {...args} />;

const sampleCategory1Items = [
  {
    type: 'product',
    barcode: './images/barcode.png',
    productCode: '1234567',
    description: 'Bombay Citrus Collins 12 x 250ml',
    stockLevel: 'Good',
    packSize: '1 x 6 x 250ml',
    wsp: '£19.99',
    rsp: '£19.99',
    vat: '20%',
    qtyOrderedPrevWks: [100, 100, 100, 100],
    qtyInTrolley: 88,
  },
  {
    type: 'unrecognized',
    barcode: '324242342',
    message: 'Code not recognised',
  },
  {
    type: 'product',
    barcode: './images/barcode.png',
    productCode: '1234567',
    description: 'Captain Morgan spiced And Pepsi Max 250ml Can',
    stockLevel: 'Good',
    packSize: '1 x 6 x 250ml',
    wsp: '£19.99',
    rsp: '£19.99',
    vat: '20%',
    qtyOrderedPrevWks: [100, 100, 100, 100],
    qtyInTrolley: 12,
  },
  {
    type: 'product',
    barcode: './images/barcode.png',
    productCode: '1122334',
    description: 'Bombay Citrus Collins 12 x 250ml',
    stockLevel: 'Good',
    packSize: '1 x 6 x 250ml',
    wsp: '£19.99',
    rsp: '£19.99',
    vat: '20%',
    qtyOrderedPrevWks: [100, 100, 100, 100],
    qtyInTrolley: 88,
  },
  {
    type: 'product',
    barcode: './images/barcode.png',
    productCode: '4455667',
    description: 'Bombay Citrus Collins 250ml',
    stockLevel: 'Good',
    packSize: '1 x 6 x 250ml',
    wsp: '£21.99',
    rsp: '£21.99',
    vat: '20%',
    qtyOrderedPrevWks: [50, 50, 50, 50],
    qtyInTrolley: 5,
  },
  {
    type: 'product',
    barcode: './images/barcode.png',
    productCode: '5566778',
    description: 'Bombay Citrus Collins 250ml',
    stockLevel: 'Good',
    packSize: '1 x 6 x 250ml',
    wsp: '£21.99',
    rsp: '£21.99',
    vat: '20%',
    qtyOrderedPrevWks: [50, 50, 50, 50],
    qtyInTrolley: 5,
  },
];

const sampleCategory2Items = [
  {
    type: 'product',
    barcode: './images/barcode.png',
    productCode: '7654321',
    description: 'Dead Mans Fingers Blue Raspberry Mojito Cans 12 x 330ml',
    stockLevel: 'Low',
    packSize: '1 x 6 x 330ml',
    wsp: '£21.99',
    rsp: '£21.99',
    vat: '20%',
    qtyOrderedPrevWks: [50, 50, 50, 50],
    qtyInTrolley: 5,
  },
  {
    type: 'product',
    barcode: './images/barcode.png',
    productCode: '1122334',
    description: 'Gordons & Tonic 250ml',
    stockLevel: 'Good',
    packSize: '1 x 6 x 250ml',
    wsp: '£18.99',
    rsp: '£18.99',
    vat: '20%',
    qtyOrderedPrevWks: [70, 70, 70, 70],
    qtyInTrolley: 20,
  },
  {
    type: 'unrecognized',
    barcode: '324242342',
    message: 'Code not recognised',
  },
  {
    type: 'product',
    barcode: './images/barcode.png',
    productCode: '2211444',
    description: 'Gordons Pink Gin & Tonic 250ml',
    stockLevel: 'Good',
    packSize: '1 x 6 x 250ml',
    wsp: '£18.99',
    rsp: '£18.99',
    vat: '20%',
    qtyOrderedPrevWks: [70, 70, 70, 70],
    qtyInTrolley: 20,
  },
  {
    type: 'product',
    barcode: './images/barcode.png',
    productCode: '3344555',
    description: 'Bombay Citrus Collins 250ml',
    stockLevel: 'Good',
    packSize: '1 x 6 x 250ml',
    wsp: '£21.99',
    rsp: '£21.99',
    vat: '20%',
    qtyOrderedPrevWks: [50, 50, 50, 50],
    qtyInTrolley: 5,
  },
  {
    type: 'product',
    barcode: './images/barcode.png',
    productCode: '4455667',
    description: 'Bombay Citrus Collins 250ml',
    stockLevel: 'Good',
    packSize: '1 x 6 x 250ml',
    wsp: '£21.99',
    rsp: '£21.99',
    vat: '20%',
    qtyOrderedPrevWks: [50, 50, 50, 50],
    qtyInTrolley: 5,
  },
  {
    type: 'product',
    barcode: './images/barcode.png',
    productCode: '5566778',
    description: 'Bombay Citrus Collins 250ml',
    stockLevel: 'Good',
    packSize: '1 x 6 x 250ml',
    wsp: '£21.99',
    rsp: '£21.99',
    vat: '20%',
    qtyOrderedPrevWks: [50, 50, 50, 50],
    qtyInTrolley: 5,
  },
];

export const Default = Template.bind({});
Default.args = {
  categories: [
    {
      categoryName: 'Alcohol Ready To Drink',
      items: sampleCategory1Items,
    },
    {
      categoryName: 'Spirits Miniatures',
      items: sampleCategory2Items,
    },
  ],
};

export const SingleCategory = Template.bind({});
SingleCategory.args = {
  categories: [
    {
      categoryName: 'Soft Drinks',
      items: sampleCategory1Items.slice(0, 2),
    },
  ],
};

export const EmptyTable = Template.bind({});
EmptyTable.args = {
  categories: [],
};

export const OnlyUnrecognized = Template.bind({});
OnlyUnrecognized.args = {
  categories: [
    {
      categoryName: 'Attempted Scans',
      items: [
        {
          type: 'unrecognized',
          barcode: '324242342',
          message: 'Code not recognised',
        },
        {
          type: 'unrecognized',
          barcode: '324242342',
          message: 'Code not recognised',
        },
      ],
    },
  ],
};

export const CategoryWithNoItems = Template.bind({});
CategoryWithNoItems.args = {
  categories: [
    {
      categoryName: 'Empty Category',
      items: [],
    },
    {
      categoryName: 'Category With Items',
      items: sampleCategory1Items.slice(0, 1),
    },
  ],
};

export const MultipleCategoriesWithUnrecognized = Template.bind({});
MultipleCategoriesWithUnrecognized.args = {
  categories: [
    {
      categoryName: 'Wines',
      items: [
        sampleCategory1Items[0],
        {
          type: 'unrecognized',
          barcode: '324242342',
          message: 'Wine barcode not found.',
        },
      ],
    },
    {
      categoryName: 'Beers',
      items: [
        sampleCategory2Items[0],
        {
          type: 'unrecognized',
          barcode: '324242342',
          message: 'Beer barcode not processed.',
        },
        sampleCategory2Items[1],
      ],
    },
  ],
};
