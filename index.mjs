import exampleComponent from './examples/example.component.mjs';
import exampleDirective from './examples/example.directive.mjs';
import exampleKlass from './examples/example.klass.mjs';
import examplePipe from './examples/example.pipe.mjs';
import exampleService from './examples/example.service.mjs';

import config from './config.mjs';
// const API_SERVER = 'http://localhost:3000';
const API_SERVER = 'https://ngentest.vercel.app';

document.addEventListener('DOMContentLoaded', main, false);

async function main() {
  const inputEditor = document.querySelector('x-monaco#input');
  const submitButton = document.querySelector('button#submit');
  const outputEditor = document.querySelector('x-monaco#output');
  submitButton.addEventListener('click', () => {
    const typescript = inputEditor.getValue();
    document.querySelector('.output').classList.add('loading');
    fetch(`${API_SERVER}/api/ngentest`, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
          typescript,
          options: config
        })
      }).then(resp => resp.json())
      .then(resp => {
        outputEditor.setValue(resp.output);
      })
      .finally(() => {
        document.querySelector('.output').classList.remove('loading');
      })
  });
  document.querySelector('.examples').addEventListener('click', e => {
    const key = e.target?.name;
    (key === 'component') && inputEditor.setValue(exampleComponent);
    (key === 'directive') && inputEditor.setValue(exampleDirective);
    (key === 'klass') && inputEditor.setValue(exampleKlass);
    (key === 'pipe') && inputEditor.setValue(examplePipe);
    (key === 'service') && inputEditor.setValue(exampleService);
  });
  setTimeout(() => inputEditor.setValue(exampleComponent), 500);
}