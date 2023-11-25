import {exampleComponent, exampleDirective, exampleKlass, examplePipe, exampleService}  from './examples/index.mjs';
import {templateComponent, templateDirective, templateKlass, templatePipe, templateService} from './templates/index.mjs';

const API_SERVER = 'https://ngentest.vercel.app'; // 'http://localhost:3000';
const userConfig = /*javascript*/ `return {
  // 'jest' or 'karma'. The default is jest. 
  // This value determines how function mock and assert is to be done.
  framework: 'jest',

  // Your component may use directives and pipes, which are defined in app-level.
  // Because your test does not know app-level declarations, they may break your test.
  // Your unit test should declare them separately as mock objects
  requiredComponentTestDeclarations: { 
    directives: [ 'myCustom' ], 
    pipes: [ 'translate', 'phoneNumber', 'safeHtml' ],
  },

  // Your constructor may use injectable services, that may only work in certain environment
  // Because your test does not know the specific environment, they may break your test
  // The follow object will tell test generator to mock those services with your own code
  // e.g. @Injectable() MockElementRef { nativeElement = {}; }
  providerMocks: {
    ElementRef: \`nativeElement = {};\`,
    Router: \`navigate() {};\`,
    Document: \`querySelector() {};\`,
    HttpClient: \`post() {};\`,
    TranslateService: \`translate() {};\`,
    EncryptionService: []
  }
}`;

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

    const config = new Function(configEditor.getValue())();
    console.log({config});

    config.outputTemplates= {};
    config.outputTemplates[getKlassType()] = templateEditor.getValue();

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
    setConfigEditor();
  });

  document.querySelector('.options').addEventListener('click', e => {
    const key = e.target?.value;
    outputContainer.classList.remove('template', 'config', 'result');
    outputContainer.classList.add(key);
  });

  function getKlassType() {
    return Array.from(document.querySelectorAll('[name=type]')).find(el => el.checked).value;
  }

  function setInputEditor() {
    const klassType = getKlassType();
    inputEditor.setValue(
      klassType === 'klass' ? exampleKlass :
      klassType === 'pipe' ? examplePipe :
      klassType === 'injectable' ? exampleService :
      klassType === 'component' ? exampleComponent :
      klassType === 'directive' ? exampleDirective : ''
    );
  }

  function setTemplateEditor() {
    const klassType = getKlassType();
    templateEditor.setValue(
      klassType === 'klass' ? templateKlass :
      klassType === 'pipe' ? templatePipe :
      klassType === 'injectable' ? templateService :
      klassType === 'component' ? templateComponent :
      klassType === 'directive' ? templateDirective : ''
    );
  }

  function setConfigEditor() {
    const klassType = getKlassType();
    if (klassType !== 'component') {
      delete config.requiredComponentTestDeclarations;
    }
    configEditor.setValue(userConfig);
  }

  setTimeout(() => {
    const outputType = Array.from(document.querySelectorAll('[name=output]')).find(el => el.checked).value;
    setInputEditor();
    setTemplateEditor();
    setConfigEditor();
    outputContainer.classList.remove('template', 'config', 'result');
    outputContainer.classList.add(outputType);
  }, 500);
}