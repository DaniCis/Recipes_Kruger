import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LayoutAuth from './auth/layout/layoutAuth';
import Footer from './recipies/components/Footer';


const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}));



describe('Test App Recipe', () => {


  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  })

  it('renders a button', () => {
    render(<LayoutAuth />);
    screen.getByText('Create an account'); //.toHaveTextContent('Create an account')
  })

  



})