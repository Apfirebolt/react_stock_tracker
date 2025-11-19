import { render, screen } from "@testing-library/react";
import Hero from "../components/Hero";
import "@testing-library/jest-dom";

describe("Hero Component", () => {
    it("should render the hero component", () => {
        render(<Hero randomNumber={42} />);
        expect(screen.getByText("Welcome to Stock Tracker App")).toBeInTheDocument();
    });

    it("should render the hero image with correct attributes", () => {
        render(<Hero randomNumber={42} />);
        const image = screen.getByAltText("Stock Tracker");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute(
            "src",
            "https://musicart.xboxlive.com/7/ac6d5100-0000-0000-0000-000000000002/504/image.jpg"
        );
    });

    it("should render the description paragraph", () => {
        render(<Hero randomNumber={42} />);
        expect(
            screen.getByText("Track your favorite stocks and stay updated with real-time data.")
        ).toBeInTheDocument();
    });

    it("should apply correct styling to the container", () => {
        const { container } = render(<Hero randomNumber={42} />);
        const heroDiv = container.firstChild as HTMLElement;
        expect(heroDiv).toHaveStyle({
            background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
            padding: "1rem",
            textAlign: "center",
            color: "white",
        });
    });

    it("should render without crashing when randomNumber prop is provided", () => {
        const { container } = render(<Hero randomNumber={123} />);
        expect(container).toBeTruthy();
    });
});
