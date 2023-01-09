import { assign as assignSection } from "./input-section.js";

document.addEventListener("DOMContentLoaded", () => {
  const inputTemplate =
    document.querySelector<HTMLTemplateElement>("template#tmp-input");
  const mainContainer = document.querySelector<HTMLElement>(
    ".cmp-main-container"
  );
  const sectionTemplate = document.querySelector<HTMLTemplateElement>(
    "template#tmp-section"
  );

  if (mainContainer === null) {
    throw new Error(`Can not find '.cmp-input-section' in DOm tree`);
  }
  if (inputTemplate === null) {
    throw new Error(`Can not find '.cmp-input-section' in DOm tree`);
  }
  if (sectionTemplate === null) {
    throw new Error(`Can not find '.cmp-input-section' in DOm tree`);
  }
  assignSection(mainContainer, inputTemplate, sectionTemplate);
});
