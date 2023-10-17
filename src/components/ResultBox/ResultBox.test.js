import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
  
describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    it('should render proper info about conversion when PLN -> USD.', () => {
        const amounts = [100, 50, 200, 350]

        for(let amount of amounts) {
        
        render(<ResultBox amount={amount} from="PLN" to="USD" /> )
        const output = screen.getByTestId('output')
        expect(output).toHaveTextContent(`PLN ${amount}.00 = $${Math.round(amount/3.5)}.00`);
        cleanup()
    }
    })

    it('should render proper info about conversion when USD -> PLN.', () => {
        const amounts = [100, 50, 200, 350]

        for(let amount of amounts) {
        
        render(<ResultBox amount={amount} from="USD" to="PLN" /> )
        const output = screen.getByTestId('output')
        expect(output).toHaveTextContent(`PLN ${amount}.00 = $${Math.round(amount*3.5)}.00`);
        cleanup()
    }
    })

    it('should render proper info when the same currency is selected in both options', () => {
        const currencies = ['USD', 'PLN']

        for(let currency of currencies) {
        
        render(<ResultBox amount={123} from={currency} to={currency} /> )
        const output = screen.getByTestId('output')
        if(currency === 'USD'){
            expect(output).toHaveTextContent('$123.00 = $123.00');
        } else {
          expect(output).toHaveTextContent('PLN 123.00 = PLN 123.00');
        }
    }
    })

    it('should render proper info when amount has negative value', () => {
        render(<ResultBox amount={-100} from='PLN' to='USD'/>);
          const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('Wrong value...');
      });

    
});