// Function to handle voting
function vote(option) {
    fetch('/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voteChoice: option })
    })
    .then(() => getVoteCounts());
  }
  
  // Function to get and update vote counts
  function getVoteCounts() {
    fetch('/votes')
      .then(response => response.json())
      .then(data => {
        document.getElementById('option-a').innerText = data.A || 0;
        document.getElementById('option-b').innerText = data.B || 0;
      });
  }
  
  // Refresh vote counts every second
  setInterval(getVoteCounts, 1000);
  