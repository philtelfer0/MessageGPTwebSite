
  

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('dataForm');
  const responseDiv = document.getElementById('response');
  var converter = new showdown.Converter();
  

  form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

responseDiv.innerHTML = "<img src=\"spinner.gif\" height=\"120px\" width=\"120px\" \>";

    // Get values from the form fields
    const aimedAt = document.getElementById('aimedAt').value;
    const whoWant = document.getElementById('whoWant').value;
    const butFear = document.getElementById('butFear').value;

    try {
      // Make a POST request to the API
      const response = await fetch('http://localhost:3000/api/marketingMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aimedAt, whoWant, butFear }),
      });

      // Parse the JSON response
      const result = await response.json();

      // Display the result on the page
      if (response.ok) {
		  
		  
         responseDiv.innerHTML = "<p>" + converter.makeHtml(result.choices[0].message.content) + "</p>";
		
      } else {
        responseDiv.innerHTML = `<p><strong>Error:</strong> ${result.error}</p>`;
      }
    } catch (error) {
      // Display error if the API call fails
      responseDiv.innerHTML = `<p><strong>Error:</strong> An unexpected error occurred.</p>`;
    }
  });
});
