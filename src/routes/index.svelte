<script>
    
</script>


<div class="mainTitle">
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
    <img src="../out.png" alt="Output" width="225" height="275"/>
</div>


<style>
    :global(body) {
        background-color: darkslategray;
    }

    .mainTitle {
        text-align: center;
        background-color: rgb(42, 42, 42);
    }

    .userInteraction {
        text-align: center;
        margin-top: 5px;
        display: block;
    }

    .imageBox {
        border: 5px solid white;
        background-color: white;

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

    input[type=submit] {
        color: rgb(255, 255, 255);
        background-color: rgb(75, 75, 75);

        border-color:rgb(110, 110, 110);
        border-width: 2.5pt;
        border-radius: 5pt;
        padding: 12px 30px;

        font-size: 14pt;
        font-weight: 600;
    }
</style>
