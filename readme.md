# How to Use

- Include the swipeJS.js file with all your other Javascript files
- Include the following code at the bottom of the page you wish to include it on:
(Make sure the change the src to the link containing your copy of the swipeJS file)
```
<script type="text/javascript" src="./swipeJS.js"></script>
<script type="text/javascript">
  let config = {
      elementID: 'panelJS',
      transitionSpeed: '0.2s', // Transition speed when releasing finger
      stage1: true,
      stage2: true,
      stage0Size: 10, //the size (in percent) taken by the initial stage (minimum 0, maximum 100)
      stage1Size: 50, //the size (in percent) taken by the middle stage
      stage2Size: 100, //the size (in percent) taken by the final stage (max 100)
      introBounce: true, //add a tiny bounce to let people know the card swipes when first loaded
  }
  if ("ontouchstart" in document.documentElement) {
    var panelJS = new panelJS(config);
  }
</script>
```
This is the config section, you can customise it to your need to determine the sizing, availability and special features of the panel on the webpage.

- Once you have added the above to the bottom of the your html page, add the following to the body:
```
<div class="pageContent" id="pageContent">
  <section class="main">
    <!-- Page Content Here -->
    <!-- End Page Content-->
  </section>
 
</div>
<div class="container" >
  <div class="panelJS" id="panelJS">
    <section class="panelContent">
          <!-- Panel content here -->
          <!-- End Panel Content -->
    </section>
  </div>
</div>
```
The first section is where ALL of your webpage content should go (all of it, including navbars)

The second section is the panel, the section classed "panelContent" is where all your panel content will go. It is referenceable by the ID "panelContent".


# Important things to note

### Compatibility
This panel has been tested on every browser and a wide range of devices, of course I'm not a perfect developer and it will have some bugs, here are the bugs I myself have discovered (and the methods I've attempted to squash them)
- iOS Bug - An issue surrounding the safari browser where the touchmove event would not fire correctly and in sequence, attempted many workarounds but strangely, changing the background colour with each movement of the panel seems to remedy it. Might be waiting for Apple to fix this one.