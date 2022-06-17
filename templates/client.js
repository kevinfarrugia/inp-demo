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
      <h1>Network Fetch Example</h1>
      <p>Input your username and submit the form. INP is logged to console.</p>
      <form id="form" action="/submit">
        <input id="input" type="text" placeholder="Username" />
        <button style="background-color:#000;color:#fff;border:0;padding:0.5em" type="submit">Submit</button>
        <div id="output"></div>
      </form>
    </div>
    <script type="module" src="./public/main.js"></script>
    <script>
      const submit = async () => {
        const res = await fetch("/submit", {
          method: "POST",
          body: JSON.stringify({
            username: document.getElementById("input").value,
          }),
        });

        if (res.ok) {
          document.getElementById("output").innerHTML =
            document.getElementById("input").value;
        } else {
          throw new Error(res.statusText);
        }
      };

      function handleSubmit(e) {
        e.preventDefault();
        submit();
      }

      document.getElementById("form").addEventListener("submit", handleSubmit);
    </script>
  </body>
</html>`;

export default html;
