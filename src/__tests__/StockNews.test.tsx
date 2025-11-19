import { render, screen } from '@testing-library/react';
import StockNews from '../components/StockNews';

describe('StockNews', () => {
    const mockStockNews = {
        category: 'technology',
        datetime: 1234567890,
        headline: 'Tech Stock Soars to New Heights',
        id: 1,
        image: 'https://example.com/image.jpg',
        related: 'AAPL',
        source: 'Financial Times',
        summary: 'The stock market saw significant gains today as tech stocks rallied.',
        url: 'https://example.com/news/1',
    };

    it('should render the stock news component', () => {
        render(<StockNews stockNews={mockStockNews} />);
        const headlineElement = screen.getByText(/Tech Stock Soars to New Heights/i);
        expect(headlineElement).toBeInTheDocument();
    });

    it('should display the headline with label', () => {
        render(<StockNews stockNews={mockStockNews} />);
        expect(screen.getByText('Headline:')).toBeInTheDocument();
        expect(screen.getByText(mockStockNews.headline)).toBeInTheDocument();
    });

    it('should display the source with label', () => {
        render(<StockNews stockNews={mockStockNews} />);
        expect(screen.getByText('Source:')).toBeInTheDocument();
        expect(screen.getByText(mockStockNews.source)).toBeInTheDocument();
    });

    it('should display the summary with label', () => {
        render(<StockNews stockNews={mockStockNews} />);
        expect(screen.getByText('Summary:')).toBeInTheDocument();
        expect(screen.getByText(mockStockNews.summary)).toBeInTheDocument();
    });

    it('should render image when image url is provided', () => {
        render(<StockNews stockNews={mockStockNews} />);
        const imageElement = screen.getByAltText(mockStockNews.headline);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', mockStockNews.image);
    });

    it('should not render image when image url is not provided', () => {
        const newsWithoutImage = { ...mockStockNews, image: '' };
        render(<StockNews stockNews={newsWithoutImage} />);
        const imageElement = screen.queryByAltText(mockStockNews.headline);
        expect(imageElement).not.toBeInTheDocument();
    });

    it('should render a link to read more', () => {
        render(<StockNews stockNews={mockStockNews} />);
        const linkElement = screen.getByText('Read more');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', mockStockNews.url);
        expect(linkElement).toHaveAttribute('target', '_blank');
        expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should apply correct container styles', () => {
        const { container } = render(<StockNews stockNews={mockStockNews} />);
        const newsContainer = container.querySelector('div');
        expect(newsContainer).toHaveStyle({
            background: '#f5f5f5',
            padding: '24px',
            borderRadius: '8px',
            marginBottom: '16px',
        });
    });
});