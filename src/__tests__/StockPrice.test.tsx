import { render, screen } from "@testing-library/react";
import StockPrice from "../components/StockPrice";

describe("StockPrice", () => {
  const mockStockDetails = {
    c: 150.25,
    pc: 148.5,
    o: 149.0,
    h: 151.75,
    l: 147.8,
  };

  it("renders stock details title", () => {
    render(<StockPrice stockDetails={mockStockDetails} />);
    expect(screen.getByText("Stock Details")).toBeInTheDocument();
  });

  it("renders current price correctly", () => {
    render(<StockPrice stockDetails={mockStockDetails} />);
    expect(screen.getByText("Current Price:")).toBeInTheDocument();
    expect(screen.getByText("$150.25")).toBeInTheDocument();
  });

  it("renders previous close price correctly", () => {
    render(<StockPrice stockDetails={mockStockDetails} />);
    expect(screen.getByText("Previous Close:")).toBeInTheDocument();
    expect(screen.getByText("$148.5")).toBeInTheDocument();
  });

  it("renders open price correctly", () => {
    render(<StockPrice stockDetails={mockStockDetails} />);
    expect(screen.getByText("Open:")).toBeInTheDocument();
    expect(screen.getByText("$149")).toBeInTheDocument();
  });

  it("renders high price correctly", () => {
    render(<StockPrice stockDetails={mockStockDetails} />);
    expect(screen.getByText("High:")).toBeInTheDocument();
    expect(screen.getByText("$151.75")).toBeInTheDocument();
  });

  it("renders low price correctly", () => {
    render(<StockPrice stockDetails={mockStockDetails} />);
    expect(screen.getByText("Low:")).toBeInTheDocument();
    expect(screen.getByText("$147.8")).toBeInTheDocument();
  });

  it("renders with zero values", () => {
    const zeroStockDetails = { c: 0, pc: 0, o: 0, h: 0, l: 0 };
    render(<StockPrice stockDetails={zeroStockDetails} />);
    expect(screen.getByText("$0")).toBeInTheDocument();
  });

  it("renders component with correct structure", () => {
    const { container } = render(
      <StockPrice stockDetails={mockStockDetails} />
    );
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveStyle({
      background: "#f0f2f5",
      maxWidth: "350px",
    });
  });
});
