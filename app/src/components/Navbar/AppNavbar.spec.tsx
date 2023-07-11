import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import AppNavbar from "./AppNavbar";
import {arrhythmiaColors} from "../../types/consts/arrhythmiaColors";

describe("AppNavbar component", () => {
    test("renders logo and search input", () => {
        render(<AppNavbar />);

       // Vérifie si le texte du logo est présent
        const logoText = screen.getByText("Patient Card Triage");

       expect(logoText).toBeInTheDocument();

       // Vérifie si le champ de recherche est présent
       const searchInput = screen.getByPlaceholderText("Search");
        expect(searchInput).toBeInTheDocument();
    });

    test("renders select options", () => {
        render(<AppNavbar />);

        // Vérifie si l'option par défaut du select est présente
        const defaultOption = screen.getByText("Arrhythmia type");
        expect(defaultOption).toBeInTheDocument();

        // Vérifie si les options du select sont présentes
        const arrhythmiaOptions = screen.getAllByRole("option");
        expect(arrhythmiaOptions).toHaveLength(1 + Object.keys(arrhythmiaColors).length); // 1 pour l'option par défaut
    });

});
