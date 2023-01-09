import { assign as assignInput } from "./input.js";

function rebuildIndex(sectionsContainer: HTMLElement) {
  const inputSections = [
    ...sectionsContainer.querySelectorAll<HTMLElement>(".cmp-input-section"),
  ];

  inputSections.forEach((inputSection, index) => {
    [
      ...inputSection.querySelectorAll<HTMLInputElement>(".cmp-section-no"),
    ].forEach((elem) => {
      elem.innerText = `${index + 1}`;
    });

    [
      ...inputSection.querySelectorAll<HTMLButtonElement>(
        ".cmd-remove-section"
      ),
    ].forEach((elem) => {
      elem.disabled = inputSections.length > 1 ? false : true;
    });
  });
}

function add(
  sectionsContainer: HTMLElement,
  inputTemplate: HTMLTemplateElement,
  sectionTemplate: HTMLTemplateElement
) {
  const fragment = sectionTemplate.content.cloneNode(true) as DocumentFragment;
  const inputSection =
    fragment.querySelector<HTMLElement>(".cmp-input-section");

  sectionsContainer.append(fragment);
  if (inputSection === null) {
    throw new Error(
      `Can not find '.cmp-inputs-container' in Container DOM  tree`
    );
  }
  assignInput(inputSection, inputTemplate);
  rebuildIndex(sectionsContainer);
}

function remove(sectionsContainer: HTMLElement, inputSection: HTMLElement) {
  inputSection.remove();
  rebuildIndex(sectionsContainer);
}

export function assign(
  container: HTMLElement,
  sectionTemplate: HTMLTemplateElement,
  inputTemplate: HTMLTemplateElement
) {
  const sectionsContainer = container.querySelector<HTMLElement>(
    ".cmp-sections-container"
  );

  if (sectionsContainer === null) {
    throw new Error(
      `Can not find '.cmp-inputs-container' in Container DOM  tree`
    );
  }

  container.addEventListener("click", (ev) => {
    if (ev.target) {
      if ((ev.target as HTMLElement).matches(".cmd-add-section")) {
        add(sectionsContainer, sectionTemplate, inputTemplate);
      }
    }
  });

  sectionsContainer.addEventListener("click", (ev) => {
    if (ev.target) {
      const targetElement = ev.target as HTMLElement;

      if ((ev.target as HTMLElement).matches(".cmd-remove-section")) {
        const inputSection =
          targetElement.closest<HTMLElement>(".cmp-input-section");
        if (inputSection === null) {
          throw new Error(
            `Can not find '.cmp-inputs-container' in Container DOM  tree`
          );
        }
        remove(sectionsContainer, inputSection);
      }
    }
  });
  add(sectionsContainer, sectionTemplate, inputTemplate);
}
