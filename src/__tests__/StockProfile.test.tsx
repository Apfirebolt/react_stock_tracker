import StockProfile from "../components/StockProfile";
import { render, screen } from "@testing-library/react";

describe("StockProfile", () => {
    const mockStockProfile = {
        country: "USA",
        currency: "USD",
        estimateCurrency: "USD",
        exchange: "NASDAQ",
        finnhubIndustry: "Technology",
        ipo: "1980-12-12",
        logo: "https://example.com/logo.png",
        marketCapitalization: 2000000,
        name: "Tech Corp",
        phone: "123-456-7890",
        shareOutstanding: 100000,
        ticker: "TECH",
        weburl: "https://techcorp.com",
    };

    it("should render the stock component", () => {
        render(<StockProfile stockProfile={mockStockProfile} />);
        const nameElement = screen.getByText(/Tech Corp/i);
        expect(nameElement).toBeInTheDocument();
    });

    it("should render the industry field", () => {
        render(<StockProfile stockProfile={mockStockProfile} />);
        expect(screen.getByText(/Industry:/i)).toBeInTheDocument();
        expect(screen.getByText("Technology")).toBeInTheDocument();
    });

    it("should render the country field", () => {
        render(<StockProfile stockProfile={mockStockProfile} />);
        expect(screen.getByText(/Country:/i)).toBeInTheDocument();
        expect(screen.getByText("USA")).toBeInTheDocument();
    });

    it("should render the exchange field", () => {
        render(<StockProfile stockProfile={mockStockProfile} />);
        expect(screen.getByText(/Exchange:/i)).toBeInTheDocument();
        expect(screen.getByText("NASDAQ")).toBeInTheDocument();
    });

    it("should render the website link with correct attributes", () => {
        render(<StockProfile stockProfile={mockStockProfile} />);
        const linkElement = screen.getByRole("link", { name: /techcorp.com/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "https://techcorp.com");
        expect(linkElement).toHaveAttribute("target", "_blank");
        expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should render all required labels", () => {
        render(<StockProfile stockProfile={mockStockProfile} />);
        expect(screen.getByText(/Name:/i)).toBeInTheDocument();
        expect(screen.getByText(/Industry:/i)).toBeInTheDocument();
        expect(screen.getByText(/Country:/i)).toBeInTheDocument();
        expect(screen.getByText(/Exchange:/i)).toBeInTheDocument();
        expect(screen.getByText(/Website:/i)).toBeInTheDocument();
    });
});
