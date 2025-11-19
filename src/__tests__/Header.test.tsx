import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppHeader from "../components/Header";

const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("AppHeader Component", () => {
    it("should render the header with correct title", () => {
        renderWithRouter(<AppHeader />);
        expect(screen.getByText("Stock Tracker App")).toBeInTheDocument();
    });

    it("should render all menu items", () => {
        renderWithRouter(<AppHeader />);
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Countries")).toBeInTheDocument();
        expect(screen.getByText("Symbols")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Register")).toBeInTheDocument();
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should render links with correct paths", () => {
        renderWithRouter(<AppHeader />);
        expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: "Countries" })).toHaveAttribute("href", "/countries");
        expect(screen.getByRole("link", { name: "Symbols" })).toHaveAttribute("href", "/symbols");
        expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
        expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute("href", "/login");
        expect(screen.getByRole("link", { name: "Register" })).toHaveAttribute("href", "/register");
        expect(screen.getByRole("link", { name: "Test" })).toHaveAttribute("href", "/test");
    });

    it("should render exactly 7 menu items", () => {
        renderWithRouter(<AppHeader />);
        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(7);
    });

    it("should have correct background color styling", () => {
        const { container } = renderWithRouter(<AppHeader />);
        const header = container.querySelector(".ant-layout-header");
        expect(header).toHaveStyle({ backgroundColor: "#006A67" });
    });
});
