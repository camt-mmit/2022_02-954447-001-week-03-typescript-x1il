import { CommandComponent, ResultComponent } from "./types.js";

function computeTotal(
  inputsContainer: HTMLElement,
  resultComponent: ResultComponent
) {
  const total = [
    ...inputsContainer.querySelectorAll<HTMLElement>(".cmp-input-container"),
  ]
    .map((elem) => elem.querySelector<HTMLInputElement>(".cmp-input"))
    .filter((elem): elem is HTMLInputElement => elem !== null)
    .reduce((carry, elem) => carry + elem.valueAsNumber, 0);

  resultComponent.value = `${total}`;
}

function rebuildIndex(inputsContainer: HTMLElement) {
  const inputContainers = [
    ...inputsContainer.querySelectorAll<HTMLElement>(".cmp-input-container"),
  ];

  inputContainers.forEach((elem, i) => {
    [...elem.querySelectorAll<HTMLInputElement>(".cmp-input-no")].forEach(
      (elem) => {
        elem.innerText = `${i + 1}`;
      }
    );
  });

  [
    ...inputsContainer.querySelectorAll<CommandComponent>(".cmd-remove-input"),
  ].forEach((elem) => {
    elem.disabled = !(inputContainers.length > 1);
  });
}

function add(
  inputsContainer: HTMLElement,
  resultComponent: ResultComponent,
  template: HTMLTemplateElement
) {
  const fragment = template.content.cloneNode(true);

  inputsContainer.append(fragment);

  rebuildIndex(inputsContainer);
  computeTotal(inputsContainer, resultComponent);
}

function remove(
  inputsContainer: HTMLElement,
  resultComponent: ResultComponent,
  inputContainer: HTMLElement
) {
  inputContainer.remove();

  rebuildIndex(inputsContainer);
  computeTotal(inputsContainer, resultComponent);
}

export function assign(
  inputSection: HTMLElement,
  inputTemplate: HTMLTemplateElement
) {
  const inputsContainer = inputSection.querySelector<HTMLElement>(
    ".cmp-inputs-container"
  );
  const resultComponent =
    inputSection.querySelector<ResultComponent>(".cmp-result");
  if (inputsContainer === null) {
    throw new Error(
      `Can not find '.cmp-inputs-container' in Container DOM  tree`
    );
  }

  if (resultComponent === null) {
    throw new Error(`Can not find '.cmp-iresult' in Container DOM  tree`);
  }
  inputSection.addEventListener("click", (ev) => {
    if (ev.target) {
      if ((ev.target as HTMLElement).matches(".cmd-add-input")) {
        add(inputsContainer, resultComponent, inputTemplate);
      }
    }
  });

  inputsContainer.addEventListener("change", (ev) => {
    if (ev.target) {
      if ((ev.target as HTMLElement).matches('input[type="number"]')) {
        computeTotal(inputsContainer, resultComponent);
      }
    }
  });

  inputsContainer.addEventListener("click", (ev) => {
    if (ev.target) {
      const targetElement = ev.target as HTMLElement;
      if ((ev.target as HTMLElement).matches(".cmd-remove-input")) {
        const inputContainer = targetElement.closest<HTMLElement>(
          ".cmp-input-container"
        );
        if (inputContainer === null) {
          throw new Error(
            `Can not find 'cmp-input-container' in parent path of DOM tree`
          );
        }
        remove(inputsContainer, resultComponent, inputContainer);
      }
    }
  });

  add(inputsContainer, resultComponent, inputTemplate);
}
