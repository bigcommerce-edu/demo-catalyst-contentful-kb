import {
  Combobox,
  Group,
  List,
  Number,
  Select,
  Style,
  TextInput,
} from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { searchProducts } from '../../utils/search-products';

import { MSProductsList } from './client';

runtime.registerComponent(MSProductsList, {
  type: 'primitive-products-list',
  label: 'Catalog / Products List',
  icon: 'gallery',
  props: {
    className: Style(),
    collection: Select({
      label: 'Product collection',
      options: [
        { value: 'none', label: 'None (static only)' },
        { value: 'best-selling', label: 'Best selling' },
        { value: 'newest', label: 'Newest' },
        { value: 'featured', label: 'Featured' },
      ],
      defaultValue: 'best-selling',
    }),
    limit: Number({ label: 'Max collection items', defaultValue: 12 }),
    additionalProducts: List({
      label: 'Additional products',
      type: Group({
        label: 'Product',
        props: {
          title: TextInput({ label: 'Title', defaultValue: 'Product title' }),
          entityId: Combobox({
            label: 'Product',
            async getOptions(query) {
              const products = await searchProducts(query);

              return products.map((product) => ({
                id: product.entityId.toString(),
                label: product.name,
                value: product.entityId.toString(),
              }));
            },
          }),
        },
      }),
      getItemLabel(product) {
        return product?.title || 'Product Title';
      },
    }),
    aspectRatio: Select({
      label: 'Aspect ratio',
      options: [
        { value: '1:1', label: 'Square' },
        { value: '5:6', label: '5:6' },
        { value: '3:4', label: '3:4' },
      ],
      defaultValue: '5:6',
    }),
    colorScheme: Select({
      label: 'Text Color Scheme',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
      defaultValue: 'light',
    }),
  },
});
