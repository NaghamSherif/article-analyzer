export async function handleSubmit(event) {
  event.preventDefault();

  let formText = document.getElementById("link").value;
  let text = document.getElementById("text");
  let urlRegex = new RegExp(
    /^((?:https?:\/\/)?[^.\/]+(?:\.[^.\/]+)+(?:\/.*)?)$/
  );

  console.log("::: Form Submitted :::");
  if (urlRegex.test(formText)) {
    try {
      text.style.visibility = "visible";
      text.innerText = "Analizing...";
      const json = await fetch(`http://localhost:8081/api/${formText}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        });
      console.log(json);

      document.getElementById("agreement").innerHTML =
        json.agreement.toLowerCase();
      document.getElementById("subjectivity").innerHTML =
        json.subjectivity.toLowerCase();
      document.getElementById("confidence").innerHTML = json.confidence;
      document.getElementById("irony").innerHTML = json.irony.toLowerCase();
      text.style.visibility = "hidden";
      document.getElementById("table").style.visibility = "visible";
    } catch (error) {
      console.log(error.message);
      text.style.visibility = "visible";

      text.innerText = "An error has occured, please try again.";
    }
  } else {
    alert("Please enter a valid URL.");
  }
}
