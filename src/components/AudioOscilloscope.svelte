<script lang="ts">
    import { onMount } from 'svelte';

    // AudioNode prop: this is the node that is supposed to be analysed by the AnalyserNode
    export let audioNode: AudioNode;

    // the audio context prop: is used to create an analyser node
    export let audioContext: AudioContext;

    export let width: number = 100;
    export let height: number = 75;

    export let label: string = "";

    // the color of the oscilloscope graph
    export let plotColor: {hue: number; saturation: number; lightness: number} = {hue: 210, saturation: 45, lightness: 30};

    let analyserCanvas: HTMLCanvasElement;
    let context2D: CanvasRenderingContext2D | null; // type: CanvasRenderingContext2D | null;

    class Oscilloscope
    {
        /*
        original code by Mathias Rasmussen
        github: mathiasvr/audio-oscilloscope

        The MIT License (MIT)

        Copyright (c) 2015-2018 Mathias Rasmussen

        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.
        */

        // properties of the class
        private audioNode: AudioNode;
        private analyser: AnalyserNode;
        private timeDomain: Uint8Array;
        private drawRequest: number;
        private ctx: CanvasRenderingContext2D;

        constructor(audioNode: AudioNode, audioContext: AudioContext, ctx: CanvasRenderingContext2D, options: any = {})
        {
            this.audioNode = audioNode;

            this.analyser = audioContext.createAnalyser();
            if (options.fftSize)
                this.analyser.fftSize = options.fftSize;
            else
                this.analyser.fftSize = 2048;

            this.audioNode.connect(this.analyser);

            this.timeDomain = new Uint8Array(this.analyser.fftSize);

            this.ctx = ctx;

            this.drawRequest = 0;
        }

        // begin default signal animation
        public animate()
        {
            const x0: number = 0;
            const y0: number = 0;

            if (this.drawRequest)
                throw new Error('Oscilloscope animation is already running');

            const drawLoop = () =>
            {
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                this.ctx.strokeStyle = `hsl(${plotColor.hue}, ${plotColor.saturation}%, ${plotColor.lightness}%)`;
                this.draw(x0, y0, this.ctx.canvas.width, this.ctx.canvas.height);
                this.drawRequest = window.requestAnimationFrame(drawLoop);
            };

            drawLoop();
        }

        // stop default signal animation
        public stop()
        {
            if (this.drawRequest)
            {
                window.cancelAnimationFrame(this.drawRequest);
                this.drawRequest = 0;
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            }
        }

        // draw audio signal on HTML canvas
        private draw(x0 = 0, y0 = 0, width = this.ctx.canvas.width - x0, height = this.ctx.canvas.height - y0)
        {
            this.analyser.getByteTimeDomainData(this.timeDomain);
            const step = width / this.timeDomain.length;

            this.ctx.beginPath()
            // drawing loop (skipping every second record)
            for (let i = 0; i < this.timeDomain.length; i += 2)
            {
                const percent = this.timeDomain[i] / 256;
                const x = x0 + (i * step);
                const y = y0 + (height * percent);
                this.ctx.lineTo(x, y);
            }

            this.ctx.stroke();
        }
    }

    // Svelte onMount() hook, this is where the component is loaded for sure
    // so here, 'context2D' is for sure not null
    onMount(() =>
    {
        console.log("canvas mounted");

        context2D = analyserCanvas.getContext("2d");

        // create oscilloscope from AnalyserNode and CanvasRenderingContext2D
        // the AnalyserNode is used as source of audio
        // the CanvasRenderingContext2D is used as drawing destination
        var scope = new Oscilloscope(audioNode, audioContext, context2D!);

        // start default animation loop
        scope.animate();
    });
</script>

<div class="main-container">
    {#if label.length > 0}
        <div class="label unselectable">{label}</div>
    {/if}

    <canvas class="analyser-canvas" bind:this={analyserCanvas} width="{width}" height="{height}"></canvas>
</div>

<style>
    .main-container
    {
        box-sizing: border-box;
        width: 100%;

        display: flex;
        flex-flow: column nowrap;
        /* set alignment on main axis */
        justify-content: center;
        /* set alingment on cross-axis */
        align-items: center;
        /* set space between flex lines */
        align-content: center;

        margin: 0px;
        padding: 0px;
    }

    .analyser-canvas
    {
        margin: 0px;
        padding: 0px;
    }

    .label
    {
        box-sizing: border-box;
        pointer-events: none;

        margin: 0px;
        padding: 3px;

        color: hsl(210, 45%, 20%);
        font-family: sans-serif;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }

    .unselectable
    {
        user-select: none;
        -webkit-user-select: none;
    }
</style>