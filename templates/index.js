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
      <h1>Blocking Example</h1>
      <p>Input your username. INP is logged to console.</p>
      <input id="input" type="text" placeholder="Username" />
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
  </body>
</html>`;

export default html;
