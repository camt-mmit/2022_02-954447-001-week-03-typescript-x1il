import { assign as assignInput } from "./input.js";
function rebuildIndex(sectionsContainer) {
    const inputSections = [
        ...sectionsContainer.querySelectorAll(".cmp-input-section"),
    ];
    inputSections.forEach((inputSection, index) => {
        [
            ...inputSection.querySelectorAll(".cmp-section-no"),
        ].forEach((elem) => {
            elem.innerText = `${index + 1}`;
        });
        [
            ...inputSection.querySelectorAll(".cmd-remove-section"),
        ].forEach((elem) => {
            elem.disabled = inputSections.length > 1 ? false : true;
        });
    });
}
function add(sectionsContainer, inputTemplate, sectionTemplate) {
    const fragment = sectionTemplate.content.cloneNode(true);
    const inputSection = fragment.querySelector(".cmp-input-section");
    sectionsContainer.append(fragment);
    if (inputSection === null) {
        throw new Error(`Can not find '.cmp-inputs-container' in Container DOM  tree`);
    }
    assignInput(inputSection, inputTemplate);
    rebuildIndex(sectionsContainer);
}
function remove(sectionsContainer, inputSection) {
    inputSection.remove();
    rebuildIndex(sectionsContainer);
}
export function assign(container, sectionTemplate, inputTemplate) {
    const sectionsContainer = container.querySelector(".cmp-sections-container");
    if (sectionsContainer === null) {
        throw new Error(`Can not find '.cmp-inputs-container' in Container DOM  tree`);
    }
    container.addEventListener("click", (ev) => {
        if (ev.target) {
            if (ev.target.matches(".cmd-add-section")) {
                add(sectionsContainer, sectionTemplate, inputTemplate);
            }
        }
    });
    sectionsContainer.addEventListener("click", (ev) => {
        if (ev.target) {
            const targetElement = ev.target;
            if (ev.target.matches(".cmd-remove-section")) {
                const inputSection = targetElement.closest(".cmp-input-section");
                if (inputSection === null) {
                    throw new Error(`Can not find '.cmp-inputs-container' in Container DOM  tree`);
                }
                remove(sectionsContainer, inputSection);
            }
        }
    });
    add(sectionsContainer, sectionTemplate, inputTemplate);
}
