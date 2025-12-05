import type { HomePageProps } from '../Interface/HomePageProps';
import type { Product } from '../../../../types';

export interface Props {
  productos: Product[];
  onNavigate: HomePageProps['onNavigate'];
  addToCart: (productId: string, quantity: number) => void;
}