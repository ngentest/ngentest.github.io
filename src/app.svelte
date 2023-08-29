<script lang='ts'>
  import { onMount } from 'svelte';
  let monacoEditor1;

  function formPropsChanged(e: any) {
    console.log(e.detail);
  }

  onMount(() => {
    // todo
  });
</script>

<style lang="scss">
  .accordion-body { height: 100%; }
  monaco-editor { height: 100%; }
</style>

<h1>Generate Angular unit test online</h1> 

<pre>
 . github link
</pre>
<resize-divs width class="h-100" on:resize-move={() => {}}>
  <div>
    <pre>{`
    framework: 'jest',
      klass: klassTemplate,
      component: componentTemplate,
      directive: directiveTemplate,
      injectable: injectableTemplate, 
      pipe: pipeTemplate 
    // Your component may use directives and pipes, which are defined in app-level
    // Because your test does not know app-level declarations, they may break your test
    // Your unit test should declare them separately as mock objects
    requiredComponentTestDeclarations
      directives: [ 'myCustom' ] 
      pipes: [ 'translate', 'phoneNumber', 'safeHtml' ]
    // Your constructor may use injectable services, that may only work in certain environment
    // Because your test does not know the specific environment, they may break your test
    // The follow object will tell test generator to mock those services with your own code
    // e.g. @Injectable() MockElementRef { nativeElement = {}; }
    providerMocks: 
      ElementRef: ['nativeElement = {};']
      Router: ['navigate() {};']
      Document: ['querySelector() {};']
      HttpClient: ['post() {};']
      TranslateService: ['translate() {};']
      EncryptionService: []
  `}</pre>
  </div>
  <div class="position-relative" style="width: 33%">
    Editor section
  </div>
</resize-divs>