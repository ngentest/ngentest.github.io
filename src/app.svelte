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

<resize-divs width class="h-100" on:resize-move={() => {}}>
  <div class="accordion flex-fill" id="right-section" role="navigation">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion1">
           According Heading 1
        </button>
      </h2>
      <div id="accordion1" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body">
          Accordion1 contents
          <monaco-editor data-language="json"
            bind:this={monacoEditor1}
            on:monaco-change={formPropsChanged}
          ></monaco-editor>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion2">
          According Heading 2
        </button>
      </h2>
      <div id="accordion2" class="accordion-collapse collapse" data-bs-parent="#right-section">
        <div class="accordion-body p-0 py-1">
          Accordion2 contents
        </div>
      </div>
    </div>
  </div>
  <div class="position-relative" style="width: 33%">
    Right side
  </div>
</resize-divs>