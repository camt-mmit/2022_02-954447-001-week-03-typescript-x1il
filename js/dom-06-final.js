import { assign as assignInput } from "./input.js";
document.addEventListener("DOMContentLoaded", () => {
    const inputTemplate = document.querySelector("template#tmp-input");
    const inputSection = document.querySelector(".cmp-input-section");
    if (inputSection === null) {
        throw new Error(`Can not find '.cmp-input-section' in DOm tree`);
    }
    if (inputTemplate === null) {
        throw new Error(`Can not find 'template#tmp-input' in DOm tree`);
    }
    assignInput(inputSection, inputTemplate);
});
