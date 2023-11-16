import exampleComponent from './examples/example.component.mjs';
import exampleDirective from './examples/example.directive.mjs';
import exampleKlass from './examples/example.klass.mjs';
import examplePipe from './examples/example.pipe.mjs';
import exampleService from './examples/example.service.mjs';

import templateComponent from './templates/component.mjs';
import templateDirective from './templates/directive.mjs';
import templateKlass from './templates/klass.mjs';
import templatePipe from './templates/pipe.mjs';
import templateService from './templates/injectable.mjs';

import config from './config.mjs';
// const API_SERVER = 'http://localhost:3000';
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
    const key = e.target?.value;
    if (key === 'component') {
      inputEditor.setValue(exampleComponent);
      templateEditor.setValue(templateComponent);
    } else if (key === 'directive') {
      inputEditor.setValue(exampleDirective);
      templateEditor.setValue(templateDirective);
    } else if (key === 'klass') { 
      inputEditor.setValue(exampleKlass);
      templateEditor.setValue(templateKlass);
    } else if (key === 'pipe') { 
      inputEditor.setValue(examplePipe);
      templateEditor.setValue(templatePipe);
    } else if (key === 'service') { 
      inputEditor.setValue(exampleService);
      templateEditor.setValue(templateService);
    }
  });

  document.querySelector('.options').addEventListener('click', e => {
    const key = e.target?.value;
    outputContainer.classList.remove('template', 'config', 'result');
    outputContainer.classList.add(key);
  });

  setTimeout(() => {
    inputEditor.setValue(exampleComponent);
    templateEditor.setValue(templateComponent);
  }, 500);
}