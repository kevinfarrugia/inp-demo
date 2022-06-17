const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>INP Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div>
      <h1>Gallery Example</h1>
      <p>Click on a thumbnail. INP is logged to console.</p>
      <div style="border:1px solid;width:400px">
        <img id="poster" style="width:100%" src="https://picsum.photos/200/300/?random" />
        <ul style="list-style:none;padding:0;display:grid;grid-template-columns:auto auto auto;gap:1em">
          <li>
            <img class="thumb" style="width:100%;cursor:pointer" src="https://picsum.photos/200/300/?random=a" />
          </li>
          <li>
            <img class="thumb" style="width:100%;cursor:pointer" src="https://picsum.photos/200/300/?random=b" />
          </li>
          <li>
            <img class="thumb" style="width:100%;cursor:pointer" src="https://picsum.photos/200/300/?random=c" />
          </li>
        </ul>
      </div>
      <h2>Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody id="logs"></tbody>
      </table>
    </div>
    <script type="module" src="./public/main.js"></script>
    <script type="module">
      import { periodicBlock, trackInteractions } from "./public/main.js";
      periodicBlock(2000);

      trackInteractions((entry) => {
        const row = "<tr><td>" + entry.duration + "</td><td>" + entry.name + "</td></tr>";
        document.getElementById("logs").insertAdjacentHTML("beforeend", row);
      });
    </script>
    <script>
      const click = async (src) => {
        const res = await fetch("/submit");

        if (res.ok) {
          document.getElementById("poster").src =
            src;
        } else {
          throw new Error(res.statusText);
        }
      };

      function handleClick(e) {
        e.preventDefault();
        click(e.target.src);
      }

      document.querySelectorAll(".thumb").forEach(n => n.addEventListener("click", handleClick));
    </script>
  </body>
</html>`;

export default html;
