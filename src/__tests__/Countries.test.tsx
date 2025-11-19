import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Countries from "../screens/Countries";
import { axiosInstance } from "../plugins/interceptor";
import { useAtom } from "jotai";

vi.mock("../plugins/interceptor");
vi.mock("jotai");
vi.mock("../components/Loader", () => ({
  default: () => <div>Loading...</div>,
}));

describe("Countries Component", () => {
  const mockCountries = [
    {
      code2: "US",
      country: "United States",
      currency: "USD",
      countryRiskPremium: 0.5,
    },
    {
      code2: "UK",
      country: "United Kingdom",
      currency: "GBP",
      countryRiskPremium: 0.3,
    },
    {
      code2: "JP",
      country: "Japan",
      currency: "JPY",
      countryRiskPremium: null,
    },
  ];

  const mockSetCountries = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAtom as any).mockReturnValue([[], mockSetCountries]);
  });

  it("should display loader while fetching data", () => {
    render(<Countries />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should fetch and display countries successfully", async () => {
    (axiosInstance.get as any).mockResolvedValueOnce({ data: mockCountries });
    (useAtom as any).mockReturnValue([mockCountries, mockSetCountries]);

    render(<Countries />);

    await waitFor(() => {
      expect(screen.getByText("United States")).toBeInTheDocument();
      expect(screen.getByText("United Kingdom")).toBeInTheDocument();
      expect(screen.getByText("Japan")).toBeInTheDocument();
    });
  });

  it("should display currency information correctly", async () => {
    (axiosInstance.get as any).mockResolvedValueOnce({ data: mockCountries });
    (useAtom as any).mockReturnValue([mockCountries, mockSetCountries]);

    render(<Countries />);

    await waitFor(() => {
      expect(screen.getByText("USD")).toBeInTheDocument();
      expect(screen.getByText("GBP")).toBeInTheDocument();
    });
  });

  it('should display "N/A" for missing currency', async () => {
    const countriesWithoutCurrency = [
      { code2: "XX", country: "Test", currency: null, countryRiskPremium: 0.1 },
    ];
    (axiosInstance.get as any).mockResolvedValueOnce({
      data: countriesWithoutCurrency,
    });
    (useAtom as any).mockReturnValue([
      countriesWithoutCurrency,
      mockSetCountries,
    ]);

    render(<Countries />);

    await waitFor(() => {
      expect(screen.getAllByText(/N\/A/)).toHaveLength(1);
    });
  });

  it("should display risk premium correctly", async () => {
    (axiosInstance.get as any).mockResolvedValueOnce({ data: mockCountries });
    (useAtom as any).mockReturnValue([mockCountries, mockSetCountries]);

    render(<Countries />);

    await waitFor(() => {
      expect(screen.getByText("0.5")).toBeInTheDocument();
      expect(screen.getByText("0.3")).toBeInTheDocument();
    });
  });

  it("should handle API error gracefully", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (axiosInstance.get as any).mockRejectedValueOnce(new Error("API Error"));

    render(<Countries />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching countries:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("should call setCountries with API response data", async () => {
    (axiosInstance.get as any).mockResolvedValueOnce({ data: mockCountries });

    render(<Countries />);

    await waitFor(() => {
      expect(mockSetCountries).toHaveBeenCalledWith(mockCountries);
    });
  });

  it("should display welcome message", async () => {
    (axiosInstance.get as any).mockResolvedValueOnce({ data: [] });
    (useAtom as any).mockReturnValue([[], mockSetCountries]);

    render(<Countries />);

    await waitFor(() => {
      expect(
        screen.getByText(/Welcome to the Countries page/)
      ).toBeInTheDocument();
    });
  });

  it("should render countries in grid layout", async () => {
    (axiosInstance.get as any).mockResolvedValueOnce({ data: mockCountries });
    (useAtom as any).mockReturnValue([mockCountries, mockSetCountries]);

    const { container } = render(<Countries />);

    await waitFor(() => {
      const grid = container.querySelector('[style*="grid-template-columns"]');
      expect(grid).toBeInTheDocument();
    });
  });
});
