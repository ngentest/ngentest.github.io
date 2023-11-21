import {exampleComponent, exampleDirective, exampleKlass, examplePipe, exampleService}  from './examples/index.mjs';
import {templateComponent, templateDirective, templateKlass, templatePipe, templateService} from './templates/index.mjs';

import config from './config.mjs';
const API_SERVER = 'https://ngentest.vercel.app';

document.addEventListener('DOMContentLoaded', main, false);

async function main() {
  const inputEditor = document.querySelector('x-monaco#input');
  const submitButton = document.querySelector('button#submit');
  const resultEditor = document.querySelector('x-monaco#result');
  const templateEditor = document.querySelector('x-monaco#template');
  const configEditor = document.querySelector('x-monaco#config');
  const outputContainer = document.querySelector('.output');

  submitButton.addEventListener('click', () => {
    const typescript = inputEditor.getValue();
    outputContainer.classList.remove('template', 'config', 'result');
    outputContainer.classList.add('loading');
    fetch(`${API_SERVER}/api/ngentest`, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
          typescript,
          options: config
        })
      }).then(resp => resp.json())
      .then(resp => {
        resultEditor.setValue(resp.output);
      })
      .finally(() => {
        outputContainer.classList.add('result');
        outputContainer.classList.remove('loading');
      })
  });

  document.querySelector('.types').addEventListener('click', e => {
    setInputEditor();
    setTemplateEditor();
  });

  document.querySelector('.options').addEventListener('click', e => {
    const key = e.target?.value;
    outputContainer.classList.remove('template', 'config', 'result');
    outputContainer.classList.add(key);
  });

  function setInputEditor() {
    const typeSelected = Array.from(document.querySelectorAll('[name=type]')).find(el => el.checked).value;
    inputEditor.setValue(
      typeSelected === 'klass' ? exampleKlass :
      typeSelected === 'pipe' ? examplePipe :
      typeSelected === 'service' ? exampleService :
      typeSelected === 'component' ? exampleComponent :
      typeSelected === 'directive' ? exampleDirective : ''
    );
  }

  function setTemplateEditor() {
    const typeSelected = Array.from(document.querySelectorAll('[name=type]')).find(el => el.checked).value;
    templateEditor.setValue(
      typeSelected === 'klass' ? templateKlass :
      typeSelected === 'pipe' ? templatePipe :
      typeSelected === 'service' ? templateService :
      typeSelected === 'component' ? templateComponent :
      typeSelected === 'directive' ? templateDirective : ''
    );
  }

  setTimeout(() => {
    setInputEditor();
    setTemplateEditor();
    const selected = Array.from(document.querySelectorAll('[name=output]')).find(el => el.checked).value;
    outputContainer.classList.remove('template', 'config', 'result');
    outputContainer.classList.add(selected);
  }, 500);
}