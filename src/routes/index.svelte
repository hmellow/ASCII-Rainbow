<script>
    import { imgGen } from './src/Scraping/pageScraper.js'
</script>

<div class="mainTitle">
    <img src="../logo.png" alt="ASCII" width="700" height="170">
</div>

<br>

<div class="userInteraction">
    <button class="activateButton">
        Submit
    </button>
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
    }

    .activateButton {
        color: rgb(255, 255, 255);
        background-color: dimgray;

        font-size: 14pt;
        font-weight: 600;

        border-color:rgb(144, 144, 144);
        border-width: 2.5pt;
        border-radius: 5pt;
        padding: 10px 30px;
    }
</style>
