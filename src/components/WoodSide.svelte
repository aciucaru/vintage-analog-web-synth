<script lang="ts">
    export let otherside: boolean = false;

    let textureBackground = "";

    // if the original side (left) is left unchanged, then choose the texture for the left side
    if (!otherside)
        textureBackground = "wood-textured-background wood-side-left";
    // if the other side (right) was specified through the prop, then choose the texture for the right side
    else
        textureBackground = "wood-textured-background wood-side-right";

</script>

<div class="main-container">
    <div class={textureBackground}></div>
    <div class="wood-shadows-center"></div>
    <div class="wood-shadows-top"></div>
    <div class="wood-shadows-bottom"></div>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;

        /* width: max-content;
        height: min-content; */

        width: 30px;
        height: auto;
        /* width: 100%;
        height: min-content; */
        /* overflow: hidden prevents scrollbars if the content is larger than the container */
        overflow: hidden;

        display: grid;
        grid-template-columns: 30px;
        grid-template-rows: auto;

        /* justify-items: start;
        align-items: start;
        justify-content: center; */
        justify-items: stretch;
        align-items: stretch;
        justify-content: center;
        gap: 0px;

        margin: 0px;
        padding: 0px;

        text-align: center;
        /* border: solid 1px blue; */
    }

    .wood-textured-background
    {
        box-sizing: border-box;

        grid-column: 1 / 2;
        grid-row: 1 / 2;

        /* justify-self: stretch;
        align-self: stretch; */

        margin: 0px;
        padding: 0px;

        border-radius: 3px;

        /* necessary for proper background image positioning and dimensioning */
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-position: top left;
    }

    .wood-side-left
    {
        background-image: url("../assets/wood-sides/freepik-dark-brown-wood-texture-left-w100.jpg");
    }

    .wood-side-right
    {
        background-image: url("../assets/wood-sides/freepik-dark-brown-wood-texture-right-w100.jpg");
    }

    .wood-shadows-center
    {
        box-sizing: border-box;

        grid-column: 1 / 2;
        grid-row: 1 / 2;
        /* 
        justify-self: stretch;
        align-self: stretch; */

        width: 30px;
        height: 100%;

        margin: 0px;
        padding: 0px;

        background-image: url("../assets/wood-sides/wood-side-shadows-final-v4-center-opt.svg");
        /* necessary settings, otherwise the SVG background won't display properly: */
        /* background-size: 100% auto; */
        /* "background-size: contain" scales the image as large as possible within its container without cropping or stretching the image */
        background-size: contain;
        background-repeat: repeat-y;
        background-position: top left;
        background-attachment: scroll;
    }

    .wood-shadows-top
    {
        box-sizing: border-box;

        grid-column: 1 / 2;
        grid-row: 1 / 2;
        
        /* justify-self: stretch; */
        /* align-self: start; */

        width: 30px;
        height: auto;

        margin: 0px;
        padding: 0px;

        background-image: url("../assets/wood-sides/wood-side-shadows-final-v4-top-opt.svg");
        /* necessary settings, otherwise the SVG background won't display properly: */
        /* background-size: 100% auto; */
        /* "background-size: contain" scales the image as large as possible within its container without cropping or stretching the image */
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top left;
        background-attachment: scroll;
    }

    .wood-shadows-bottom
    {
        box-sizing: border-box;

        grid-column: 1 / 2;
        grid-row: 1 / 2;
        
        /* justify-self: stretch; */
        /* align-self: end; */

        width: 30px;
        height: auto;

        margin: 0px;
        padding: 0px;

        background-image: url("../assets/wood-sides/wood-side-shadows-final-v4-bottom-opt-2.svg");
        /* necessary settings, otherwise the SVG background won't display properly: */
        background-size: 100% auto;
        /* "background-size: contain" scales the image as large as possible within its container without cropping or stretching the image */
        background-size: contain;
        background-repeat: no-repeat;
        background-position: bottom left;
        background-attachment: scroll;
    }
</style>