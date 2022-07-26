<script>
    export let imgPath = "";
</script>


<div class="header">
    <img src="../logo.png" alt="ASCII" width="700" height="170"/>
</div>

<br/>

<form action="/api/generate" method="POST" class="userInteraction">
    <label>
        Input text:
            <input type="text" name="inputString"/>
    </label>
    <input type="submit" value="Submit" />
</form>

<br/>

<div class="imageBox">
    <img src={imgPath} alt="Output" id="outputImage" width="225" height="275" />
</div>


<style>
    :global(body) {
        background-color: rgb(36, 36, 36);
        margin: 0 auto;
    }

    .header {
        text-align: center;
        background-color: rgb(150, 150, 150);
        padding: 10px;
    }

    .userInteraction {
        text-align: center;
        margin-top: 5px;
        display: block;
    }

    .imageBox {
        outline: 1.5px solid white;
        outline-offset: 0px;
        border: 5px rgb(150, 150, 150);
        border-radius: 5px;
        background-color: rgb(150, 150, 150);

        width: 850px;
        height: 250px;
        margin-top: 50px;
        margin-left: auto;
        margin-right: auto;
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
</style>

{#if imgPath == ""}
    <style>
        #outputImage {
            visibility: hidden;
        }
    </style>
{/if}