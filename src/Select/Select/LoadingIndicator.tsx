import { Spinner as WpSpinner } from '@wordpress/components';
import styled from 'styled-components';

export default function LoadingIndicator() {
  return <Spinner />;
}

const Spinner = styled(WpSpinner)`
  margin: 0 4px 0 0;
`;
