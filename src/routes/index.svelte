<script context="module">
    export function load({ url }) {
        let path = url.searchParams.get('imgPath') || ""
        return {
            props: {
                path
            }
        };
    }
</script>
    
<script>
    export let path;
</script>

<div class="header">
    <img src="./logo.png" alt="ASCII" width="700" height="170"/>
</div>

<br/>

<div class="userInteraction">
    <form action="/api/generate" method="POST" class="userInput">
        <label>
            Input text:
                <input type="text" name="inputString"/>
        </label>
        <div>
            <input type="submit" value="Submit" />
        </div>
    </form>

    <div>
        <button id="downloadButton">Download</button>
    </div>
</div>

<br/>

<div class="imageBox">
    <img src={path} alt="Output" id="outputImage" width="850" height="250" />
</div>

<style>
    :global(body) {
        background-color: rgb(36, 36, 36);
        margin: 0 auto;
    }

    .header {
        text-align: center;
        background-color: black;
        padding: 10px;
    }

    .userInteraction {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 10px;
    }

    .userInput {
        text-align: center;
        margin-top: 5px;
        display: flex;
    }

    .imageBox {
        outline: 1.5px solid white;
        outline-offset: 0px;
        border: 5px black;
        border-radius: 5px;
        background-color: black;

        width: 850px;
        height: 250px;
        margin-top: 50px;
        margin-left: auto;
        margin-right: auto;

        text-align: center;
    }

    #outputImage {
        width: 100%;
        height: 100%;
    }

    label {
        color: white;
        font-family: monospace;
        font-weight: 700;

        display: inline;
        margin-bottom: 20px;
    }

    input[type=text] {
        background-color: rgb(45, 45, 45);

        color: white;
        
        font-size: medium;
        font-weight: 300;

        width: 200px;
        padding: 12px 20px;
        box-sizing: border-box;

        border: none;
        border-bottom: 2px solid greenyellow;
        border-radius: 4px;
        margin-right: 25px;
    }

    input[type=text]:focus{
        outline: none;

        background-color: rgb(45, 45, 45);
        color: white;

        font-size: medium;
        font-weight: 300;

        width: 200px;
        padding: 12px 20px;
        box-sizing: border-box;

        border: none;
        border-bottom: 2px solid greenyellow;
        border-radius: 4px;
        margin-right: 25px;
    }

    input[type=submit] {
        color: rgb(0, 0, 0);
        background-color: greenyellow;

        border-style: solid;
        border-color: greenyellow;
        border-radius: 5px;

        padding: 12px 30px;

        font-size: 14pt;
        font-weight: 600;

        transition-duration: 0.2s;
    }

    input[type=submit]:hover {
        background-color: transparent;
        color: white;
    }

    #downloadButton {
        color: rgb(255, 255, 255);
        background-color: rgb(0, 128, 255);

        border-style: solid;
        border-color: rgb(0, 128, 255);
        border-radius: 5px;

        padding: 12px 30px;
        margin-top: 5px;

        font-size: 14pt;
        font-weight: 600;

        transition-duration: 0.2s
    }

    #downloadButton:hover {
        background-color: transparent;
        color: white;
    }
</style>

{#if path == ""}
    <style>
        #outputImage {
            visibility: hidden;
        }
    </style>
{/if}
