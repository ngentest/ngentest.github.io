import defaultCode from './templates/default-code.ts.mjs';
import config from './config.mjs';
  
document.addEventListener('DOMContentLoaded', main, false);

async function main() {
  const inputEditor = document.querySelector('x-monaco#input');
  const submitButton = document.querySelector('button#submit');
  const outputEditor = document.querySelector('x-monaco#output');
  submitButton.addEventListener('click', () => {
    const typescript = inputEditor.getValue();
    document.querySelector('.output').classList.add('loading');
    fetch('https://ngentest.vercel.app/api/ngentest', {
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
  setTimeout(() => inputEditor.setValue(defaultCode), 500);
}